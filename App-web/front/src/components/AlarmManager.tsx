import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../stores/useAppStore';

const ALARM_OFFLINE = '/sounds/Audio_Alarma3.mpeg';
const ALARM_ONLINE = '/sounds/Audio_Alarma2.mpeg';

// Helper to parse "YYYY-MM-DD HH:MM:SS"
const parseDate = (dateStr: string | null) => {
    if (!dateStr) return 0;
    return new Date(dateStr.replace(" ", "T")).getTime();
};

const AlarmManager: React.FC = () => {
    const { branches, setSelectedBranchId, selectedBranchId, addRecoveredBranch, removeRecoveredBranch } = useAppStore();

    // Track when branches started their offline period
    // Map: BranchId -> Timestamp (when it went offline)
    const offlineStartTimes = useRef<Map<string, number>>(new Map());

    // Track if we have already handled the "2 Minute Alarm" for a specific outage instance
    // Key: `${branchId}_${offlineTimestamp}`
    const handledOfflineAlarms = useRef<Set<string>>(new Set());

    // Track if we have handled the "Recovery Alarm" for a specific reconnection
    // Key: `${branchId}_${onlineTimestamp}`
    const handledRecovery = useRef<Set<string>>(new Set());

    // Ref to manage popup auto-close timer
    const popupCloseTimer = useRef<NodeJS.Timeout | null>(null);
    const activePopupBranchId = useRef<string | null>(null);

    // Audio Refs
    const audioOffline = useRef<HTMLAudioElement | null>(null);
    const audioOnline = useRef<HTMLAudioElement | null>(null);

    // Cooldown for sounds to prevent overlapping
    const lastGlobalAlarmTime = useRef<number>(0);

    useEffect(() => {
        audioOffline.current = new Audio(ALARM_OFFLINE);
        audioOnline.current = new Audio(ALARM_ONLINE);
    }, []);

    const playSound = (type: 'offline' | 'online') => {
        const now = Date.now();
        if (now - lastGlobalAlarmTime.current < 2000) {
            console.log(`Skipping ${type} alarm due to cooldown`);
            return;
        }
        lastGlobalAlarmTime.current = now;

        if (type === 'offline' && audioOffline.current) {
            audioOffline.current.currentTime = 0;
            audioOffline.current.play().catch(e => console.error("Audio play failed", e));
        } else if (type === 'online' && audioOnline.current) {
            audioOnline.current.currentTime = 0;
            audioOnline.current.play().catch(e => console.error("Audio play failed", e));
        }
    };

    // Monitor for changes
    useEffect(() => {
        const checkAlarms = () => {
            const now = Date.now();

            branches.forEach(branch => {
                if (!branch.lastChange) return;

                // --- OFFLINE LOGIC ---
                if (branch.status === 'offline') {
                    const changeTime = parseDate(branch.lastChange);

                    // Track start time if not already tracked
                    // We key by the changeTime to ensure uniqueness per outage
                    if (!offlineStartTimes.current.has(branch.id) || offlineStartTimes.current.get(branch.id) !== changeTime) {
                        offlineStartTimes.current.set(branch.id, changeTime);
                    }

                    const offlineStart = offlineStartTimes.current.get(branch.id)!;
                    const duration = now - offlineStart;
                    const eventKey = `${branch.id}_${offlineStart}`;

                    // Check if 2 minutes have passed
                    if (duration > 2 * 60 * 1000) {
                        if (!handledOfflineAlarms.current.has(eventKey)) {
                            console.log(`[AlarmManager] Triggering 2m Alarm for ${branch.name}`);

                            // 1. Play Alarm
                            playSound('offline');

                            // 2. Open Popup
                            setSelectedBranchId(branch.id);
                            activePopupBranchId.current = branch.id;

                            // 3. Schedule Auto-Close in 2 minutes
                            if (popupCloseTimer.current) clearTimeout(popupCloseTimer.current);
                            popupCloseTimer.current = setTimeout(() => {
                                // Only close if it's still the same branch
                                if (activePopupBranchId.current === branch.id) {
                                    console.log(`[AlarmManager] Auto-closing popup for ${branch.name}`);
                                    setSelectedBranchId(null);
                                    activePopupBranchId.current = null;
                                }
                            }, 2 * 60 * 1000); // 2 Minutes

                            // Mark handled
                            handledOfflineAlarms.current.add(eventKey);
                        }
                    }
                }

                // --- ONLINE LOGIC ---
                else if (branch.status === 'online') {
                    // We need to know if this branch WAS offline recently
                    // We check `offlineStartTimes`.

                    if (offlineStartTimes.current.has(branch.id)) {
                        const offlineStart = offlineStartTimes.current.get(branch.id)!;
                        const onlineTime = parseDate(branch.lastChange); // This is WHEN it came back online

                        // If current time is past onlineTime, we are in post-recovery state.

                        // Calculate how long it was offline
                        const outageDuration = onlineTime - offlineStart;
                        const eventKey = `${branch.id}_${onlineTime}`;

                        if (!handledRecovery.current.has(eventKey)) {
                            // Only act if outage > 2 minutes
                            if (outageDuration > 2 * 60 * 1000) {
                                console.log(`[AlarmManager] Recovered after LONG outage (${outageDuration}ms) - Triggering Alarm`);

                                // 1. Play Online Alarm
                                playSound('online');

                                // 2. Add to Recovered List (Green Card)
                                addRecoveredBranch(branch);

                                // 3. Schedule Removal from Recovered List (1 Minute)
                                setTimeout(() => {
                                    removeRecoveredBranch(branch.id);
                                }, 1 * 60 * 1000); // 1 Minute

                            } else {
                                console.log(`[AlarmManager] Recovered after SHORT outage (${outageDuration}ms) - Silent`);
                            }

                            handledRecovery.current.add(eventKey);

                            // Cleanup offline tracker
                            offlineStartTimes.current.delete(branch.id);
                        }
                    }
                }
            });
        };

        const interval = setInterval(checkAlarms, 1000);
        return () => clearInterval(interval);
    }, [branches, setSelectedBranchId, addRecoveredBranch, removeRecoveredBranch]);

    return null;
};

export default AlarmManager;

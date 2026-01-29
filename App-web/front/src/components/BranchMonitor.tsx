import React, { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { WifiOff, AlertTriangle, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { Branch } from '../stores/useAppStore';

const calculateDuration = (lastChange: string | null) => {
    if (!lastChange) return "Recién";
    // Parse "YYYY-MM-DD HH:MM:SS"
    const start = new Date(lastChange.replace(" ", "T"));

    if (isNaN(start.getTime())) return "Error fecha";

    const now = new Date();
    const diffMs = now.getTime() - start.getTime();

    if (diffMs < 0) return "0m";

    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${mins}m`;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
};

const BranchCard: React.FC<{ branch: Branch; isRecovered?: boolean; onClick: () => void }> = ({ branch, isRecovered, onClick }) => {
    const isCritical = branch.status === 'offline';

    // Determine style based on state
    // Recovered -> Green
    // Critical (Offline) -> Red
    // Warning -> Yellow

    let borderColor = "border-l-yellow-500";
    let iconBg = "bg-yellow-50 text-yellow-600";
    let statusBg = "bg-yellow-50 text-yellow-700";
    let icon = <AlertTriangle className="w-5 h-5" />;

    if (isRecovered) {
        borderColor = "border-l-green-500";
        iconBg = "bg-green-50 text-green-600";
        statusBg = "bg-green-50 text-green-700";
        icon = <CheckCircle className="w-5 h-5" />;
    } else if (isCritical) {
        borderColor = "border-l-red-500";
        iconBg = "bg-red-50 text-red-600";
        statusBg = "bg-red-50 text-red-700";
        icon = <WifiOff className="w-5 h-5" />;
    }

    return (
        <div
            onClick={onClick}
            className={clsx(
                "relative overflow-hidden rounded-xl border-l-[6px] p-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group",
                borderColor
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-gray-800 leading-tight">{branch.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{branch.code}</p>
                </div>
                <div className={clsx("p-2 rounded-lg", iconBg)}>
                    {icon}
                </div>
            </div>

            <div className={clsx(
                "flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded mb-3",
                statusBg
            )}>
                <Clock className="w-3.5 h-3.5" />
                <span>
                    {isRecovered ? "Recuperado - En línea" : `Tiempo desconectado: ${calculateDuration(branch.lastChange)}`}
                </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Proveedor</span>
                    <span className="text-sm font-bold text-gray-700">{branch.provider.name}</span>
                </div>

                <button className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
                    Ver Detalles <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

const BranchMonitor: React.FC = () => {
    const { branches, recoveredBranches, setSelectedBranchId } = useAppStore();

    // Filter: Offline ONLY
    // We removed the ad-hoc "Recently Recovered" logic in favor of explicitly managed `recoveredBranches`
    const offlineBranches = branches.filter(b => b.status === 'offline');

    // Combine lists
    // We want to show offline branches first, then recovered ones? Or mixed?
    // Let's just append recovered ones.
    const displayBranches = [...offlineBranches, ...recoveredBranches];

    const hasOffline = offlineBranches.length > 0;
    const isClean = displayBranches.length === 0;

    return (
        <div className="flex flex-col h-full bg-slate-50 border border-t-0 p-6 rounded-b-xl overflow-y-auto w-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className={clsx("text-lg font-bold flex items-center gap-2", isClean ? "text-green-600" : "text-gray-800")}>
                    <span className={clsx("w-2 h-6 rounded-full", isClean ? "bg-green-500" : "bg-red-500")}></span>
                    {isClean ? "Monitor de Sucursales" : "Monitor de Sucursales Críticas"}
                </h2>
                <span className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-full border",
                    isClean ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"
                )}>
                    {displayBranches.length} Incidentes Activos
                </span>
            </div>

            {displayBranches.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                    <CheckCircle className="w-10 h-10 mb-2 text-green-500/50" />
                    <p className="font-medium">Todas las sucursales operativa</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3 pb-20">
                    {displayBranches.map(branch => {
                        const isRecovered = recoveredBranches.some(rb => rb.id === branch.id);
                        return (
                            <BranchCard
                                key={branch.id}
                                branch={branch}
                                isRecovered={isRecovered}
                                onClick={() => setSelectedBranchId(branch.id)}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BranchMonitor;

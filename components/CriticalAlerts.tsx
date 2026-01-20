import React from 'react';
import { Bell, WifiOff, ZapOff, Activity, Router, ArrowRight } from 'lucide-react';
import { Alert } from '../types';

const alerts: Alert[] = [
  {
    id: 'T302',
    branch: 'Branch 02 - Santiago Centro',
    branchId: 'ID: T302',
    type: 'critical',
    issue: 'Connection Lost',
    downtimeLabel: 'Downtime',
    downtimeValue: '2h 10m',
    iconType: 'wifi_off',
  },
  {
    id: 'T305',
    branch: 'Branch 05 - Providencia',
    branchId: 'ID: T305',
    type: 'critical',
    issue: 'Power Failure Detected',
    downtimeLabel: 'Downtime',
    downtimeValue: '0h 45m',
    iconType: 'power_off',
  },
  {
    id: 'T414',
    branch: 'Branch 06 - La Florida',
    branchId: 'ID: T414',
    type: 'warning',
    issue: 'High Latency',
    downtimeLabel: 'Ping',
    downtimeValue: '140ms',
    iconType: 'speed',
  },
  {
    id: 'T413',
    branch: 'Branch 19 - Maipu',
    branchId: 'ID: T413',
    type: 'warning',
    issue: 'Packet Loss',
    downtimeLabel: 'Loss',
    downtimeValue: '15%',
    iconType: 'router',
  },
];

const AlertIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'wifi_off': return <WifiOff className="w-[18px] h-[18px]" />;
    case 'power_off': return <ZapOff className="w-[18px] h-[18px]" />;
    case 'speed': return <Activity className="w-[18px] h-[18px]" />;
    case 'router': return <Router className="w-[18px] h-[18px]" />;
    default: return <Bell className="w-[18px] h-[18px]" />;
  }
};

const CriticalAlerts: React.FC = () => {
  return (
    <section className="w-full lg:w-1/3 flex flex-col bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden flex-shrink-0 min-h-[400px]">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 text-base">
          <Bell className="text-red-500 w-5 h-5 fill-red-500/20" />
          Critical Alerts
        </h2>
        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full border border-red-200">5 Active</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/30 custom-scrollbar">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`bg-white border-l-4 rounded-lg p-4 shadow-sm flex flex-col gap-2 group hover:shadow-md transition-all cursor-pointer border-gray-100 ${
              alert.type === 'critical' ? 'border-l-red-500' : 'border-l-yellow-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{alert.branch}</h3>
                <p className="text-xs text-gray-500">{alert.branchId}</p>
              </div>
              <span 
                className={`flex h-3 w-3 rounded-full ${
                  alert.type === 'critical' 
                  ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' 
                  : 'bg-yellow-500'
                }`} 
              />
            </div>
            
            <div className={`rounded p-2 mt-1 border ${
              alert.type === 'critical' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-yellow-50 border-yellow-100 text-yellow-700'
            }`}>
              <div className="flex items-center gap-2 font-medium text-sm">
                <AlertIcon type={alert.iconType} />
                {alert.issue}
              </div>
              <div className={`mt-1 flex justify-between text-xs ${
                alert.type === 'critical' ? 'text-red-600/80' : 'text-yellow-600/80'
              }`}>
                <span>{alert.downtimeLabel}:</span>
                <span className="font-mono font-bold">{alert.downtimeValue}</span>
              </div>
            </div>

            {alert.type === 'critical' && alert.iconType === 'wifi_off' && (
              <div className="mt-1 pt-2 border-t border-gray-100 flex justify-end">
                <button className="text-[10px] font-bold text-primary hover:text-primary-dark uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Diagnostics <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CriticalAlerts;

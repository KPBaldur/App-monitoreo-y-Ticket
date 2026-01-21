import React from 'react';
import { Store, CheckCircle, AlertTriangle, WifiOff } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import clsx from 'clsx';

const KPICards: React.FC = () => {
  const { branches } = useAppStore();

  const total = branches.length;
  const online = branches.filter(b => b.status === 'online').length;
  const warning = branches.filter(b => b.status === 'warning').length;
  const offline = branches.filter(b => b.status === 'offline').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Locales */}
      <div className="bg-primary text-white rounded-lg p-4 shadow-card flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">Total Locales</p>
          <p className="text-3xl font-bold tabular-nums">{total}</p>
        </div>
        <Store className="text-white/20 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>

      {/* En Línea */}
      <div className="bg-status-green text-white rounded-lg p-4 shadow-card flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">En Línea</p>
          <p className="text-3xl font-bold tabular-nums">{online}</p>
        </div>
        <CheckCircle className="text-white/20 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>

      {/* Advertencias */}
      <div className={clsx(
        "rounded-lg p-4 shadow-card border flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group",
        warning > 0
          ? "bg-status-orange text-white border-transparent"
          : "bg-white text-gray-800 border-gray-200"
      )}>
        <div className="relative z-10">
          <p className={clsx("text-sm font-bold", warning > 0 ? "text-white" : "text-gray-600")}>Advertencias</p>
          <p className={clsx("text-3xl font-bold tabular-nums", warning > 0 ? "text-white" : "text-status-orange")}>{warning}</p>
        </div>
        <AlertTriangle className={clsx(
          "w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform",
          warning > 0 ? "text-white/20" : "text-orange-100"
        )} />
      </div>

      {/* Desconectados */}
      <div className={clsx(
        "rounded-lg p-4 shadow-card border flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group",
        offline > 0
          ? "bg-status-red text-white border-transparent w-full md:col-span-2 lg:col-span-1" // Puedes ajustar el col-span si deseas que sea más grande
          : "bg-white text-gray-800 border-gray-200"
      )}>
        <div className="relative z-10">
          <p className={clsx("text-sm font-bold", offline > 0 ? "text-white" : "text-gray-600")}>Desconectados</p>
          <p className={clsx("text-3xl font-bold tabular-nums", offline > 0 ? "text-white" : "text-status-red")}>{offline}</p>
        </div>
        <WifiOff className={clsx(
          "w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform",
          offline > 0 ? "text-white/20" : "text-red-100"
        )} />
      </div>
    </div>
  );
};

export default KPICards;

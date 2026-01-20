import React from 'react';
import { Store, CheckCircle, AlertTriangle, WifiOff } from 'lucide-react';

const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Locales */}
      <div className="bg-primary text-white rounded-lg p-4 shadow-card flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">Total Locales</p>
          <p className="text-3xl font-bold tabular-nums">120</p>
        </div>
        <Store className="text-white/20 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>

      {/* En Línea */}
      <div className="bg-status-green text-white rounded-lg p-4 shadow-card flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-90">En Línea</p>
          <p className="text-3xl font-bold tabular-nums">115</p>
        </div>
        <CheckCircle className="text-white/20 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>

      {/* Advertencias */}
      <div className="bg-white text-gray-800 rounded-lg p-4 shadow-card border border-gray-200 flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-bold text-gray-600">Advertencias</p>
          <p className="text-3xl font-bold text-status-orange tabular-nums">3</p>
        </div>
        <AlertTriangle className="text-orange-100 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>

      {/* Desconectados */}
      <div className="bg-white text-gray-800 rounded-lg p-4 shadow-card border border-gray-200 flex justify-between items-center relative overflow-hidden hover:shadow-hover transition-all cursor-pointer group">
        <div className="relative z-10">
          <p className="text-sm font-bold text-gray-600">Desconectados</p>
          <p className="text-3xl font-bold text-status-red tabular-nums">2</p>
        </div>
        <WifiOff className="text-red-100 w-16 h-16 absolute -right-2 -bottom-4 group-hover:scale-110 transition-transform" />
      </div>
    </div>
  );
};

export default KPICards;

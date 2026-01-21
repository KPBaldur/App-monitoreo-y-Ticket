import React from 'react';
import { LayoutGrid, Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between flex-shrink-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
          <Link to="/" className="flex items-center">
            <LayoutGrid className="text-primary w-6 h-6" />
          </Link>
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800 leading-tight">Antartica TI - Dashboard</h1>
          <p className="text-xs text-gray-500">Sistema Integrado de Alerta y Monitoreo</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
          <Calendar className="text-gray-400 w-4 h-4" />
          <span className="text-sm font-medium text-gray-600">Oct 24, 2023</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

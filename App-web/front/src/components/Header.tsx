import React from 'react';
import { LayoutGrid, Calendar, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState<string>("");

  React.useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
      // First letter uppercase fix for Spanish "oct 24..." -> "Oct 24..."
      const dateStr = now.toLocaleDateString('es-ES', options);
      setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
    };

    updateDate();
    // Update every minute just in case
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-corporate-primary border-b border-white/10 h-16 flex items-center px-6 justify-between flex-shrink-0 z-30 shadow-md">
      <div className="flex items-center gap-4">
        <div className="bg-white/10 p-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors">
          <Link to="/" className="flex items-center">
            <LayoutGrid className="text-white w-6 h-6" />
          </Link>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">Antartica TI - Dashboard</h1>
          <p className="text-xs text-blue-100">Sistema Integrado de Alerta y Monitoreo</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-md border border-white/10">
          <Calendar className="text-blue-200 w-4 h-4" />
          <span className="text-sm font-medium text-white capitalize">{currentDate}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ContactCards from './components/ContactCards';
import TicketTable from './components/TicketTable';
import TicketSplitView from './components/TicketSplitView';
import BranchMonitor from './components/BranchMonitor';
import BranchDetailsModal from './components/BranchDetailsModal';
import AlarmManager from './components/AlarmManager';
import { useAppStore } from './stores/useAppStore';
import { Mail, Plus } from 'lucide-react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isSplitView = location.pathname === '/tickets';
  const [activeTab, setActiveTab] = React.useState<'tickets' | 'stock'>('tickets');

  return (
    <div className="flex flex-1 overflow-hidden p-4 md:p-6 gap-6 h-full relative">
      <AlarmManager />
      <BranchDetailsModal />

      <main className="flex-1 flex flex-col gap-6 h-full overflow-hidden">
        {/* Top Summary Section */}
        <section className="flex flex-col gap-4 flex-shrink-0">
          <div className="flex gap-4 overflow-x-auto pb-1">
            <div className="flex-1 min-w-[300px]"><KPICards /></div>
            {/* Maintain contacts but maybe smaller or same */}
          </div>
          <ContactCards />
        </section>

        {/* Dynamic Split Project Layout */}
        <div className="flex flex-row flex-1 gap-4 overflow-hidden min-h-0">

          {/* ZONE 1: Branch Monitor (Left 1/3) */}
          <div className="w-1/3 flex flex-col bg-slate-50 rounded-xl border border-gray-200 overflow-hidden min-h-0">
            <BranchMonitor />
          </div>

          {/* ZONE 2: Ticket Center & Stock (Right 2/3) */}
          <div className="w-2/3 flex flex-col bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden min-h-0">

            {/* Header Tabs */}
            <div className="p-0 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-colors ${activeTab === 'tickets'
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent hover:bg-gray-50'
                    }`}
                >
                  <div className={`p-1.5 rounded border ${activeTab === 'tickets' ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h2 className={`font-bold text-base leading-none ${activeTab === 'tickets' ? 'text-primary' : 'text-gray-600'}`}>
                      Centro de Tickets
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">Gestión centralizada</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('stock')}
                  className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-colors ${activeTab === 'stock'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-transparent hover:bg-gray-50'
                    }`}
                >
                  <div className={`p-1.5 rounded border ${activeTab === 'stock' ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}>
                    {/* Placeholder icon for Stock */}
                    <div className="w-4 h-4 flex items-center justify-center font-bold text-xs">TI</div>
                  </div>
                  <div className="text-left">
                    <h2 className={`font-bold text-base leading-none ${activeTab === 'stock' ? 'text-orange-600' : 'text-gray-600'}`}>
                      Stock Crítico TI
                    </h2>
                    <p className="text-[10px] text-gray-400 mt-0.5">Inventario de urgencia</p>
                  </div>
                </button>
              </div>

              {activeTab === 'tickets' && (
                <div className="flex gap-2 px-4">
                  <Link to={isSplitView ? "/" : "/tickets"} className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 rounded border border-gray-200 transition">
                    {isSplitView ? 'Ver Tabla' : 'Ver Vista Dividida'}
                  </Link>
                  <button className="px-3 py-1 text-xs font-medium bg-primary hover:bg-primary-dark text-white rounded transition flex items-center gap-1 shadow-sm">
                    <Plus className="w-3 h-3" /> Manual
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
              {activeTab === 'tickets' ? children : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center animate-in fade-in">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-gray-300">TI</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-600">Módulo de Stock Crítico</h3>
                  <p className="text-sm max-w-xs mt-2">Esta funcionalidad estará disponible en la próxima actualización. Aquí podrás gestionar el inventario crítico de TI.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const { connectWebSocket } = useAppStore();

  React.useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <Router>
      <div className="h-screen flex flex-col bg-[#f8f9fa] font-sans">
        <Header />
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <TicketTable />
            </DashboardLayout>
          } />
          <Route path="/tickets" element={
            <DashboardLayout>
              <TicketSplitView />
            </DashboardLayout>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

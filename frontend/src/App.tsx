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

          {/* ZONE 2: Ticket Center (Right 2/3) */}
          <div className="w-2/3 flex flex-col bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden min-h-0">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-1.5 rounded text-blue-600 border border-blue-100">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-base leading-none">Centro de Tickets</h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">Gestión centralizada de incidentes</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={isSplitView ? "/" : "/tickets"} className="px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 rounded border border-gray-200 transition">
                  {isSplitView ? 'Ver Tabla' : 'Ver Vista Dividida'}
                </Link>
                <button className="px-3 py-1 text-xs font-medium bg-primary hover:bg-primary-dark text-white rounded transition flex items-center gap-1 shadow-sm">
                  <Plus className="w-3 h-3" /> Manual
                </button>
              </div>
            </div>
            {children}
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

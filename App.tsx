import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import KPICards from './components/KPICards';
import ContactCards from './components/ContactCards';
import CriticalAlerts from './components/CriticalAlerts';
import TicketTable from './components/TicketTable';
import TicketSplitView from './components/TicketSplitView';
import { Mail, Plus } from 'lucide-react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isSplitView = location.pathname === '/tickets';

  return (
    <div className="flex flex-1 overflow-hidden p-4 md:p-6 gap-6 h-full">
      <main className="flex-1 flex flex-col gap-6 h-full overflow-hidden">
        {/* Top Section: KPIs and Contacts - Flexible height */}
        <section className="flex flex-col gap-4 flex-shrink-0">
          <KPICards />
          <ContactCards />
        </section>

        {/* Bottom Section: Alerts & Tickets - Takes remaining height */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 overflow-hidden min-h-0">
          <CriticalAlerts />
          
          <section className="flex-1 flex flex-col bg-white rounded-xl shadow-card border border-gray-200 overflow-hidden h-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-1.5 rounded text-blue-600 border border-blue-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-lg leading-none">Ticket Center</h2>
                  <p className="text-xs text-gray-500 mt-1">{isSplitView ? 'Prioritized Inbox' : 'Incoming Support Emails'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  to={isSplitView ? "/" : "/tickets"} 
                  className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition flex items-center border border-gray-200"
                >
                  {isSplitView ? 'View Table' : 'View Split View'}
                </Link>
                <button className="px-3 py-1.5 text-xs font-medium bg-primary hover:bg-primary-dark text-white rounded transition flex items-center gap-1 shadow-sm">
                  <Plus className="w-3 h-3" />
                  Manual Ticket
                </button>
              </div>
            </div>
            
            {/* Ticket Content Area */}
            {children}
            
          </section>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
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

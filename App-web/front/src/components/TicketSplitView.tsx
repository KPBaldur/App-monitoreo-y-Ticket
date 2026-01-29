import React from 'react';
import { Mail, AlertTriangle, Link as LinkIcon, ExternalLink, MailWarning } from 'lucide-react';

const TicketSplitView: React.FC = () => {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left Column: Urgent */}
      <div className="w-5/12 flex flex-col border-r border-gray-200 bg-red-50/10 h-full">
        <div className="px-4 py-2.5 bg-red-50/50 border-b border-red-100 flex justify-between items-center sticky top-0 backdrop-blur-sm z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <MailWarning className="text-red-600 w-4 h-4" />
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider">Urgent / Critical</span>
          </div>
          <span className="text-[10px] font-bold bg-white text-red-600 px-2 py-0.5 rounded-full border border-red-200 shadow-sm">Oldest First</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {/* Card 1 */}
          <div className="bg-white border-l-4 border-red-500 rounded-r-lg p-3 shadow-sm hover:shadow-md transition-all group cursor-pointer ring-1 ring-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase border border-red-200">
                <LinkIcon className="w-3 h-3" /> CRITICAL
              </span>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">2h 12m</span>
            </div>
            <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">URGENT: No connection at Branch 02</h4>
            <div className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1 bg-red-50/50 p-1.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              Linked Alert: Branch 02 Offline
            </div>
            <div className="mt-2 flex justify-between items-center border-t border-gray-100 pt-2">
              <span className="text-[11px] text-gray-500">From: Store Manager 02</span>
              <ExternalLink className="text-gray-300 group-hover:text-primary w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border-l-4 border-red-500 rounded-r-lg p-3 shadow-sm hover:shadow-md transition-all group cursor-pointer ring-1 ring-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase border border-red-200">
                <LinkIcon className="w-3 h-3" /> CRITICAL
              </span>
              <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">0h 50m</span>
            </div>
            <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">Branch 05 completely dark</h4>
            <div className="mt-2 text-xs text-red-500 font-medium flex items-center gap-1 bg-red-50/50 p-1.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              Linked Alert: Branch 05 Offline
            </div>
            <div className="mt-2 flex justify-between items-center border-t border-gray-100 pt-2">
              <span className="text-[11px] text-gray-500">From: Regional Mgr</span>
              <ExternalLink className="text-gray-300 group-hover:text-primary w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Normal */}
      <div className="w-7/12 flex flex-col bg-white h-full">
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Mail className="text-blue-600 w-4 h-4" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Incoming / New</span>
          </div>
          <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">Real-time</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50 custom-scrollbar">
          {[
            { title: "VPN Access issues for remote staff", time: "4h 12m", status: "Waiting", color: "yellow", from: "#49212 • Sales Team", dot: "bg-yellow-400" },
            { title: "New User Setup: M. Smith", time: "3h 05m", status: "Waiting", color: "yellow", from: "#49214 • HR Dept", dot: "bg-yellow-400" },
            { title: "Email Configuration Issue", time: "1h 10m", status: "Pending", color: "gray", from: "#49219 • User: j.doe", dot: "bg-gray-300" },
            { title: "POS System Restart Request", time: "45m", status: "In Process", color: "yellow", from: "#49220 • Helpdesk L1", dot: "bg-blue-500 animate-pulse" }
          ].map((item, idx) => (
            <div key={idx} className="p-3 hover:bg-gray-50 transition-colors group cursor-pointer flex gap-3">
              <div className="flex-shrink-0 pt-1">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${item.dot}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-gray-800 truncate group-hover:text-primary">{item.title}</h4>
                  <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 rounded flex-shrink-0">{item.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${item.color === 'yellow' ? 'text-yellow-700 bg-yellow-50 border-yellow-100' :
                      item.color === 'gray' ? 'text-gray-600 bg-gray-100 border-gray-200' :
                        'text-blue-700 bg-blue-50 border-blue-200'
                    }`}>{item.status}</span>
                  <span className="text-[11px] text-gray-400">{item.from}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Done Item */}
          <div className="p-3 hover:bg-gray-50 transition-colors group cursor-pointer flex gap-3 opacity-60">
            <div className="flex-shrink-0 pt-1">
              <span className="text-green-600">●</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-gray-500 line-through decoration-gray-400 truncate">Printer access restored</h4>
                <span className="text-xs font-mono text-gray-400">--</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 uppercase">Done</span>
                <span className="text-[11px] text-gray-400">#49215 • Branch 01</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketSplitView;

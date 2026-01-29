import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertTriangle, Link as LinkIcon, ExternalLink, ChevronRight, Check } from 'lucide-react';
import { Ticket } from '../types';

const tickets: Ticket[] = [
  { id: '1', status: 'critical', subject: 'URGENT: No connection at Branch 02', issueCode: 'Branch 02 Offline', from: 'Store Manager 02', waitTime: '2h 12m', isLinkedAlert: true },
  { id: '2', status: 'in-process', subject: 'POS System Restart Request', issueCode: 'Ticket #49220', from: 'Helpdesk L1', waitTime: '45m' },
  { id: '3', status: 'waiting', subject: 'Email Configuration Issue', issueCode: 'Ticket #49219', from: 'User: j.doe', waitTime: '1h 10m' },
  { id: '4', status: 'critical', subject: 'Branch 05 completely dark', issueCode: 'Branch 05 Offline', from: 'Regional Mgr', waitTime: '0h 50m', isLinkedAlert: true },
  { id: '5', status: 'done', subject: 'Printer access restored', issueCode: 'Ticket #49215', from: 'Branch 01', waitTime: '--' },
  { id: '6', status: 'waiting', subject: 'New User Setup: M. Smith', issueCode: 'Ticket #49214', from: 'HR Dept', waitTime: '3h 05m' },
  { id: '7', status: 'waiting', subject: 'VPN Access issues for remote staff', issueCode: 'Ticket #49212', from: 'Sales Team', waitTime: '4h 12m' },
];

const TicketTable: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10 text-xs text-gray-500 uppercase font-semibold tracking-wider shadow-sm">
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 w-28">Status</th>
            <th className="px-6 py-3 border-b border-gray-200">Subject / Issue</th>
            <th className="px-6 py-3 border-b border-gray-200 w-40">From</th>
            <th className="px-6 py-3 border-b border-gray-200 text-right w-32">Wait Time</th>
            <th className="px-6 py-3 border-b border-gray-200 w-16"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className={`group hover:bg-gray-50 transition-colors cursor-pointer ${ticket.status === 'critical' ? 'bg-red-50/20 hover:bg-red-50/40' : ''}`}
              onClick={() => navigate('/tickets')}
            >
              <td className="px-6 py-3 align-middle">
                {ticket.status === 'critical' && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase border border-red-200">
                    <LinkIcon className="w-3 h-3" /> Critical
                  </span>
                )}
                {ticket.status === 'in-process' && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase border border-yellow-200">
                    In Process
                  </span>
                )}
                {ticket.status === 'waiting' && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-[10px] font-bold uppercase border border-gray-200">
                    Waiting
                  </span>
                )}
                {ticket.status === 'done' && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase border border-green-200">
                    Done
                  </span>
                )}
              </td>
              <td className="px-6 py-3">
                <div className={`font-bold ${ticket.status === 'done' ? 'text-gray-400 line-through decoration-gray-400 font-medium' : 'text-gray-800'}`}>
                  {ticket.subject}
                </div>
                <div className={`text-xs mt-0.5 flex items-center gap-1 ${ticket.isLinkedAlert ? 'text-red-500 font-medium' : 'text-gray-400'
                  }`}>
                  {ticket.isLinkedAlert && <AlertTriangle className="w-3 h-3" />}
                  {ticket.isLinkedAlert ? 'Linked Alert: ' : ''}{ticket.issueCode}
                </div>
              </td>
              <td className="px-6 py-3 text-gray-600">{ticket.from}</td>
              <td className="px-6 py-3 text-right font-mono text-gray-500">{ticket.waitTime}</td>
              <td className="px-6 py-3 text-right">
                <button className="text-gray-400 group-hover:text-primary transition-colors">
                  {ticket.status === 'done' ? <Check className="w-4 h-4" /> : ticket.status === 'critical' ? <ExternalLink className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;

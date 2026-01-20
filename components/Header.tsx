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
          <h1 className="text-lg font-bold text-gray-800 leading-tight">SGIC Dashboard</h1>
          <p className="text-xs text-gray-500">Integrated Alerts & Ticket Report</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200">
          <Calendar className="text-gray-400 w-4 h-4" />
          <span className="text-sm font-medium text-gray-600">Oct 24, 2023</span>
        </div>
        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1 pr-2 rounded-full transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">IT Support</p>
          </div>
          <div className="relative">
            <div 
                className="bg-center bg-no-repeat bg-cover rounded-full h-9 w-9 shrink-0 border border-gray-200 shadow-sm" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIqThShVdz5CfcW2J5DdfvuqmpH48ARAtlc-Mh5LKTZR9rvq_r7s1tBSuWs7xBr8Pj4mfIZDEL3MU0H4At3RC2Fl6zAwTiPagDMpgsWkKi1ovQdSetBRXvX7kum7oRWZWbUDA95tq8XTXT35qC3nCgCkmiii7uAbNmYxRyWE3hHISRXs8TSzVBrI7L5jhg2JAzlgiHdT8zKgquHCU6CF5hph2r3DyoVfQQFiqLlEybYosMCPy6W4sEroZoQh-iZJih01919bK2MJDt")'}}
            />
             <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

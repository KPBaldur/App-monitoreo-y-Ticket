import React from 'react';
import { Server } from 'lucide-react';

const ContactCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Claro */}
      <div className="bg-[#da291c] rounded-lg p-3 flex flex-col justify-center text-white relative shadow-sm overflow-hidden min-h-[80px] hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-medium opacity-80">RUT: 88.679.500-9</span>
          <span className="font-bold text-lg leading-none">Claro-</span>
        </div>
        <div className="text-2xl font-bold tracking-tight">800 000 171</div>
        <span className="text-[10px] opacity-80 absolute bottom-3 right-3 font-semibold tracking-wider">empresas</span>
      </div>

      {/* GTD */}
      <div className="bg-[#1d4fd8] rounded-lg p-3 flex flex-col justify-center text-white relative shadow-sm overflow-hidden min-h-[80px] hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-medium opacity-80">RUT: 88.679.500-9</span>
          <span className="font-bold italic text-xl leading-none">gtd</span>
        </div>
        <div className="text-2xl font-bold tracking-tight">800 390 800</div>
      </div>

      {/* Entel */}
      <div className="bg-white border border-[#002eff] rounded-lg p-3 flex flex-col justify-center text-[#002eff] relative shadow-sm overflow-hidden min-h-[80px] hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] text-gray-500 font-medium">RUT: 77.329.910-2</span>
          <span className="font-bold italic text-xl leading-none lowercase text-[#002eff]">e)</span>
        </div>
        <div className="text-2xl font-bold tracking-tight">600 360 0106</div>
      </div>

      {/* Generic IP */}
      <div className="bg-white border border-[#2563eb] rounded-lg p-3 flex flex-col justify-center text-[#2563eb] relative shadow-sm overflow-hidden min-h-[80px] hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-500 font-medium">Ip public: 200.6.103.170</span>
            <span className="text-[9px] text-gray-500 font-medium">Ip interna: 10.10.9.2</span>
          </div>
          <Server className="w-6 h-6 opacity-80" />
        </div>
        <div className="text-lg font-bold tracking-tight mt-1">(56) 2 2840 1100</div>
      </div>
    </div>
  );
};

export default ContactCards;

import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { X, Phone, Server, FileText, Save, Clock } from 'lucide-react';

const BranchDetailsModal: React.FC = () => {
    const { selectedBranchId, branches, setSelectedBranchId } = useAppStore();
    const [notes, setNotes] = useState('El router se encuentra en el rack principal, llave con el guardia.');

    if (!selectedBranchId) return null;

    const branch = branches.find(b => b.id === selectedBranchId);
    if (!branch) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{branch.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs font-bold uppercase rounded border ${branch.status === 'offline'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                }`}>
                                {branch.status}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">{branch.code}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedBranchId(null)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left: Contact & Info */}
                    <div className="space-y-6">
                        <section>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                                <Phone className="w-3 h-3" /> Contacto Proveedor
                            </h3>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-blue-900 text-lg">{branch.provider.name}</span>
                                    <span className="text-xs bg-white text-blue-800 px-2 py-0.5 rounded border border-blue-100 font-mono">
                                        {branch.provider.serviceCode}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-700 font-bold text-2xl">
                                    <Phone className="w-5 h-5" />
                                    {branch.provider.contact}
                                </div>
                                <p className="text-xs text-blue-600/70 mt-2">
                                    Mencionar código de servicio al llamar.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Server className="w-3 h-3" /> Detalles Técnicos
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="p-2 bg-gray-50 rounded border border-gray-100">
                                    <span className="block text-xs text-gray-400">IP Wan</span>
                                    <span className="font-mono font-medium">{branch.ip}</span>
                                </div>
                                <div className="p-2 bg-gray-50 rounded border border-gray-100">
                                    <span className="block text-xs text-gray-400">Latencia</span>
                                    <span className="font-mono font-medium">{branch.latency.toFixed(0)} ms</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Base de Conocimientos */}
                    <div className="flex flex-col h-full bg-amber-50/50 rounded-xl border border-amber-100 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-bold text-amber-800 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> Observaciones Técnicas
                            </h3>
                            <span className="text-[10px] text-amber-600 font-medium">Internal Wiki</span>
                        </div>

                        <textarea
                            className="flex-1 w-full bg-white border border-amber-200 rounded-lg p-3 text-sm text-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Escriba aquí detalles importantes sobre la instalación técnica de este local..."
                        />

                        <div className="mt-3 flex justify-end">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded transition-colors shadow-sm">
                                <Save className="w-3 h-3" /> Guardar Notas
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Última actualización: Hace un momento</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedBranchId(null)}
                            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                        >
                            Cerrar
                        </button>
                        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm transition-colors">
                            Generar Reporte PDF
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BranchDetailsModal;

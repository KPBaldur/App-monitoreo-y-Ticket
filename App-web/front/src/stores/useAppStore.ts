import { create } from 'zustand';
import { Ticket } from '../types';

export interface Branch {
  id: string;
  name: string;
  code: string;
  status: 'online' | 'offline' | 'warning';
  provider: {
    name: string;
    contact: string;
    serviceCode: string;
  };
  lastPing: string;
  lastChange: string | null;
  latency: number;
  ip: string;
}

interface AppState {
  branches: Branch[];
  setBranchStatus: (id: string, status: Branch['status']) => void;
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;

  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;

  // Recovered Branches
  recoveredBranches: Branch[];
  addRecoveredBranch: (branch: Branch) => void;
  removeRecoveredBranch: (id: string) => void;

  // WebSocket Actions
  connectWebSocket: () => void;
  wsStatus: 'disconnected' | 'connecting' | 'connected';
}

const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-101',
    status: 'critical',
    subject: 'URGENTE: Sucursal Sin Conexión',
    from: 'Monitor Sistema',
    waitTime: '0m',
    isLinkedAlert: true,
    linkedAlertText: 'Alerta Automática'
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  branches: [],
  wsStatus: 'disconnected',
  tickets: MOCK_TICKETS,

  setBranchStatus: (id, status) => set((state) => ({
    branches: state.branches.map(b => b.id === id ? { ...b, status } : b)
  })),

  selectedBranchId: null,
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
  addTicket: (ticket) => set((state) => ({ tickets: [ticket, ...state.tickets] })),

  // Recovered Branches (for temporary green display)
  recoveredBranches: [],
  addRecoveredBranch: (branch) => set((state) => {
    if (state.recoveredBranches.find(b => b.id === branch.id)) return {};
    return { recoveredBranches: [...state.recoveredBranches, branch] };
  }),
  removeRecoveredBranch: (id) => set((state) => ({
    recoveredBranches: state.recoveredBranches.filter(b => b.id !== id)
  })),

  connectWebSocket: () => {
    if (get().wsStatus === 'connected') return;

    set({ wsStatus: 'connecting' });
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('WS Connected');
      set({ wsStatus: 'connected' });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Transform Legacy Data (Dict) -> Branch Array
        const mappedBranches: Branch[] = Object.values(data).map((item: any, index) => ({
          id: item.nombre, // Usamos nombre como ID único
          name: item.nombre, // "T300 Alto Las Condes"
          code: `S-${item.nombre.split(' ')[0]}`, // "S-T300"
          status: item.activo ? 'online' : 'offline',
          provider: {
            name: item.compania || 'Desconocido',
            contact: item.telefono_compania || '---',
            serviceCode: item.codigo_servicio || '---'
          },
          lastPing: item.ultimo_check || 'Nunca',
          lastChange: item.ultimo_cambio || null,
          latency: item.tiempo_respuesta,
          ip: item.ip
        }));

        set({ branches: mappedBranches });

      } catch (e) {
        console.error('Error parsing WS data', e);
      }
    };

    ws.onclose = () => {
      console.log('WS Disconnected, retrying in 3s...');
      set({ wsStatus: 'disconnected' });
      setTimeout(() => get().connectWebSocket(), 3000);
    };

    ws.onerror = (e) => {
      console.error('WS Error', e);
      ws.close();
    };
  }
}));

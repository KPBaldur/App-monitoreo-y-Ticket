export interface Ticket {
  id: string;
  status: 'critical' | 'in-process' | 'waiting' | 'done';
  subject: string;
  issueCode?: string;
  from: string;
  waitTime: string;
  isLinkedAlert?: boolean;
  linkedAlertText?: string;
}

export interface Alert {
  id: string;
  branch: string;
  branchId: string;
  type: 'critical' | 'warning';
  issue: string;
  downtimeLabel: string;
  downtimeValue: string;
  iconType: 'wifi_off' | 'power_off' | 'speed' | 'router';
}

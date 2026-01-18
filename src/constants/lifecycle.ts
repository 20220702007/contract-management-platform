import { ContractStatus } from '../types';

export const CONTRACT_STATUSES: ContractStatus[] = [
  'created',
  'approved',
  'sent',
  'signed',
  'locked',
];

export const STATUS_LABELS: Record<ContractStatus, string> = {
  created: 'Created',
  approved: 'Approved',
  sent: 'Sent',
  signed: 'Signed',
  locked: 'Locked',
  revoked: 'Revoked',
};

export const STATUS_COLORS: Record<ContractStatus, string> = {
  created: 'bg-blue-100 text-blue-800',
  approved: 'bg-yellow-100 text-yellow-800',
  sent: 'bg-purple-100 text-purple-800',
  signed: 'bg-green-100 text-green-800',
  locked: 'bg-gray-100 text-gray-800',
  revoked: 'bg-red-100 text-red-800',
};

export const STATUS_GROUPS: Record<string, ContractStatus[]> = {
  active: ['created', 'approved', 'sent'],
  pending: ['created', 'approved', 'sent'],
  signed: ['signed', 'locked'],
};

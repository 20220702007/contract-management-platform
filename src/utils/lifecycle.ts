import { ContractStatus } from '../types';

const VALID_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  created: ['approved', 'revoked'],
  approved: ['sent', 'revoked'],
  sent: ['signed', 'revoked'],
  signed: ['locked'],
  locked: [],
  revoked: [],
};

export function canTransitionTo(
  currentStatus: ContractStatus,
  targetStatus: ContractStatus
): boolean {
  if (currentStatus === 'revoked' || currentStatus === 'locked') {
    return false;
  }

  return VALID_TRANSITIONS[currentStatus]?.includes(targetStatus) ?? false;
}

export function getAvailableTransitions(
  currentStatus: ContractStatus
): ContractStatus[] {
  if (currentStatus === 'revoked' || currentStatus === 'locked') {
    return [];
  }

  return VALID_TRANSITIONS[currentStatus] ?? [];
}

export function canEditContract(status: ContractStatus): boolean {
  return status !== 'locked' && status !== 'revoked';
}

export function getNextStatus(currentStatus: ContractStatus): ContractStatus | null {
  const transitions = getAvailableTransitions(currentStatus);
  const next = transitions.find(s => s !== 'revoked');
  return next ?? null;
}

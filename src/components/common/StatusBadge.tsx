import React from 'react';
import { ContractStatus } from '../../types';
import { STATUS_LABELS, STATUS_COLORS } from '../../constants/lifecycle';

interface StatusBadgeProps {
  status: ContractStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
};

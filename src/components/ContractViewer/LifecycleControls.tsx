import React, { useState } from 'react';
import { ContractStatus } from '../../types';
import { Button } from '../common/Button';
import { StatusTransitionModal } from './StatusTransitionModal';
import { getAvailableTransitions } from '../../utils/lifecycle';
import { STATUS_LABELS } from '../../constants/lifecycle';

interface LifecycleControlsProps {
  currentStatus: ContractStatus;
  onStatusChange: (newStatus: ContractStatus) => boolean;
}

export const LifecycleControls: React.FC<LifecycleControlsProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const availableTransitions = getAvailableTransitions(currentStatus);

  const handleStatusChange = (newStatus: ContractStatus) => {
    const success = onStatusChange(newStatus);
    if (success) {
      setShowModal(false);
    }
  };

  if (availableTransitions.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No status transitions available. Contract is {STATUS_LABELS[currentStatus]}.
      </div>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Change Status
      </Button>
      <StatusTransitionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentStatus={currentStatus}
        availableTransitions={availableTransitions}
        onTransition={handleStatusChange}
      />
    </>
  );
};

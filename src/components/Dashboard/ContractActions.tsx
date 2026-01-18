import React, { useState } from 'react';
import { Contract, ContractStatus } from '../../types';
import { Button } from '../common/Button';
import { StatusTransitionModal } from '../ContractViewer/StatusTransitionModal';
import { getAvailableTransitions } from '../../utils/lifecycle';
import { useContractsStore } from '../../store/contractsStore';

interface ContractActionsProps {
  contract: Contract;
  onView: () => void;
}

export const ContractActions: React.FC<ContractActionsProps> = ({
  contract,
  onView,
}) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const updateContractStatus = useContractsStore(
    (state) => state.updateContractStatus
  );
  const availableTransitions = getAvailableTransitions(contract.status);

  const handleStatusChange = (newStatus: ContractStatus) => {
    updateContractStatus(contract.id, newStatus);
    setShowStatusModal(false);
  };

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="primary" onClick={onView}>
        View
      </Button>
      {availableTransitions.length > 0 && (
        <>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowStatusModal(true)}
          >
            Change Status
          </Button>
          <StatusTransitionModal
            isOpen={showStatusModal}
            onClose={() => setShowStatusModal(false)}
            currentStatus={contract.status}
            availableTransitions={availableTransitions}
            onTransition={handleStatusChange}
          />
        </>
      )}
    </div>
  );
};

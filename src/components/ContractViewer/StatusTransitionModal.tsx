import React, { useState } from 'react';
import { ContractStatus } from '../../types';
import { Modal } from '../common/Modal';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { STATUS_LABELS } from '../../constants/lifecycle';

interface StatusTransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: ContractStatus;
  availableTransitions: ContractStatus[];
  onTransition: (newStatus: ContractStatus) => void;
}

export const StatusTransitionModal: React.FC<StatusTransitionModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  availableTransitions,
  onTransition,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<ContractStatus | ''>('');

  const handleTransition = () => {
    if (selectedStatus && availableTransitions.includes(selectedStatus as ContractStatus)) {
      onTransition(selectedStatus as ContractStatus);
      setSelectedStatus('');
      onClose();
    }
  };

  const options = availableTransitions.map((status) => ({
    value: status,
    label: STATUS_LABELS[status],
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Contract Status"
      size="md"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Current Status: <strong>{STATUS_LABELS[currentStatus]}</strong>
          </p>
          {availableTransitions.length === 0 ? (
            <p className="text-sm text-red-600">
              No status transitions available for this contract.
            </p>
          ) : (
            <>
              <Select
                label="New Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ContractStatus)}
                options={[
                  { value: '', label: '-- Select Status --' },
                  ...options,
                ]}
              />
              {selectedStatus === 'signed' && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> When a contract is signed, it will automatically be locked and cannot be edited.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleTransition}
            disabled={!selectedStatus || availableTransitions.length === 0}
          >
            Change Status
          </Button>
        </div>
      </div>
    </Modal>
  );
};

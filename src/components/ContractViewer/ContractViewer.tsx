import React, { useState } from 'react';
import { Contract } from '../../types';
import { useBlueprintsStore } from '../../store/blueprintsStore';
import { useContractsStore } from '../../store/contractsStore';
import { useContractLifecycle } from '../../hooks/useContractLifecycle';
import { ContractEditor } from './ContractEditor';
import { LifecycleControls } from './LifecycleControls';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/dateHelpers';
import { canEditContract } from '../../utils/lifecycle';

interface ContractViewerProps {
  contractId: string;
  onBack: () => void;
}

export const ContractViewer: React.FC<ContractViewerProps> = ({
  contractId,
  onBack,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const contract = useContractsStore((state) =>
    state.getContract(contractId)
  );
  const updateContract = useContractsStore((state) => state.updateContract);
  const updateContractStatus = useContractsStore(
    (state) => state.updateContractStatus
  );
  const blueprint = useBlueprintsStore((state) =>
    contract ? state.getBlueprint(contract.blueprintId) : undefined
  );

  const { canEdit, transitionTo } = useContractLifecycle(contractId);

  if (!contract || !blueprint) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Contract not found</p>
        <button
          onClick={onBack}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = (updates: {
    name?: string;
    startingDate?: string;
    party?: string;
    fieldValues: any[];
  }) => {
    updateContract(contractId, updates);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: Contract['status']): boolean => {
    return transitionTo(newStatus);
  };

  const canEditNow = canEdit && canEditContract(contract.status);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{contract.name}</h1>
          <div className="mt-2 flex items-center gap-4">
            <StatusBadge status={contract.status} />
            <span className="text-sm text-gray-500">
              Created: {formatDate(contract.createdAt)}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-600">
            Blueprint: {contract.blueprintName}
          </div>
          {(contract.party || contract.startingDate) && (
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              {contract.party && (
                <div className="text-gray-600">
                  <span className="font-medium">Party:</span> {contract.party}
                </div>
              )}
              {contract.startingDate && (
                <div className="text-gray-600">
                  <span className="font-medium">Starting Date:</span>{' '}
                  {formatDate(contract.startingDate)}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {!isEditing && canEditNow && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit
            </button>
          )}
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      {isEditing ? (
        <ContractEditor
          contract={contract}
          blueprintFields={blueprint.fields}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          disabled={!canEditNow}
        />
      ) : (
        <div className="space-y-4">
          <ContractEditor
            contract={contract}
            blueprintFields={blueprint.fields}
            onSave={handleSave}
            onCancel={() => {}}
            disabled={true}
          />

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Status Management</h3>
            <LifecycleControls
              currentStatus={contract.status}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

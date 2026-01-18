import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueprintsStore } from '../store/blueprintsStore';
import { useContractsStore } from '../store/contractsStore';
import { ContractForm } from '../components/ContractForm/ContractForm';
import { Contract, ContractFieldValue } from '../types';
import { getCurrentDateTime } from '../utils/dateHelpers';

export const CreateContractPage: React.FC = () => {
  const navigate = useNavigate();
  const blueprints = useBlueprintsStore((state) => state.blueprints);
  const loadBlueprints = useBlueprintsStore((state) => state.loadBlueprints);
  const addContract = useContractsStore((state) => state.addContract);
  const getBlueprint = useBlueprintsStore((state) => state.getBlueprint);

  useEffect(() => {
    loadBlueprints();
  }, [loadBlueprints]);

  const handleSave = (contractData: {
    name: string;
    blueprintId: string;
    startingDate?: string;
    party?: string;
    fieldValues: ContractFieldValue[];
  }) => {
    const blueprint = getBlueprint(contractData.blueprintId);
    if (!blueprint) return;

    const newContract: Contract = {
      id: `contract-${Date.now()}`,
      name: contractData.name,
      blueprintId: contractData.blueprintId,
      blueprintName: blueprint.name,
      status: 'created',
      startingDate: contractData.startingDate,
      party: contractData.party,
      fieldValues: contractData.fieldValues,
      createdAt: getCurrentDateTime(),
      updatedAt: getCurrentDateTime(),
    };

    addContract(newContract);
    navigate('/');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Contract</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <ContractForm
          blueprints={blueprints}
          onSave={handleSave}
          onCancel={() => navigate('/')}
        />
      </div>
    </div>
  );
};

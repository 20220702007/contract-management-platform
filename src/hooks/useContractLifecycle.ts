import { useContractsStore } from '../store/contractsStore';
import { getAvailableTransitions, canEditContract } from '../utils/lifecycle';
import { ContractStatus } from '../types';

export function useContractLifecycle(contractId: string) {
  const contract = useContractsStore((state) =>
    state.contracts.find((c) => c.id === contractId)
  );
  const updateContractStatus = useContractsStore(
    (state) => state.updateContractStatus
  );

  if (!contract) {
    return {
      contract: null,
      canEdit: false,
      availableTransitions: [],
      transitionTo: () => false,
    };
  }

  const availableTransitions = getAvailableTransitions(contract.status);
  const canEdit = canEditContract(contract.status);

  const transitionTo = (newStatus: ContractStatus): boolean => {
    return updateContractStatus(contractId, newStatus);
  };

  return {
    contract,
    canEdit,
    availableTransitions,
    transitionTo,
  };
}

import { create } from 'zustand';
import { Contract, ContractStatus } from '../types';
import { loadContracts, saveContracts as persistContracts } from '../utils/persistence';
import { getCurrentDateTime } from '../utils/dateHelpers';
import { canTransitionTo } from '../utils/lifecycle';
import type { ContractsState } from './types';

export const useContractsStore = create<ContractsState>((set, get) => ({
  contracts: [],

  loadContracts: () => {
    const contracts = loadContracts();
    set({ contracts });
  },

  saveContracts: () => {
    const { contracts } = get();
    persistContracts(contracts);
  },

  addContract: (contract: Contract) => {
    set((state) => ({
      contracts: [...state.contracts, contract],
    }));
    get().saveContracts();
  },

  updateContract: (id: string, updates: Partial<Contract>) => {
    const contract = get().contracts.find((c) => c.id === id);
    if (!contract) return;

    if (contract.status === 'locked' || contract.status === 'revoked') {
      return;
    }

    set((state) => ({
      contracts: state.contracts.map((contract) =>
        contract.id === id
          ? { ...contract, ...updates, updatedAt: getCurrentDateTime() }
          : contract
      ),
    }));
    get().saveContracts();
  },

  updateContractStatus: (id: string, newStatus: ContractStatus): boolean => {
    const contract = get().contracts.find((c) => c.id === id);
    if (!contract) return false;

    if (!canTransitionTo(contract.status, newStatus)) {
      return false;
    }

    set((state) => {
      const updatedContracts = state.contracts.map((c) => {
        if (c.id === id) {
          const updatedContract = { ...c, status: newStatus, updatedAt: getCurrentDateTime() };
          
          if (newStatus === 'signed') {
            return { ...updatedContract, status: 'locked', updatedAt: getCurrentDateTime() };
          }
          
          return updatedContract;
        }
        return c;
      });
      
      return { contracts: updatedContracts };
    });
    get().saveContracts();
    return true;
  },

  deleteContract: (id: string) => {
    const contract = get().contracts.find((c) => c.id === id);
    if (contract && (contract.status === 'locked' || contract.status === 'revoked')) {
      return;
    }
    set((state) => ({
      contracts: state.contracts.filter((c) => c.id !== id),
    }));
    get().saveContracts();
  },

  getContract: (id: string) => {
    return get().contracts.find((c) => c.id === id);
  },
}));

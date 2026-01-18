import { Blueprint, Contract } from '../types';

export interface BlueprintsState {
  blueprints: Blueprint[];
  addBlueprint: (blueprint: Blueprint) => void;
  updateBlueprint: (id: string, blueprint: Partial<Blueprint>) => void;
  deleteBlueprint: (id: string) => void;
  getBlueprint: (id: string) => Blueprint | undefined;
  loadBlueprints: () => void;
  saveBlueprints: () => void;
}

export interface ContractsState {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContract: (id: string, contract: Partial<Contract>) => void;
  deleteContract: (id: string) => void;
  getContract: (id: string) => Contract | undefined;
  updateContractStatus: (id: string, status: Contract['status']) => boolean;
  loadContracts: () => void;
  saveContracts: () => void;
}

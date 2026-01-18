import { create } from 'zustand';
import { Blueprint } from '../types';
import { loadBlueprints, saveBlueprints as persistBlueprints } from '../utils/persistence';
import { getCurrentDateTime } from '../utils/dateHelpers';
import type { BlueprintsState } from './types';

export const useBlueprintsStore = create<BlueprintsState>((set, get) => ({
  blueprints: [],

  loadBlueprints: () => {
    const blueprints = loadBlueprints();
    set({ blueprints });
  },

  saveBlueprints: () => {
    const { blueprints } = get();
    persistBlueprints(blueprints);
  },

  addBlueprint: (blueprint: Blueprint) => {
    set((state) => ({
      blueprints: [...state.blueprints, blueprint],
    }));
    get().saveBlueprints();
  },

  updateBlueprint: (id: string, updates: Partial<Blueprint>) => {
    set((state) => ({
      blueprints: state.blueprints.map((bp) =>
        bp.id === id
          ? { ...bp, ...updates, updatedAt: getCurrentDateTime() }
          : bp
      ),
    }));
    get().saveBlueprints();
  },

  deleteBlueprint: (id: string) => {
    set((state) => ({
      blueprints: state.blueprints.filter((bp) => bp.id !== id),
    }));
    get().saveBlueprints();
  },

  getBlueprint: (id: string) => {
    return get().blueprints.find((bp) => bp.id === id);
  },
}));

import { create } from 'zustand';
import { FieldLibraryItem } from '../types';
import { loadFieldLibrary, saveFieldLibrary as persistFieldLibrary } from '../utils/persistence';
import { getCurrentDateTime } from '../utils/dateHelpers';

interface FieldLibraryState {
  fields: FieldLibraryItem[];
  addField: (field: Omit<FieldLibraryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateField: (id: string, updates: Partial<FieldLibraryItem>) => void;
  deleteField: (id: string) => void;
  getField: (id: string) => FieldLibraryItem | undefined;
  getFieldsByCategory: (category?: string) => FieldLibraryItem[];
  loadFieldLibrary: () => void;
  saveFieldLibrary: () => void;
}

export const useFieldLibraryStore = create<FieldLibraryState>((set, get) => ({
  fields: [],

  loadFieldLibrary: () => {
    const fields = loadFieldLibrary();
    set({ fields });
  },

  saveFieldLibrary: () => {
    const { fields } = get();
    persistFieldLibrary(fields);
  },

  addField: (fieldData) => {
    const newField: FieldLibraryItem = {
      id: `field-lib-${Date.now()}`,
      ...fieldData,
      createdAt: getCurrentDateTime(),
      updatedAt: getCurrentDateTime(),
    };
    set((state) => ({
      fields: [...state.fields, newField],
    }));
    get().saveFieldLibrary();
  },

  updateField: (id: string, updates: Partial<FieldLibraryItem>) => {
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id
          ? { ...field, ...updates, updatedAt: getCurrentDateTime() }
          : field
      ),
    }));
    get().saveFieldLibrary();
  },

  deleteField: (id: string) => {
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    }));
    get().saveFieldLibrary();
  },

  getField: (id: string) => {
    return get().fields.find((field) => field.id === id);
  },

  getFieldsByCategory: (category?: string) => {
    if (!category) return get().fields;
    return get().fields.filter((field) => field.category === category);
  },
}));

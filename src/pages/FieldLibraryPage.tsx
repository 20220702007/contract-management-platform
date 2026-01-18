import React, { useEffect } from 'react';
import { useFieldLibraryStore } from '../store/fieldLibraryStore';
import { FieldLibraryManager } from '../components/FieldLibrary/FieldLibraryManager';

export const FieldLibraryPage: React.FC = () => {
  const loadFieldLibrary = useFieldLibraryStore((state) => state.loadFieldLibrary);

  useEffect(() => {
    loadFieldLibrary();
  }, [loadFieldLibrary]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Field Library</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <FieldLibraryManager />
      </div>
    </div>
  );
};

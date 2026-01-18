import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueprintsStore } from '../store/blueprintsStore';
import { BlueprintEditor } from '../components/BlueprintEditor/BlueprintEditor';
import { Blueprint } from '../types';
import { getCurrentDateTime } from '../utils/dateHelpers';

export const CreateBlueprintPage: React.FC = () => {
  const navigate = useNavigate();
  const addBlueprint = useBlueprintsStore((state) => state.addBlueprint);

  const handleSave = (blueprintData: Omit<Blueprint, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBlueprint: Blueprint = {
      id: `blueprint-${Date.now()}`,
      ...blueprintData,
      createdAt: getCurrentDateTime(),
      updatedAt: getCurrentDateTime(),
    };
    addBlueprint(newBlueprint);
    navigate('/blueprints');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Blueprint</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <BlueprintEditor onSave={handleSave} onCancel={() => navigate('/blueprints')} />
      </div>
    </div>
  );
};

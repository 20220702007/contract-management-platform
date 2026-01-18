import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlueprintsStore } from '../store/blueprintsStore';
import { BlueprintEditor } from '../components/BlueprintEditor/BlueprintEditor';

export const EditBlueprintPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const getBlueprint = useBlueprintsStore((state) => state.getBlueprint);
  const updateBlueprint = useBlueprintsStore((state) => state.updateBlueprint);
  const blueprint = id ? getBlueprint(id) : undefined;

  useEffect(() => {
    if (id && !blueprint) {
      navigate('/blueprints');
    }
  }, [id, blueprint, navigate]);

  if (!blueprint) {
    return <div>Blueprint not found</div>;
  }

  const handleSave = (blueprintData: Omit<typeof blueprint, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (id) {
      updateBlueprint(id, blueprintData);
      navigate('/blueprints');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Blueprint</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <BlueprintEditor
          blueprint={blueprint}
          onSave={handleSave}
          onCancel={() => navigate('/blueprints')}
        />
      </div>
    </div>
  );
};

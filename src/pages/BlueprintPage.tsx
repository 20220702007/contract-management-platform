import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueprintsStore } from '../store/blueprintsStore';
import { Blueprint } from '../types';
import { Button } from '../components/common/Button';
import { Table } from '../components/common/Table';
import { formatDate } from '../utils/dateHelpers';
import { getCurrentDateTime } from '../utils/dateHelpers';

export const BlueprintPage: React.FC = () => {
  const navigate = useNavigate();
  const blueprints = useBlueprintsStore((state) => state.blueprints);
  const loadBlueprints = useBlueprintsStore((state) => state.loadBlueprints);
  const deleteBlueprint = useBlueprintsStore((state) => state.deleteBlueprint);

  useEffect(() => {
    loadBlueprints();
  }, [loadBlueprints]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blueprint?')) {
      deleteBlueprint(id);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Blueprint Name',
      render: (blueprint: Blueprint) => (
        <span className="font-medium">{blueprint.name}</span>
      ),
    },
    {
      key: 'fields',
      header: 'Fields Count',
      render: (blueprint: Blueprint) => blueprint.fields.length,
    },
    {
      key: 'createdAt',
      header: 'Created Date',
      render: (blueprint: Blueprint) => formatDate(blueprint.createdAt),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (blueprint: Blueprint) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(`/blueprints/${blueprint.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(blueprint.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blueprints</h1>
        <Button
          variant="primary"
          onClick={() => navigate('/blueprints/create')}
        >
          Create Blueprint
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Table
          columns={columns}
          data={blueprints}
          emptyMessage="No blueprints found. Create a blueprint to get started."
        />
      </div>
    </div>
  );
};

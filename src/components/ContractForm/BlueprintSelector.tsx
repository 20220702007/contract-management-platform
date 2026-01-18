import React from 'react';
import { Blueprint } from '../../types';
import { Select } from '../common/Select';

interface BlueprintSelectorProps {
  blueprints: Blueprint[];
  selectedBlueprintId?: string;
  onSelect: (blueprintId: string) => void;
}

export const BlueprintSelector: React.FC<BlueprintSelectorProps> = ({
  blueprints,
  selectedBlueprintId,
  onSelect,
}) => {
  const options = blueprints.map((bp) => ({
    value: bp.id,
    label: bp.name,
  }));

  return (
    <Select
      label="Select Blueprint"
      value={selectedBlueprintId || ''}
      onChange={(e) => onSelect(e.target.value)}
      options={[
        { value: '', label: '-- Select a Blueprint --' },
        ...options,
      ]}
    />
  );
};

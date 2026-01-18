import React from 'react';
import { StatusFilter as StatusFilterType } from '../../types';
import { Checkbox } from '../common/Checkbox';

interface StatusFilterProps {
  filters: StatusFilterType;
  onChange: (filters: StatusFilterType) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({
  filters,
  onChange,
}) => {
  const handleChange = (key: keyof StatusFilterType, value: boolean) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex gap-4 items-center">
      <span className="text-sm font-medium text-gray-700">Filter by:</span>
      <Checkbox
        label="Active"
        checked={filters.active}
        onChange={(e) => handleChange('active', e.target.checked)}
      />
      <Checkbox
        label="Pending"
        checked={filters.pending}
        onChange={(e) => handleChange('pending', e.target.checked)}
      />
      <Checkbox
        label="Signed"
        checked={filters.signed}
        onChange={(e) => handleChange('signed', e.target.checked)}
      />
    </div>
  );
};

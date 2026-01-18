import React from 'react';
import { BlueprintField } from '../../types';

interface FieldPositionerProps {
  fields: BlueprintField[];
  onFieldClick: (fieldId: string) => void;
  selectedFieldId?: string;
}

export const FieldPositioner: React.FC<FieldPositionerProps> = ({
  fields,
  onFieldClick,
  selectedFieldId,
}) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white relative min-h-[400px]">
      <div className="text-sm text-gray-500 mb-2">
        Click on a field to edit it
      </div>
      {fields.map((field) => (
        <div
          key={field.id}
          onClick={() => onFieldClick(field.id)}
          className={`absolute border-2 rounded p-2 cursor-pointer min-w-[120px] ${
            selectedFieldId === field.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          style={{
            left: `${field.position.x}px`,
            top: `${field.position.y}px`,
          }}
        >
          <div className="text-xs text-gray-500 mb-1">{field.type}</div>
          <div className="font-medium text-sm">{field.label}</div>
        </div>
      ))}
      {fields.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          No fields added yet. Add a field to get started.
        </div>
      )}
    </div>
  );
};

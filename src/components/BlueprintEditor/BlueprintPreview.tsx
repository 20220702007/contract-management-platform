import React from 'react';
import { BlueprintField } from '../../types';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import { SignatureCanvas } from '../common/SignatureCanvas';
import { Checkbox } from '../common/Checkbox';

interface BlueprintPreviewProps {
  fields: BlueprintField[];
}

export const BlueprintPreview: React.FC<BlueprintPreviewProps> = ({ fields }) => {
  const renderField = (field: BlueprintField) => {
    const commonProps = {
      key: field.id,
      label: field.label,
      disabled: true,
    };

    switch (field.type) {
      case 'text':
        return <Input {...commonProps} value="" placeholder="Preview" />;
      case 'date':
        return <DatePicker {...commonProps} value="" />;
      case 'signature':
        return <SignatureCanvas {...commonProps} value="" />;
      case 'checkbox':
        return <Checkbox {...commonProps} checked={false} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg p-4 bg-white min-h-[400px]">
      <div className="text-sm text-gray-500 mb-4">Preview</div>
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            Add fields to see preview
          </div>
        ) : (
          fields.map(renderField)
        )}
      </div>
    </div>
  );
};

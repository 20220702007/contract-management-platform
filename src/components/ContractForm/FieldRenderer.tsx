import React from 'react';
import { BlueprintField, ContractFieldValue } from '../../types';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import { SignatureCanvas } from '../common/SignatureCanvas';
import { Checkbox } from '../common/Checkbox';

interface FieldRendererProps {
  field: BlueprintField;
  value: ContractFieldValue | undefined;
  onChange: (fieldId: string, value: string | boolean | null) => void;
  disabled?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  disabled = false,
}) => {
  const handleChange = (
    newValue: string | boolean | null
  ) => {
    onChange(field.id, newValue);
  };

  switch (field.type) {
    case 'text':
      return (
        <Input
          label={field.label}
          value={(value?.value as string) || ''}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
        />
      );

    case 'date':
      return (
        <DatePicker
          label={field.label}
          value={(value?.value as string) || ''}
          onChange={(e) => handleChange(e.target.value)}
          disabled={disabled}
        />
      );

    case 'signature':
      return (
        <SignatureCanvas
          label={field.label}
          value={(value?.value as string) || undefined}
          onChange={(val) => handleChange(val)}
          disabled={disabled}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          label={field.label}
          checked={(value?.value as boolean) || false}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={disabled}
        />
      );

    default:
      return null;
  }
};

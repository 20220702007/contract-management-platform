import React, { useState } from 'react';
import { FieldType, FieldPosition } from '../../types';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

interface FieldConfigFormProps {
  onSave: (field: {
    type: FieldType;
    label: string;
    position: FieldPosition;
  }) => void;
  onCancel: () => void;
  initialField?: {
    type: FieldType;
    label: string;
    position: FieldPosition;
  };
}

export const FieldConfigForm: React.FC<FieldConfigFormProps> = ({
  onSave,
  onCancel,
  initialField,
}) => {
  const [type, setType] = useState<FieldType>(initialField?.type || 'text');
  const [label, setLabel] = useState(initialField?.label || '');
  const [x, setX] = useState(initialField?.position.x.toString() || '0');
  const [y, setY] = useState(initialField?.position.y.toString() || '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    onSave({
      type,
      label: label.trim(),
      position: {
        x: parseInt(x) || 0,
        y: parseInt(y) || 0,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Field Type"
        value={type}
        onChange={(e) => setType(e.target.value as FieldType)}
        options={[
          { value: 'text', label: 'Text' },
          { value: 'date', label: 'Date' },
          { value: 'signature', label: 'Signature' },
          { value: 'checkbox', label: 'Checkbox' },
        ]}
      />

      <Input
        label="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="X Position"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <Input
          label="Y Position"
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialField ? 'Update' : 'Add'} Field
        </Button>
      </div>
    </form>
  );
};

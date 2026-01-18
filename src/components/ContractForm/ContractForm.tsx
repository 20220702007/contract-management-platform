import React, { useState, useEffect } from 'react';
import { Blueprint, ContractFieldValue } from '../../types';
import { BlueprintSelector } from './BlueprintSelector';
import { FieldRenderer } from './FieldRenderer';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import { Button } from '../common/Button';
import { validateContractName } from '../../utils/validation';

interface ContractFormProps {
  blueprints: Blueprint[];
  onSave: (contract: {
    name: string;
    blueprintId: string;
    startingDate?: string;
    party?: string;
    fieldValues: ContractFieldValue[];
  }) => void;
  onCancel: () => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  blueprints,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [party, setParty] = useState('');
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>('');
  const [fieldValues, setFieldValues] = useState<ContractFieldValue[]>([]);
  const [nameError, setNameError] = useState<string | null>(null);

  const selectedBlueprint = blueprints.find((bp) => bp.id === selectedBlueprintId);

  useEffect(() => {
    if (selectedBlueprint) {
      // Initialize field values from blueprint fields
      const initialValues: ContractFieldValue[] = selectedBlueprint.fields.map(
        (field) => ({
          fieldId: field.id,
          value: field.type === 'checkbox' ? false : null,
        })
      );
      setFieldValues(initialValues);
    } else {
      setFieldValues([]);
    }
  }, [selectedBlueprint]);

  const handleFieldChange = (fieldId: string, value: string | boolean | null) => {
    setFieldValues((prev) => {
      const existing = prev.find((fv) => fv.fieldId === fieldId);
      if (existing) {
        return prev.map((fv) =>
          fv.fieldId === fieldId ? { ...fv, value } : fv
        );
      }
      return [...prev, { fieldId, value }];
    });
  };

  const handleSave = () => {
    const error = validateContractName(name);
    if (error) {
      setNameError(error);
      return;
    }

    if (!selectedBlueprintId) {
      return;
    }

    onSave({
      name: name.trim(),
      blueprintId: selectedBlueprintId,
      startingDate: startingDate.trim() || undefined,
      party: party.trim() || undefined,
      fieldValues,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Contract Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(null);
        }}
        error={nameError || undefined}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          placeholder="Enter party name (e.g., Company Name, Person Name)"
        />
        <DatePicker
          label="Starting Date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
        />
      </div>

      <BlueprintSelector
        blueprints={blueprints}
        selectedBlueprintId={selectedBlueprintId}
        onSelect={setSelectedBlueprintId}
      />

      {selectedBlueprint && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Fill Contract Fields</h3>
          {selectedBlueprint.fields.map((field) => {
            const fieldValue = fieldValues.find((fv) => fv.fieldId === field.id);
            return (
              <FieldRenderer
                key={field.id}
                field={field}
                value={fieldValue}
                onChange={handleFieldChange}
              />
            );
          })}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!name.trim() || !selectedBlueprintId}
        >
          Create Contract
        </Button>
      </div>
    </div>
  );
};

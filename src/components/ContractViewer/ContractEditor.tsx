import React, { useState, useEffect } from 'react';
import { Contract, ContractFieldValue, BlueprintField } from '../../types';
import { FieldRenderer } from '../ContractForm/FieldRenderer';
import { Input } from '../common/Input';
import { DatePicker } from '../common/DatePicker';
import { Button } from '../common/Button';
import { validateContractName } from '../../utils/validation';

interface ContractEditorProps {
  contract: Contract;
  blueprintFields: BlueprintField[];
  onSave: (updates: {
    name?: string;
    startingDate?: string;
    party?: string;
    fieldValues: ContractFieldValue[];
  }) => void;
  onCancel: () => void;
  disabled?: boolean;
}

export const ContractEditor: React.FC<ContractEditorProps> = ({
  contract,
  blueprintFields,
  onSave,
  onCancel,
  disabled = false,
}) => {
  const [name, setName] = useState(contract.name);
  const [startingDate, setStartingDate] = useState(contract.startingDate || '');
  const [party, setParty] = useState(contract.party || '');
  const [fieldValues, setFieldValues] = useState<ContractFieldValue[]>(
    contract.fieldValues
  );
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    setName(contract.name);
    setStartingDate(contract.startingDate || '');
    setParty(contract.party || '');
    setFieldValues(contract.fieldValues);
  }, [contract]);

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
    if (disabled) return;

    const error = validateContractName(name);
    if (error) {
      setNameError(error);
      return;
    }

    onSave({
      name: name.trim(),
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
        disabled={disabled}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          disabled={disabled}
          placeholder="Enter party name (e.g., Company Name, Person Name)"
        />
        <DatePicker
          label="Starting Date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contract Fields</h3>
        {blueprintFields.map((field) => {
          const fieldValue = fieldValues.find((fv) => fv.fieldId === field.id);
          return (
            <FieldRenderer
              key={field.id}
              field={field}
              value={fieldValue}
              onChange={handleFieldChange}
              disabled={disabled}
            />
          );
        })}
      </div>

      {!disabled && (
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

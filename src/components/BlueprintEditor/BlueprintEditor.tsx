import React, { useState, useEffect } from 'react';
import { Blueprint, BlueprintField, FieldType, FieldLibraryItem } from '../../types';
import { FieldConfigForm } from './FieldConfigForm';
import { FieldLibrarySelector } from './FieldLibrarySelector';
import { FieldPositioner } from './FieldPositioner';
import { BlueprintPreview } from './BlueprintPreview';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { validateBlueprintName } from '../../utils/validation';
import { useFieldLibraryStore } from '../../store/fieldLibraryStore';

interface BlueprintEditorProps {
  blueprint?: Blueprint;
  onSave: (blueprint: Omit<Blueprint, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const BlueprintEditor: React.FC<BlueprintEditorProps> = ({
  blueprint,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(blueprint?.name || '');
  const [category, setCategory] = useState(blueprint?.category || '');
  const [fields, setFields] = useState<BlueprintField[]>(blueprint?.fields || []);
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [showFieldForm, setShowFieldForm] = useState(false);
  const [showLibrarySelector, setShowLibrarySelector] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const loadFieldLibrary = useFieldLibraryStore((state) => state.loadFieldLibrary);

  useEffect(() => {
    loadFieldLibrary();
  }, [loadFieldLibrary]);

  useEffect(() => {
    if (blueprint) {
      setName(blueprint.name);
      setCategory(blueprint.category || '');
      setFields(blueprint.fields);
    }
  }, [blueprint]);

  const handleAddField = () => {
    setEditingFieldId(null);
    setShowFieldForm(true);
  };

  const handleAddFieldFromLibrary = (libraryField: FieldLibraryItem, position: { x: number; y: number }) => {
    const newField: BlueprintField = {
      id: `field-${Date.now()}`,
      type: libraryField.type,
      label: libraryField.label,
      position,
      isSpecial: libraryField.isSpecial,
      fieldLibraryId: libraryField.id,
    };
    setFields([...fields, newField]);
    setShowLibrarySelector(false);
  };

  const handleEditField = (fieldId: string) => {
    setEditingFieldId(fieldId);
    setShowFieldForm(true);
  };

  const handleSaveField = (fieldData: {
    type: FieldType;
    label: string;
    position: { x: number; y: number };
  }) => {
    if (editingFieldId) {
      setFields(
        fields.map((f) =>
          f.id === editingFieldId
            ? { ...f, ...fieldData }
            : f
        )
      );
    } else {
      const newField: BlueprintField = {
        id: `field-${Date.now()}`,
        ...fieldData,
      };
      setFields([...fields, newField]);
    }
    setShowFieldForm(false);
    setEditingFieldId(null);
  };

  const handleDeleteField = (fieldId: string) => {
    setFields(fields.filter((f) => f.id !== fieldId));
  };

  const handleSave = () => {
    const error = validateBlueprintName(name);
    if (error) {
      setNameError(error);
      return;
    }

    onSave({
      name: name.trim(),
      category: category.trim() || undefined,
      fields,
    });
  };

  const editingField = editingFieldId
    ? fields.find((f) => f.id === editingFieldId)
    : undefined;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Blueprint Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(null);
          }}
          error={nameError || undefined}
          required
        />
        <Input
          label="Category (Optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Employment, Service, Legal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Field Positioning</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowLibrarySelector(!showLibrarySelector)}
                size="sm"
                variant="outline"
              >
                {showLibrarySelector ? 'Hide Library' : 'Add from Library'}
              </Button>
              <Button onClick={handleAddField} size="sm">
                Add New Field
              </Button>
            </div>
          </div>
          {showLibrarySelector && (
            <div className="mb-4">
              <FieldLibrarySelector onSelectField={handleAddFieldFromLibrary} />
            </div>
          )}
          <FieldPositioner
            fields={fields}
            onFieldClick={handleEditField}
            selectedFieldId={editingFieldId || undefined}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <BlueprintPreview fields={fields} />
        </div>
      </div>

      {fields.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Fields List</h3>
          <div className="border rounded-lg divide-y">
            {fields.map((field) => (
              <div
                key={field.id}
                className="p-3 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{field.label}</span>
                    {field.isSpecial && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        Special
                      </span>
                    )}
                    {field.fieldLibraryId && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        From Library
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({field.type}) - Position: ({field.position.x}, {field.position.y})
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditField(field.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteField(field.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Blueprint
        </Button>
      </div>

      <Modal
        isOpen={showFieldForm}
        onClose={() => {
          setShowFieldForm(false);
          setEditingFieldId(null);
        }}
        title={editingFieldId ? 'Edit Field' : 'Add Field'}
      >
        <FieldConfigForm
          onSave={handleSaveField}
          onCancel={() => {
            setShowFieldForm(false);
            setEditingFieldId(null);
          }}
          initialField={editingField}
        />
      </Modal>
    </div>
  );
};

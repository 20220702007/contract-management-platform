import React, { useState } from 'react';
import { FieldType, FieldLibraryItem } from '../../types';
import { useFieldLibraryStore } from '../../store/fieldLibraryStore';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Checkbox } from '../common/Checkbox';

export const FieldLibraryManager: React.FC = () => {
  const fields = useFieldLibraryStore((state) => state.fields);
  const addField = useFieldLibraryStore((state) => state.addField);
  const deleteField = useFieldLibraryStore((state) => state.deleteField);
  const [showAddModal, setShowAddModal] = useState(false);
  const [type, setType] = useState<FieldType>('text');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSpecial, setIsSpecial] = useState(false);

  const handleAddField = () => {
    if (!label.trim()) return;

    addField({
      type,
      label: label.trim(),
      description: description.trim() || undefined,
      category: category.trim() || undefined,
      isSpecial,
    });

    setLabel('');
    setDescription('');
    setCategory('');
    setIsSpecial(false);
    setType('text');
    setShowAddModal(false);
  };

  const categories = Array.from(new Set(fields.map((f) => f.category).filter(Boolean)));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Field Library</h3>
        <Button onClick={() => setShowAddModal(true)} size="sm">
          Add to Library
        </Button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Save common fields here to reuse them in multiple blueprints. Special fields are highlighted.
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No fields in library yet. Add fields to reuse them across blueprints.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) => (
            <div
              key={field.id}
              className={`p-4 border rounded-lg ${
                field.isSpecial
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{field.label}</span>
                    {field.isSpecial && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        Special
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                  </span>
                  {field.category && (
                    <span className="text-xs text-blue-600 mt-1 block">
                      Category: {field.category}
                    </span>
                  )}
                  {field.description && (
                    <p className="text-sm text-gray-600 mt-2">{field.description}</p>
                  )}
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Delete "${field.label}" from library?`)) {
                      deleteField(field.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setLabel('');
          setDescription('');
          setCategory('');
          setIsSpecial(false);
        }}
        title="Add Field to Library"
      >
        <div className="space-y-4">
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
            label="Field Label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g., Employee Name, Start Date"
            required
          />

          <Input
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this field"
          />

          <Input
            label="Category (Optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Employee Info, Dates, Signatures"
          />

          <Checkbox
            label="Mark as Special/Unique Field"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
          />

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setLabel('');
                setDescription('');
                setCategory('');
                setIsSpecial(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddField}>
              Add to Library
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

import React, { useState } from 'react';
import { FieldLibraryItem } from '../../types';
import { useFieldLibraryStore } from '../../store/fieldLibraryStore';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { Input } from '../common/Input';

interface FieldLibrarySelectorProps {
  onSelectField: (field: FieldLibraryItem, position: { x: number; y: number }) => void;
}

export const FieldLibrarySelector: React.FC<FieldLibrarySelectorProps> = ({ onSelectField }) => {
  const fields = useFieldLibraryStore((state) => state.fields);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [x, setX] = useState('50');
  const [y, setY] = useState('100');

  const categories = Array.from(new Set(fields.map((f) => f.category).filter(Boolean)));

  const filteredFields = fields.filter((field) => {
    const matchesCategory = !selectedCategory || field.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddField = (field: FieldLibraryItem) => {
    onSelectField(field, {
      x: parseInt(x) || 50,
      y: parseInt(y) || 100,
    });
    setY((prev) => (parseInt(prev) + 50).toString());
  };

  if (fields.length === 0) {
    return (
      <div className="text-sm text-gray-500 p-4 text-center border rounded-lg bg-gray-50">
        No fields in library. Add fields to the library first to use them here.
      </div>
    );
  }

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
      <h4 className="font-semibold text-sm">Add Field from Library</h4>

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="X Position"
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          className="text-sm"
        />
        <Input
          label="Y Position"
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="text-sm"
        />
      </div>

      <Input
        label="Search Fields"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name or description"
        className="text-sm"
      />

      {categories.length > 0 && (
        <Select
          label="Filter by Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: '', label: 'All Categories' },
            ...categories.map((cat) => ({ value: cat, label: cat })),
          ]}
        />
      )}

      <div className="max-h-60 overflow-y-auto space-y-2">
        {filteredFields.length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">
            No fields found matching your search.
          </div>
        ) : (
          filteredFields.map((field) => (
            <div
              key={field.id}
              className={`p-2 border rounded ${
                field.isSpecial
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{field.label}</span>
                    {field.isSpecial && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded">
                        Special
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {field.type} {field.category && `• ${field.category}`}
                  </span>
                  {field.description && (
                    <p className="text-xs text-gray-600 mt-1">{field.description}</p>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleAddField(field)}
                  className="ml-2"
                >
                  Add
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

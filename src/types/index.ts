export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export interface FieldPosition {
  x: number;
  y: number;
}

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: FieldPosition;
  isSpecial?: boolean; // Mark field as special/unique
  fieldLibraryId?: string; // Link to field library if from library
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  category?: string; // Category to make blueprints unique
  tags?: string[]; // Tags for better organization
  createdAt: string;
  updatedAt: string;
}

export type ContractStatus = 
  | 'created' 
  | 'approved' 
  | 'sent' 
  | 'signed' 
  | 'locked' 
  | 'revoked';

export interface ContractFieldValue {
  fieldId: string;
  value: string | boolean | null;
}

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  status: ContractStatus;
  startingDate?: string;
  party?: string;
  fieldValues: ContractFieldValue[];
  createdAt: string;
  updatedAt: string;
}

export interface StatusFilter {
  active: boolean;
  pending: boolean;
  signed: boolean;
}

// Field Library - Reusable fields that can be used in multiple blueprints
export interface FieldLibraryItem {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  isSpecial: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

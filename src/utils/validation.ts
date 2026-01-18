export function validateRequired(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim() !== '';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function validateBlueprintName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Blueprint name is required';
  }
  if (name.trim().length < 3) {
    return 'Blueprint name must be at least 3 characters';
  }
  return null;
}

export function validateContractName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Contract name is required';
  }
  if (name.trim().length < 3) {
    return 'Contract name must be at least 3 characters';
  }
  return null;
}

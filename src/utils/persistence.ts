const BLUEPRINTS_KEY = 'contract_platform_blueprints';
const CONTRACTS_KEY = 'contract_platform_contracts';
const USERS_KEY = 'contract_platform_users';
const CURRENT_USER_KEY = 'contract_platform_current_user';
const FIELD_LIBRARY_KEY = 'contract_platform_field_library';

export function saveBlueprints(blueprints: any[]): void {
  try {
    localStorage.setItem(BLUEPRINTS_KEY, JSON.stringify(blueprints));
  } catch (error) {
    console.error('Failed to save blueprints:', error);
  }
}

export function loadBlueprints(): any[] {
  try {
    const data = localStorage.getItem(BLUEPRINTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load blueprints:', error);
    return [];
  }
}

export function saveContracts(contracts: any[]): void {
  try {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
  } catch (error) {
    console.error('Failed to save contracts:', error);
  }
}

export function loadContracts(): any[] {
  try {
    const data = localStorage.getItem(CONTRACTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load contracts:', error);
    return [];
  }
}

export function saveUsers(users: any[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
}

export function loadUsers(): any[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load users:', error);
    return [];
  }
}

export function saveCurrentUser(user: any): void {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save current user:', error);
  }
}

export function loadCurrentUser(): any | null {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load current user:', error);
    return null;
  }
}

export function clearCurrentUser(): void {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Failed to clear current user:', error);
  }
}

export function saveFieldLibrary(fields: any[]): void {
  try {
    localStorage.setItem(FIELD_LIBRARY_KEY, JSON.stringify(fields));
  } catch (error) {
    console.error('Failed to save field library:', error);
  }
}

export function loadFieldLibrary(): any[] {
  try {
    const data = localStorage.getItem(FIELD_LIBRARY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load field library:', error);
    return [];
  }
}

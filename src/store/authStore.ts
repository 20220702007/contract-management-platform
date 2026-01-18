import { create } from 'zustand';
import { loadUsers, saveUsers, loadCurrentUser, saveCurrentUser, clearCurrentUser } from '../utils/persistence';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  signup: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  loadAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,

  loadAuth: () => {
    const user = loadCurrentUser();
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
    }
  },

  login: (username: string, password: string) => {
    const users = loadUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      saveCurrentUser(user);
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }

    return false;
  },

  signup: (username: string, email: string, password: string) => {
    const users = loadUsers();

    if (users.some((u) => u.username === username)) {
      return false;
    }

    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    saveCurrentUser(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    clearCurrentUser();
    set({ currentUser: null, isAuthenticated: false });
  },
}));

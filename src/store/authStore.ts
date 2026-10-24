import { create } from 'zustand';

export interface UserProfile {
  name: string;
  email: string;
  citizenId: string;
  isGuest: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, isGuest?: boolean) => void;
  logout: () => void;
}

const STORAGE_KEY_USER = 'smart_city_vellore_user';

const getInitialUser = (): UserProfile | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error('Failed to parse user profile', err);
  }
  return null;
};

export const useAuthStore = create<AuthState>((set) => {
  const initialUser = getInitialUser();
  return {
    user: initialUser,
    isAuthenticated: !!initialUser,
    login: (name: string, email: string, isGuest = false) => {
      const newUser: UserProfile = {
        name: name.trim() || 'Demo Citizen',
        email: email.trim() || 'citizen@vellore.gov.in',
        citizenId: `VLR-${Math.floor(1000 + Math.random() * 9000)}`,
        isGuest,
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      set({ user: newUser, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem(STORAGE_KEY_USER);
      set({ user: null, isAuthenticated: false });
    },
  };
});

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { api, handleApiError } from '@/lib/api-wrapper';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  authProvider: 'EMAIL' | 'GOOGLE';
  profile?: {
    fullName: string;
    department: string;
    classYear: number;
    city: string;
    industry: string;
    employmentLevel: string;
    jobTitle: string;
    companyName: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setAuth: (user: User, token: string) => void;
}

// Cookie storage for Zustand persist
const cookieStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.auth.login(email, password);

          if (response.success) {
            const { user, token } = response.data;
            get().setAuth(user, token);
            set({ isLoading: false });
          } else {
            throw new Error(response.message || 'Login gagal');
          }
        } catch (error) {
          set({
            error: handleApiError(error),
            isLoading: false
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => set({ error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setAuth: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          error: null
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => cookieStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
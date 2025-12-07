'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * AuthProvider component that initializes authentication state
 * on app startup by checking for existing tokens
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  // Show loading state while initializing auth
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          {/* Loading spinner */}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { setLoading, setUser, clearAuth } = useAuthStore();

    useEffect(() => {
        // Validate session on load
        const validateSession = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];

            if (token) {
                setLoading(true);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user, token);
                    } else {
                        // Token invalid, clear everything
                        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                        clearAuth();
                    }
                } catch (error) {
                    console.error('Session validation failed', error);
                    // Clear auth on error
                    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                    clearAuth();
                } finally {
                    setLoading(false);
                }
            }
        };

        validateSession();
    }, [setLoading, setUser, clearAuth]);

    return <>{children}</>;
}

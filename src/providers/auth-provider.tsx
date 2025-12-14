"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { Loading } from "@/components/ui/loading";

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
                console.error("Failed to initialize auth:", error);
            } finally {
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, [checkAuth]);

    // Show loading state while initializing auth
    if (!isInitialized) {
        return <Loading size="lg" overlay={true} />;
    }

    return <>{children}</>;
}

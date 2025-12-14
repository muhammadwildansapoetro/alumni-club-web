/**
 * Simplified API client for backend integration
 * Removes custom encryption for standard backend compatibility
 */
import { useAuthStore } from "@/stores/auth.store";

/**
 * Enhanced API client without custom encryption
 */
export async function apiClient(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    // Get token from auth store
    const authStore = useAuthStore.getState();
    const token = authStore.getToken?.() || authStore.token;

    // Prepare standard headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    // Add authorization header if token exists
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    // Make the API call
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers,
    });

    return response;
}

/**
 * API client utility functions
 */
export const apiUtils = {
    /**
     * Check if API is configured
     */
    isApiConfigured: (): boolean => {
        return !!process.env.NEXT_PUBLIC_API_URL;
    },

    /**
     * Get base API URL
     */
    getApiUrl: (): string => {
        return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    },
};

/**
 * Legacy export for backward compatibility
 */
export default apiClient;
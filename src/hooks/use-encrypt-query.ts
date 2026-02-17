import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { encryptForUrl, decryptFromUrl, isEncryptionConfigured, validateUrlEncryptedData } from "@/lib/encryption";
import { useSearchParamsSafe } from "@/components/search-params-provider";

interface EncryptedQueryParams {
    [key: string]: string | undefined;
}

interface UseEncryptQueryReturn {
    // Encrypted query parameters
    encryptedQuery: EncryptedQueryParams;

    // Functions to work with encrypted parameters
    encryptParam: (key: string, value: string) => string;
    decryptParam: (encryptedValue: string) => string;

    // Navigation with encryption
    pushWithEncryption: (href: string, params?: Record<string, string>) => Promise<void>;
    replaceWithEncryption: (href: string, params?: Record<string, string>) => Promise<void>;

    // Helper to encrypt all params
    encryptAllParams: (params: Record<string, string>) => EncryptedQueryParams;

    // Configuration status
    isEncryptionReady: boolean;
}

/**
 * Hook for handling encrypted query parameters
 * Provides utilities to encrypt, decrypt, and navigate with encrypted query parameters
 */
export function useEncryptQuery(): UseEncryptQueryReturn {
    const router = useRouter();
    const searchParams = useSearchParamsSafe();

    const isEncryptionReady = isEncryptionConfigured();

    // Memoize decrypted query parameters
    const decryptedQuery = useMemo(() => {
        if (!isEncryptionReady) {
            // Fallback to regular query params if encryption is not configured
            const params: EncryptedQueryParams = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            return params;
        }

        const params: EncryptedQueryParams = {};

        searchParams.forEach((value, key) => {
            try {
                // Validate and try to decrypt the value
                if (validateUrlEncryptedData(value)) {
                    params[key] = decryptFromUrl(value);
                } else {
                    // If not valid encrypted format, treat as regular parameter
                    params[key] = value;
                }
            } catch (error) {
                console.error(`Failed to decrypt query param ${key}:`, error);
                // If decryption fails, assume it's not encrypted
                params[key] = value;
            }
        });

        return params;
    }, [searchParams, isEncryptionReady]);

    // Encrypt a single parameter value
    const encryptParam = useCallback(
        (_key: string, value: string): string => {
            if (!isEncryptionReady || !value) {
                return value;
            }

            try {
                // Add a small prefix to identify encrypted values
                const prefixedValue = `enc:${value}`;
                return encryptForUrl(prefixedValue);
            } catch (error) {
                console.error("Failed to encrypt parameter:", error);
                return value; // Fallback to unencrypted
            }
        },
        [isEncryptionReady],
    );

    // Decrypt a single parameter value
    const decryptParam = useCallback(
        (encryptedValue: string): string => {
            if (!isEncryptionReady || !encryptedValue) {
                return encryptedValue;
            }

            try {
                const decrypted = decryptFromUrl(encryptedValue);

                // Check if this is an encrypted value (has prefix)
                if (decrypted.startsWith("enc:")) {
                    return decrypted.slice(4); // Remove prefix
                }

                return decrypted;
            } catch (error) {
                console.error("Failed to decrypt parameter:", error);
                return encryptedValue; // Fallback to original value
            }
        },
        [isEncryptionReady],
    );

    // Encrypt multiple parameters
    const encryptAllParams = useCallback(
        (params: Record<string, string>): EncryptedQueryParams => {
            const encrypted: EncryptedQueryParams = {};

            Object.entries(params).forEach(([key, value]) => {
                encrypted[key] = encryptParam(key, value);
            });

            return encrypted;
        },
        [encryptParam],
    );

    // Navigate with encrypted query parameters
    const pushWithEncryption = useCallback(
        async (href: string, params?: Record<string, string>) => {
            if (!params || Object.keys(params).length === 0) {
                await router.push(href);
                return;
            }

            try {
                const url = new URL(href, window.location.origin);

                // Encrypt parameters
                Object.entries(params).forEach(([key, value]) => {
                    url.searchParams.set(key, encryptParam(key, value));
                });

                await router.push(url.toString());
            } catch (error) {
                console.error("Failed to navigate with encryption:", error);
                await router.push(href); // Fallback to unencrypted navigation
            }
        },
        [router, encryptParam],
    );

    // Replace current URL with encrypted query parameters
    const replaceWithEncryption = useCallback(
        async (href: string, params?: Record<string, string>) => {
            if (!params || Object.keys(params).length === 0) {
                await router.replace(href);
                return;
            }

            try {
                const url = new URL(href, window.location.origin);

                // Encrypt parameters
                Object.entries(params).forEach(([key, value]) => {
                    url.searchParams.set(key, encryptParam(key, value));
                });

                await router.replace(url.toString());
            } catch (error) {
                console.error("Failed to replace with encryption:", error);
                await router.replace(href); // Fallback to unencrypted navigation
            }
        },
        [router, encryptParam],
    );

    return {
        encryptedQuery: decryptedQuery,
        encryptParam,
        decryptParam,
        pushWithEncryption,
        replaceWithEncryption,
        encryptAllParams,
        isEncryptionReady,
    };
}

/**
 * Higher-order hook for specific sensitive parameters
 * @param sensitiveKeys - Array of parameter keys that should be encrypted
 * @returns Enhanced hook with sensitive parameter handling
 */
export function useSecureQuery(sensitiveKeys: string[] = []): UseEncryptQueryReturn {
    const baseHook = useEncryptQuery();

    // Enhanced encryptParam that automatically encrypts sensitive keys
    const enhancedEncryptParam = useCallback(
        (key: string, value: string): string => {
            const shouldEncrypt = sensitiveKeys.includes(key);

            if (shouldEncrypt) {
                return baseHook.encryptParam(key, value);
            }

            return value;
        },
        [baseHook, sensitiveKeys],
    );

    // Enhanced decryptParam for sensitive keys
    const enhancedDecryptParam = useCallback(
        (encryptedValue: string): string => {
            // Try decryption first, if it fails return original
            try {
                return baseHook.decryptParam(encryptedValue);
            } catch {
                return encryptedValue;
            }
        },
        [baseHook],
    );

    return {
        ...baseHook,
        encryptParam: enhancedEncryptParam,
        decryptParam: enhancedDecryptParam,
    };
}

/**
 * Hook for handling encrypted user IDs in URLs
 * Specifically designed for securing user identifiers in navigation
 */
export function useEncryptedUserId() {
    const { encryptParam, decryptParam, pushWithEncryption, replaceWithEncryption, encryptedQuery } = useSecureQuery(["userId", "user_id", "id"]);

    const getEncryptedUserId = useCallback(
        (userId: string): string => {
            return encryptParam("userId", userId);
        },
        [encryptParam],
    );

    const getDecryptedUserId = useCallback(
        (encryptedUserId: string): string => {
            return decryptParam(encryptedUserId);
        },
        [decryptParam],
    );

    const navigateWithUserId = useCallback(
        async (href: string, userId: string) => {
            await pushWithEncryption(href, { userId });
        },
        [pushWithEncryption],
    );

    const replaceWithUserId = useCallback(
        async (href: string, userId: string) => {
            await replaceWithEncryption(href, { userId });
        },
        [replaceWithEncryption],
    );

    // Get current user ID from query params
    const currentUserId = useMemo(() => {
        const possibleKeys = ["userId", "user_id", "id"];

        for (const key of possibleKeys) {
            const value = encryptedQuery[key];
            if (value) {
                return value;
            }
        }

        return undefined;
    }, [encryptedQuery]);

    return {
        getEncryptedUserId,
        getDecryptedUserId,
        navigateWithUserId,
        replaceWithUserId,
        currentUserId,
    };
}

export default useEncryptQuery;

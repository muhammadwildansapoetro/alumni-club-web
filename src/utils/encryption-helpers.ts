import { encrypt, decrypt } from "@/lib/encryption";

/**
 * Helper utilities for encryption operations
 */

// Cache for memoizing encryption operations
const encryptionCache = new Map<string, string>();
const CACHE_SIZE_LIMIT = 100; // Limit cache size to prevent memory leaks

/**
 * Interface for user profile data that can be encrypted
 */
interface UserProfileData {
    [key: string]: unknown;
}

/**
 * Interface for encrypted user profile data
 */
interface EncryptedUserProfileData extends UserProfileData {
    [key: string]: unknown;
}

/**
 * Cached encryption function to avoid re-encrypting the same values
 */
function getCachedEncryption(value: string): string {
    const cacheKey = value;

    if (encryptionCache.has(cacheKey)) {
        return encryptionCache.get(cacheKey)!;
    }

    const encrypted = encrypt(value, true).encrypted;

    // Implement LRU-like cache size management
    if (encryptionCache.size >= CACHE_SIZE_LIMIT) {
        const firstKey = encryptionCache.keys().next().value;
        if (firstKey) {
            encryptionCache.delete(firstKey);
        }
    }

    encryptionCache.set(cacheKey, encrypted);
    return encrypted;
}

/**
 * Validate that encryption is working properly
 */
export function validateEncryption(): boolean {
    try {
        const testData = "Hello, World!";
        const encrypted = encrypt(testData);
        const decrypted = decrypt(encrypted);

        return testData === decrypted;
    } catch (error) {
        console.error("Encryption validation failed:", error);
        return false;
    }
}

/**
 * Encrypt user profile data
 */
export function encryptUserProfile(profileData: UserProfileData): UserProfileData {
    const sensitiveFields = ["email", "phoneNumber", "address", "location", "income"];
    const encrypted = { ...profileData };

    sensitiveFields.forEach((field) => {
        if (encrypted[field] && typeof encrypted[field] === "string") {
            try {
                encrypted[field] = encrypt(encrypted[field], true);
                encrypted[`${field}_encrypted`] = true;
            } catch (error) {
                console.error(`Failed to encrypt ${field}:`, error);
            }
        }
    });

    return encrypted;
}

/**
 * Decrypt user profile data
 */
export function decryptUserProfile(encryptedProfileData: EncryptedUserProfileData): UserProfileData {
    const decrypted = { ...encryptedProfileData };

    Object.keys(decrypted).forEach((key) => {
        if (key.endsWith("_encrypted") && decrypted[key]) {
            const fieldName = key.slice(0, -10); // Remove '_encrypted' suffix
            const encryptedValue = decrypted[fieldName];

            if (typeof encryptedValue === "string") {
                try {
                    decrypted[fieldName] = decrypt(
                        {
                            encrypted: encryptedValue,
                            iv: "",
                            tag: "",
                            salt: "",
                        },
                        true,
                    );
                    delete decrypted[key]; // Remove encryption marker
                } catch (error) {
                    console.error(`Failed to decrypt ${fieldName}:`, error);
                }
            }
        }
    });

    return decrypted;
}

/**
 * Encrypt OAuth token for storage
 */
export function encryptOAuthToken(token: string): string {
    try {
        const result = encrypt(token, true);
        return JSON.stringify(result);
    } catch (error) {
        console.error("Failed to encrypt OAuth token:", error);
        return token; // Fallback to unencrypted
    }
}

/**
 * Decrypt OAuth token from storage
 */
export function decryptOAuthToken(encryptedToken: string): string {
    try {
        if (typeof encryptedToken !== "string" || !encryptedToken.startsWith("{")) {
            return encryptedToken; // Assume it's not encrypted
        }

        const parsed = JSON.parse(encryptedToken);
        return decrypt(parsed, true);
    } catch (error) {
        console.error("Failed to decrypt OAuth token:", error);
        return encryptedToken; // Fallback to original value
    }
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (!data || data.length <= visibleChars) {
        return data;
    }

    return data.slice(0, visibleChars) + "*".repeat(data.length - visibleChars);
}

/**
 * Create encrypted query parameters
 */
export function createEncryptedQuery(params: Record<string, unknown>): Record<string, string> {
    const encrypted: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            try {
                const strValue = typeof value === "object" ? JSON.stringify(value) : String(value);
                encrypted[key] = getCachedEncryption(strValue);
            } catch (error) {
                console.error(`Failed to encrypt query param ${key}:`, error);
                encrypted[key] = String(value); // Fallback
            }
        }
    });

    return encrypted;
}

/**
 * Parse encrypted query parameters
 */
export function parseEncryptedQuery(params: Record<string, string>): Record<string, unknown> {
    const decrypted: Record<string, unknown> = {};

    Object.entries(params).forEach(([key, value]) => {
        try {
            const decryptedValue = decrypt({ encrypted: value, iv: "", tag: "", salt: "" }, true);

            // Try to parse as JSON, if fails return as string
            try {
                decrypted[key] = JSON.parse(decryptedValue);
            } catch {
                decrypted[key] = decryptedValue;
            }
        } catch (error) {
            console.error(`Failed to decrypt query param ${key}:`, error);
            decrypted[key] = value; // Fallback to original value
        }
    });

    return decrypted;
}

// Export type definitions for external use
export type { UserProfileData, EncryptedUserProfileData };

const encryptionHelpers = {
    validateEncryption,
    encryptUserProfile,
    decryptUserProfile,
    encryptOAuthToken,
    decryptOAuthToken,
    maskSensitiveData,
    createEncryptedQuery,
    parseEncryptedQuery,
};

export default encryptionHelpers;

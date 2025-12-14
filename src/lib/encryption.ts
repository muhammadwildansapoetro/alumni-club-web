import crypto from "crypto";

/**
 * Configuration for encryption
 */
const ENCRYPTION_CONFIG = {
    // Number of PBKDF2 iterations for key derivation
    saltRounds: parseInt(process.env.ENCRYPTION_SALT_ROUNDS || "100000"),
    // Length of the initialization vector
    ivLength: 12, // 96 bits for GCM
    // Length of the authentication tag
    tagLength: 16, // 128 bits for GCM
    // Algorithm used for encryption
    algorithm: "aes-256-gcm",
    // Algorithm used for key derivation
    keyDerivationAlgorithm: "pbkdf2",
    // Digest algorithm for PBKDF2
    digestAlgorithm: "sha256",
    // Length of derived key
    keyLength: 32, // 256 bits for AES-256
} as const;

/**
 * Encryption result interface
 */
export interface EncryptionResult {
    encrypted: string; // Base64 encoded encrypted data + IV + tag
    iv: string; // Base64 encoded initialization vector
    tag: string; // Base64 encoded authentication tag
    salt?: string; // Base64 encoded salt (for key derivation)
}

/**
 * Validates that the encryption key is properly configured
 * @throws Error if encryption key is missing or invalid
 */
function validateEncryptionKey(): void {
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

    if (!encryptionKey) {
        throw new Error("NEXT_PUBLIC_ENCRYPTION_KEY environment variable is not set");
    }

    try {
        const keyBuffer = Buffer.from(encryptionKey, "base64");
        if (keyBuffer.length !== ENCRYPTION_CONFIG.keyLength) {
            throw new Error(`Encryption key must be exactly ${ENCRYPTION_CONFIG.keyLength} bytes (${ENCRYPTION_CONFIG.keyLength * 8} bits)`);
        }
    } catch (error) {
        throw new Error("Invalid encryption key format. Must be a valid Base64 string.", { cause: error });
    }
}

/**
 * Derives a cryptographic key from the base encryption key using PBKDF2
 * @param salt - Salt for key derivation
 * @returns Derived key buffer
 */
function deriveKey(salt: Buffer): Buffer {
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
    const baseKey = Buffer.from(encryptionKey, "base64");

    return crypto.pbkdf2Sync(baseKey, salt, ENCRYPTION_CONFIG.saltRounds, ENCRYPTION_CONFIG.keyLength, ENCRYPTION_CONFIG.digestAlgorithm);
}

/**
 * Encrypts data using AES-256-GCM
 * @param data - Data to encrypt (string or object)
 * @param useKeyDerivation - Whether to use key derivation (recommended for passwords)
 * @returns Encryption result containing encrypted data, IV, and tag
 */
export function encrypt(data: string | object, useKeyDerivation: boolean = true): EncryptionResult {
    try {
        validateEncryptionKey();

        // Convert data to string and then to buffer
        const dataStr = typeof data === "string" ? data : JSON.stringify(data);
        const dataBuffer = Buffer.from(dataStr, "utf8");

        let key: Buffer;
        let salt: Buffer | undefined;

        if (useKeyDerivation) {
            // Generate random salt for key derivation
            salt = crypto.randomBytes(16);
            key = deriveKey(salt);
        } else {
            // Use base key directly (for performance-critical operations)
            key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!, "base64");
        }

        // Generate random IV
        const iv = crypto.randomBytes(ENCRYPTION_CONFIG.ivLength);

        // Create cipher with IV
        const cipher = crypto.createCipheriv(ENCRYPTION_CONFIG.algorithm, key, iv);

        // Encrypt the data
        const encrypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);

        // Get the authentication tag
        const tag = cipher.getAuthTag();

        // Return base64 encoded results
        return {
            encrypted: encrypted.toString("base64"),
            iv: iv.toString("base64"),
            tag: tag.toString("base64"),
            salt: salt?.toString("base64"),
        };
    } catch (error) {
        console.error("Encryption error:", error);
        throw new Error("Failed to encrypt data");
    }
}

/**
 * Decrypts data using AES-256-GCM
 * @param encryptionResult - Encryption result from encrypt function
 * @param useKeyDerivation - Whether key derivation was used during encryption
 * @returns Decrypted data
 */
export function decrypt(encryptionResult: EncryptionResult | string, useKeyDerivation: boolean = true): string {
    try {
        validateEncryptionKey();

        // Validate encrypted data format before proceeding
        if (!validateEncryptedData(encryptionResult)) {
            throw new Error("Invalid encrypted data format");
        }

        let encrypted: Buffer;
        let iv: Buffer;
        let tag: Buffer;
        let salt: Buffer | undefined;

        if (typeof encryptionResult === "string") {
            // If string provided, assume it's the encrypted part only (legacy format)
            encrypted = Buffer.from(encryptionResult, "base64");
            // IV and tag are empty for legacy compatibility - decrypt will handle this
            iv = Buffer.from("", "base64");
            tag = Buffer.from("", "base64");
        } else {
            // Parse encryption result object
            encrypted = Buffer.from(encryptionResult.encrypted, "base64");
            iv = Buffer.from(encryptionResult.iv, "base64");
            tag = Buffer.from(encryptionResult.tag, "base64");

            if (useKeyDerivation && encryptionResult.salt) {
                salt = Buffer.from(encryptionResult.salt, "base64");
            }
        }

        let key: Buffer;

        if (useKeyDerivation) {
            if (!salt) {
                throw new Error("Salt is required for decryption with key derivation");
            }
            key = deriveKey(salt);
        } else {
            key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!, "base64");
        }

        // Create decipher with IV
        const decipher = crypto.createDecipheriv(ENCRYPTION_CONFIG.algorithm, key, iv);

        // Set the authentication tag
        decipher.setAuthTag(tag);

        // Decrypt the data
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

        return decrypted.toString("utf8");
    } catch (error) {
        console.error("Decryption error:", error);
        throw new Error("Failed to decrypt data");
    }
}

/**
 * Encrypts data for URL-safe transmission
 * Combines all components into a single URL-safe string
 * @param data - Data to encrypt
 * @returns URL-safe encrypted string
 */
export function encryptForUrl(data: string | object): string {
    const result = encrypt(data, true);

    // Combine all parts with dots and encode as base64url
    const combined = [result.encrypted, result.iv, result.tag, result.salt].filter(Boolean).join(".");

    // Convert to base64url (URL-safe base64)
    return Buffer.from(combined, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decrypts URL-safe encrypted data
 * @param encryptedData - URL-safe encrypted string
 * @returns Decrypted data
 */
export function decryptFromUrl(encryptedData: string): string {
    try {
        // Validate URL-safe encrypted data format
        if (!validateUrlEncryptedData(encryptedData)) {
            throw new Error("Invalid URL-safe encrypted data format");
        }

        // Convert from base64url to base64
        const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");

        // Add padding if needed
        const paddedBase64 = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

        // Decode and split
        const combined = Buffer.from(paddedBase64, "base64").toString("utf8");
        const parts = combined.split(".");

        if (parts.length < 3) {
            throw new Error("Invalid encrypted data format");
        }

        const encryptionResult: EncryptionResult = {
            encrypted: parts[0],
            iv: parts[1],
            tag: parts[2],
            salt: parts[3],
        };

        return decrypt(encryptionResult, true);
    } catch (error) {
        console.error("URL decryption error:", error);
        throw new Error("Failed to decrypt URL data");
    }
}

/**
 * Generates a cryptographically secure random encryption key
 * @returns Base64 encoded 256-bit encryption key
 */
export function generateEncryptionKey(): string {
    const key = crypto.randomBytes(ENCRYPTION_CONFIG.keyLength);
    return key.toString("base64");
}

/**
 * Hashes sensitive data for logging purposes (one-way)
 * @param data - Data to hash
 * @param salt - Optional salt for hashing
 * @returns Hashed data
 */
export function hashForLogging(data: string, salt?: string): string {
    const hashSalt = salt || process.env.NEXT_PUBLIC_ENCRYPTION_KEY?.slice(0, 16) || "default-salt";
    return crypto.createHmac("sha256", hashSalt).update(data).digest("hex").slice(0, 8); // Only show first 8 characters for logging
}

/**
 * Validates encrypted data format before decryption
 * @param data - Data to validate
 * @returns true if data format is valid
 */
export function validateEncryptedData(data: string | EncryptionResult): boolean {
    if (typeof data === "string") {
        // For string format, check if it's valid base64
        try {
            const decoded = Buffer.from(data, "base64");
            return decoded.length > 0;
        } catch {
            return false;
        }
    } else {
        // For object format, validate all required fields
        const requiredFields = ["encrypted", "iv", "tag"];
        return requiredFields.every(field => {
            const value = data[field as keyof EncryptionResult];
            return typeof value === "string" && value.length > 0;
        });
    }
}

/**
 * Validates URL-safe encrypted data format
 * @param encryptedData - URL-safe encrypted string
 * @returns true if data format is valid
 */
export function validateUrlEncryptedData(encryptedData: string): boolean {
    if (!encryptedData || typeof encryptedData !== "string") {
        return false;
    }

    try {
        // Check if it contains only URL-safe base64 characters
        const urlSafeBase64Regex = /^[A-Za-z0-9_-]*$/;
        if (!urlSafeBase64Regex.test(encryptedData)) {
            return false;
        }

        // Convert from base64url to base64 and validate
        const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");
        const paddedBase64 = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

        const decoded = Buffer.from(paddedBase64, "base64");
        return decoded.length > 0;
    } catch {
        return false;
    }
}

/**
 * Checks if encryption is properly configured
 * @returns true if encryption is ready to use
 */
export function isEncryptionConfigured(): boolean {
    try {
        validateEncryptionKey();
        return true;
    } catch {
        return false;
    }
}

/**
 * Default export with all encryption functions
 */
export const encryption = {
    encrypt,
    decrypt,
    encryptForUrl,
    decryptFromUrl,
    generateEncryptionKey,
    hashForLogging,
    isEncryptionConfigured,
};

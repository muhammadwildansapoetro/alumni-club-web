import { CONFIG } from "@/config";
import crypto from "crypto";

// Input validation helper
function validateEncryptionInput(data: Record<string, any>): boolean {
    if (!data || typeof data !== 'object') return false;
    try {
        JSON.stringify(data);
        return true;
    } catch {
        return false;
    }
}

function validateHexInput(hex: string): boolean {
    if (!hex || typeof hex !== 'string') return false;
    // Check if valid hex string and minimum length
    return /^[0-9a-fA-F]+$/.test(hex) && hex.length >= 32;
}

export function EncryptQuery(data: Record<string, any>): string {
    try {
        // Input validation
        if (!validateEncryptionInput(data)) {
            throw new Error('Invalid encryption input data');
        }

        const encryptionKey = CONFIG.query_enc_key;
        if (!encryptionKey || encryptionKey.length < 32) {
            throw new Error('Invalid encryption key: must be at least 32 characters');
        }

        // Generate random IV for AES-256-CBC
        const iv = crypto.randomBytes(16);

        // Create cipher using AES-256-CBC
        const cipher = crypto.createCipheriv('aes-256-cbc',
            Buffer.from(encryptionKey.substring(0, 32)), iv);

        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Combine IV and encrypted data (IV in hex + encrypted data)
        const result = iv.toString('hex') + encrypted;

        return result;
    } catch (err) {
        console.error("AES-256 encryption error:", err);
        throw new Error('Failed to encrypt data');
    }
}

export function DecryptQuery(hex: string = ""): Record<string, any> {
    try {
        // Input validation
        if (!validateHexInput(hex)) {
            throw new Error('Invalid encrypted query format');
        }

        const encryptionKey = CONFIG.query_enc_key;
        if (!encryptionKey || encryptionKey.length < 32) {
            throw new Error('Invalid encryption key: must be at least 32 characters');
        }

        // Extract IV (first 32 hex chars = 16 bytes) and encrypted data
        const iv = Buffer.from(hex.substring(0, 32), 'hex');
        const encryptedData = hex.substring(32);

        // Create decipher using AES-256-CBC
        const decipher = crypto.createDecipheriv('aes-256-cbc',
            Buffer.from(encryptionKey.substring(0, 32)), iv);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        const result = JSON.parse(decrypted);

        if (!result || typeof result !== 'object') {
            throw new Error('Invalid decrypted data format');
        }

        return result;
    } catch (err) {
        console.error("AES-256 decryption error:", err);
        throw new Error('Failed to decrypt query data');
    }
}
export function encryptHybrid(data: object): { data: string; key: string; nonce: string; auth_tag: string } {
    const publicKey = process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY;
    if (!publicKey) throw new Error("Missing RSA public key");

    const aesKey = crypto.randomBytes(32); // AES-256
    const nonce = crypto.randomBytes(12); // AES-GCM nonce (IV)
    const jsonData = JSON.stringify(data);

    // AES-256-GCM encryption
    const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, nonce);
    let encrypted = cipher.update(jsonData, "utf8", "base64");
    encrypted += cipher.final("base64");
    const authTag = cipher.getAuthTag();

    // Encrypt AES key with RSA (OAEP + SHA-256)
    const encryptedAESKey = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        aesKey,
    );

    return {
        data: encrypted,
        key: encryptedAESKey.toString("base64"),
        nonce: nonce.toString("base64"),
        auth_tag: authTag.toString("base64"),
    };
}

// export function decryptHybrid(payload: { key: string; data: string; nonce: string; auth_tag: string }): unknown {
//     const { key, data, nonce, auth_tag } = payload;

//     const rawKey = process.env.RSA_PRIVATE_KEY;

//     if (!rawKey) throw new Error("Missing RSA_PRIVATE_KEY");

//     const privateKey = rawKey.replace(/\\n/g, "\n");

//     // Decrypt AES key
//     const aesKey = crypto.privateDecrypt(
//         {
//             key: privateKey,
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//             oaepHash: "sha256",
//         },
//         Buffer.from(key, "base64"),
//     );

//     // AES-GCM decryption
//     const decipher = crypto.createDecipheriv("aes-256-gcm", aesKey, Buffer.from(nonce, "base64"));
//     decipher.setAuthTag(Buffer.from(auth_tag, "base64"));

//     const encryptedBuf = Buffer.from(data, "base64");
//     const decrypted = Buffer.concat([decipher.update(encryptedBuf), decipher.final()]);

//     return JSON.parse(decrypted.toString("utf8"));
// }

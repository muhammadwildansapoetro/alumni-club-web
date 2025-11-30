import { CONFIG } from "@/config";
import crypto from "crypto";
import CryptoJS from "crypto-js";

export function EncryptQuery(data: Record<string, any>): string {
    try {
        const key = CryptoJS.enc.Utf8.parse(CONFIG.query_enc_key!);
        const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0]); // 8-byte IV for DES

        const encrypted = CryptoJS.DES.encrypt(JSON.stringify(data), key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        // return ciphertext in HEX (not Base64) to be WAF-safe
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    } catch (err) {
        console.error("Encryption error:", err);
        return "";
    }
}

export function DecryptQuery(hex: string = ""): Record<string, any> {
    try {
        if (!hex) return {};

        const key = CryptoJS.enc.Utf8.parse(CONFIG.query_enc_key!);
        const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0, 0, 0, 0, 0]);

        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Hex.parse(hex),
        });

        const decrypted = CryptoJS.DES.decrypt(cipherParams, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        const result = decrypted.toString(CryptoJS.enc.Utf8);
        return result ? JSON.parse(result) : {};
    } catch (err) {
        console.error("Decryption error:", err);
        return {};
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

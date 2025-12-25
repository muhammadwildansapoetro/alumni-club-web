export const VERSION_TAG = "0.0.1";

export type TypeConfig = {
    query_enc_key: string | undefined;
};

export const CONFIG = {
    // API Configuration
    API: {
        baseURL: {
            auth: process.env.NEXT_PUBLIC_API_BASE_URL + "/auth",
        },
    },

    // Encryption
    query_enc_key: process.env.NEXT_PUBLIC_QUERY_ENCRYPTION_KEY || "",

    // Application
    version: VERSION_TAG,
    environment: process.env.NODE_ENV || "development",
};

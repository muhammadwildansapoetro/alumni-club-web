export const VERSION_TAG = "1.0.0";

export type TypeConfig = {
    query_enc_key: string | undefined;
};

export const CONFIG = {
    // API Configuration
    API: {
        baseURL: {
            auth: process.env.NEXT_PUBLIC_API_URL + "/auth",
            users: process.env.NEXT_PUBLIC_API_URL + "/users",
        },
    },

    // Encryption
    query_enc_key: process.env.NEXT_PUBLIC_QUERY_ENCRYPTION_KEY || "",

    // Application
    version: VERSION_TAG,
    environment: process.env.NODE_ENV || "development",
};

export const VERSION_TAG = "0.0.1";

export type TypeConfig = {
    query_enc_key: string | undefined;
};

export const CONFIG = {
    query_enc_key: process.env.NEXT_PUBLIC_QUERY_ENCRYPTION_KEY || "",
};

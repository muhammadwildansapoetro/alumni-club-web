"use client";

import { DecryptQuery } from "@/lib/encryption";
import { useSearchParams } from "next/navigation";

interface UseEncryptQueryResult {
    data: Record<string, any>;
    error: string | null;
    isLoading: boolean;
}

export function useEncryptQuery(): UseEncryptQueryResult {
    const searchParams = useSearchParams();
    const path = searchParams.get("path");

    // Input validation
    if (!path) {
        return {
            data: {},
            error: null,
            isLoading: false
        };
    }

    try {
        const decryptQuery = DecryptQuery(path);
        return {
            data: decryptQuery,
            error: null,
            isLoading: false
        };
    } catch (error) {
        console.error("Failed to decrypt query parameters:", error);
        return {
            data: {},
            error: error instanceof Error ? error.message : "Failed to decrypt query parameters",
            isLoading: false
        };
    }
}

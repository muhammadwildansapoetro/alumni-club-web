"use client";

import { DecryptQuery } from "@/lib/encryption";
import { useSearchParams } from "next/navigation";

export function useEncryptQuery(): Record<string, any> {
    const searchParams = useSearchParams();
    const path = searchParams.get("path");
    const decryptQuery = DecryptQuery(path!);
    return decryptQuery;
}

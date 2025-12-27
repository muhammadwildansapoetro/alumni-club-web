"use client";

import useSWR from "swr";
import { api } from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export function useProfile(initialData?: any) {
    return useSWR("/users/me", fetcher, {
        fallbackData: initialData,
        revalidateOnFocus: false,
    });
}

"use client";

import useSWR from "swr";
import { API } from "@/lib/axios";

const fetcher = (url: string) => API.get(url).then((res) => res.data.data);

export function useProfile(initialData?: any) {
    return useSWR("/users/me", fetcher, {
        fallbackData: initialData,
        revalidateOnFocus: false,
    });
}

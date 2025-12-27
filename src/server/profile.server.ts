"use server";

import { CONFIG } from "@/config";
import { cookies } from "next/headers";

export async function getOwnProfile() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
        return null;
    }

    const res = await fetch(CONFIG.API.baseURL.users + "/me", {
        headers: {
            Cookie: `access_token=${accessToken}`,
        },
        cache: "no-store",
    });

    if (res.status === 401) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch profile");
    }

    const json = await res.json();
    return json.data;
}

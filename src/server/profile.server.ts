"use server";

import { CONFIG } from "@/config";
import { cookies } from "next/headers";

export async function getOwnProfile() {
    const cookieStore = await cookies();
    const session = cookieStore.get("alumni_session")?.value;

    if (!session) {
        return null;
    }

    const res = await fetch(CONFIG.API.baseURL.users + "/me", {
        headers: {
            Cookie: `alumni_session=${session}`,
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

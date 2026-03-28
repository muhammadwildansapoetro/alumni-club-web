import { cookies } from "next/headers";
import { CONFIG } from "@/config";
import { getOwnProfile } from "@/server/profile.server";
import ProfileJobsClient from "./client";

export default async function ProfileJobsPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const cookieStore = await cookies();
    const session = cookieStore.get("alumni_session")?.value;
    const searchParams = props.searchParams ? await props.searchParams : {};

    const user = await getOwnProfile();

    const params = new URLSearchParams();
    if (user?.id) params.append("userId", user.id);

    const supportedParams = ["page", "limit", "search", "jobType", "industry", "isActive", "countryId", "provinceId", "cityId"];
    for (const key of supportedParams) {
        if (searchParams[key]) params.append(key, String(searchParams[key]));
    }

    let jobs = null;
    let error = null;

    try {
        const res = await fetch(`${CONFIG.API.baseURL.jobs}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `alumni_session=${session}`,
            },
            cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.error || json.message || "Gagal mengambil data lowongan");
        }

        jobs = json.data;
    } catch (e: any) {
        error = e.message;
    }

    return <ProfileJobsClient jobs={jobs} error={error} />;
}

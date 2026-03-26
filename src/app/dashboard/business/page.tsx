import { cookies } from "next/headers";
import { CONFIG } from "@/config";
import BusinessClient from "./client";

export default async function BusinessPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const cookieStore = await cookies();
    const session = cookieStore.get("alumni_session")?.value;
    const searchParams = props.searchParams ? await props.searchParams : {};
    const params = new URLSearchParams();

    const supportedParams = ["page", "limit", "search", "category", "location", "isActive"];
    for (const key of supportedParams) {
        if (searchParams[key]) params.append(key, String(searchParams[key]));
    }

    let businesses = null;
    let error = null;

    try {
        const res = await fetch(`${CONFIG.API.baseURL.businesses}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `alumni_session=${session}`,
            },
            cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.error || json.message || "Gagal mengambil data bisnis");
        }

        businesses = {
            data: json.data,
            page: json.page,
            limit: json.limit,
            total: json.total,
            totalPages: json.totalPages,
        };
    } catch (e: any) {
        error = e.message;
    }

    return <BusinessClient businesses={businesses} error={error} />;
}

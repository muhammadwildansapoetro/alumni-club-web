import { cookies } from "next/headers";
import { CONFIG } from "@/config";
import AlumniClient from "./client";

export default async function AlumniPage(props: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const cookieStore = await cookies();
    const session = cookieStore.get("alumni_session")?.value;

    const searchParams = props.searchParams ? await props.searchParams : {};
    const params = new URLSearchParams();

    if (searchParams.page) params.append("page", String(searchParams.page));
    if (searchParams.limit) params.append("limit", String(searchParams.limit));
    if (searchParams.search) params.append("search", String(searchParams.search));
    if (searchParams.department) params.append("department", String(searchParams.department));
    if (searchParams.entryYear) params.append("entryYear", String(searchParams.entryYear));
    if (searchParams.cityId) params.append("cityId", String(searchParams.cityId));
    if (searchParams.provinceId) params.append("provinceId", String(searchParams.provinceId));
    if (searchParams.countryId) params.append("countryId", String(searchParams.countryId));

    let initialData = null;
    let error = null;

    try {
        const res = await fetch(`${CONFIG.API.baseURL.users}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `alumni_session=${session}`,
            },
            cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.error || json.message || "Gagal mengambil data alumni");
        }

        initialData = json.data;
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">Daftar Alumni</h1>
            <AlumniClient initialData={initialData} error={error} />
        </div>
    );
}

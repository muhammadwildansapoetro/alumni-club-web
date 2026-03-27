import { CONFIG } from "@/config";
import { AlumniStatistics } from "@/types/statistic";
import StatisticClient from "./client";

export default async function StatisticPage() {
    let statistics: AlumniStatistics | null = null;
    let error: string | null = null;

    try {
        const res = await fetch(`${CONFIG.API.baseURL.statistics}/alumni`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
            throw new Error(json.message ?? "Gagal memuat statistik alumni");
        }

        statistics = json.data;
    } catch (e: unknown) {
        error = e instanceof Error ? e.message : "Gagal memuat statistik alumni";
    }

    return <StatisticClient statistics={statistics} error={error} />;
}

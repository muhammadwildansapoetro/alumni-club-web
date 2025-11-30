"use client";

import StatisticCard from "@/components/card/statistic-card";
import WorkLocationMap from "@/components/map/work-location-map";

import dynamic from "next/dynamic";

const SalaryRangeChart = dynamic(() => import("@/components/chart/salary-range-chart"), { ssr: false });
const IndustryChart = dynamic(() => import("@/components/chart/industry-chart"), { ssr: false });

export default function StatisticClient() {
    return (
        <div className="space-y-3">
            {/* Cards */}
            <StatisticCard />

            {/* Work Map */}
            <WorkLocationMap />

            {/* Chart */}
            <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
                <SalaryRangeChart />
                <IndustryChart />
            </div>
        </div>
    );
}

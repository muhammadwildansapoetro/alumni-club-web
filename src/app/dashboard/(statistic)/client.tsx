"use client";

import StatisticCard from "@/components/card/statistic-card";
import FeatureUnderConstruction from "@/components/feature-under-construction";

export default function StatisticClient() {
    return (
        <div className="space-y-3">
            <StatisticCard />
            <FeatureUnderConstruction />
        </div>
    );
}

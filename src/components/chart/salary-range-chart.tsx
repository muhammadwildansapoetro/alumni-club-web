"use client";

import dynamic from "next/dynamic";
import { AlumniDataDummy } from "@/data/dummy/alumni";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalaryRangeChart() {
    const low = AlumniDataDummy.filter((a) => a.salaryRange === "low").length;
    const mid = AlumniDataDummy.filter((a) => a.salaryRange === "mid").length;
    const high = AlumniDataDummy.filter((a) => a.salaryRange === "high").length;

    const series = [low, mid, high];

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "pie",
        },
        labels: ["0 - 5.000.000", "5.000.000 - 10.000.000", "> 10.000.000"],
        colors: ["#60A5FA", "#34D399", "#F87171"],
        legend: {
            position: "bottom",
        },
    };

    return (
        <Card className="gap-1">
            <CardHeader>
                <CardTitle className="text-lg">Estimasi Rentang Pendapatan</CardTitle>
            </CardHeader>
            <CardContent>
                <Chart options={options} series={series} type="pie" height={320} />
            </CardContent>
        </Card>
    );
}

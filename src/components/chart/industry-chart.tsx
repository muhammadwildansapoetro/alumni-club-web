"use client";

import dynamic from "next/dynamic";
import { AlumniDataDummy } from "@/data/dummy/alumni";
import { ApexOptions } from "apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function IndustryChart() {
    const industryTitles: Record<string, string> = {
        irigasi: "Irigasi",
        pangan: "Pangan",
        agroindustri: "Agroindustri",
        perkebunan: "Perkebunan",
        manufaktur: "Manufaktur",
        manufacturing: "Manufacturing",
        pertanian: "Pertanian",
        hospitality_food: "Hospitality & Food",
    };

    const industryColors: Record<string, string> = {
        irigasi: "#16a34a",
        pangan: "#f97316",
        agroindustri: "#059669",
        perkebunan: "#65a30d",
        manufaktur: "#2563eb",
        manufacturing: "#1d4ed8",
        pertanian: "#ca8a04",
        hospitality_food: "#e11d48",
    };

    const industryCounts = AlumniDataDummy.reduce((acc: any, item) => {
        acc[item.industry] = (acc[item.industry] || 0) + 1;
        return acc;
    }, {});

    const enumKeys = Object.keys(industryCounts);
    const values = Object.values(industryCounts) as number[];
    const labels = enumKeys.map((key) => industryTitles[key] || key);
    const barColors = enumKeys.map((key) => industryColors[key] || "#6b7280");

    const options: ApexOptions = {
        chart: {
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 5,
                distributed: true,
            },
        },
        colors: barColors,
        dataLabels: {
            enabled: true,
        },
        xaxis: {
            categories: labels,
            title: {
                text: "Orang",
            },
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: "Jumlah",
            data: values as number[],
        },
    ];

    return (
        <Card className="h-fit gap-1">
            <CardHeader>
                <CardTitle className="text-lg">Industri Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent>
                <Chart type="bar" height={350} options={options} series={series} />
            </CardContent>
        </Card>
    );
}

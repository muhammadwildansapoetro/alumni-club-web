"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EEmploymentType, TEmploymentType } from "@/types/user";
import type { ChartConfig } from "@/components/ui/chart";

interface EmploymentTypeChartProps {
    data: Record<string, number>;
}

const COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#be185d", "#65a30d"];

export default function EmploymentTypeChart({ data }: EmploymentTypeChartProps) {
    const chartData = useMemo(() => {
        return Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .map(([key, value], i) => ({
                name: key,
                label: TEmploymentType[key as EEmploymentType] ?? key,
                value,
                fill: COLORS[i % COLORS.length],
            }))
            .filter((item) => item.value > 0);
    }, [data]);

    const chartConfig: ChartConfig = useMemo(() => {
        return Object.fromEntries(chartData.map((item) => [item.name, { label: item.label, color: item.fill }]));
    }, [chartData]);

    return (
        <Card className="gap-1">
            <CardHeader>
                <CardTitle className="text-lg">Tipe Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend content={(props) => <ChartLegendContent payload={props.payload ? [...props.payload] : undefined} nameKey="name" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

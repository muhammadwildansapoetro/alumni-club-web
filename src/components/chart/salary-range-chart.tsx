"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EIncomeRange, TIncomeRange } from "@/types/user";
import type { ChartConfig } from "@/components/ui/chart";

interface SalaryRangeChartProps {
    data: Record<string, number>;
}

const SALARY_ORDER: EIncomeRange[] = [EIncomeRange.BELOW_5M, EIncomeRange.RANGE_5_10M, EIncomeRange.RANGE_10_15M, EIncomeRange.ABOVE_15M];

const COLORS = ["#60a5fa", "#34d399", "#f97316", "#f43f5e"];

const chartConfig: ChartConfig = {
    [EIncomeRange.BELOW_5M]: { label: TIncomeRange[EIncomeRange.BELOW_5M], color: COLORS[0] },
    [EIncomeRange.RANGE_5_10M]: { label: TIncomeRange[EIncomeRange.RANGE_5_10M], color: COLORS[1] },
    [EIncomeRange.RANGE_10_15M]: { label: TIncomeRange[EIncomeRange.RANGE_10_15M], color: COLORS[2] },
    [EIncomeRange.ABOVE_15M]: { label: TIncomeRange[EIncomeRange.ABOVE_15M], color: COLORS[3] },
};

export default function SalaryRangeChart({ data }: SalaryRangeChartProps) {
    const chartData = useMemo(
        () =>
            SALARY_ORDER.map((key, i) => ({
                name: key,
                value: data[key] ?? 0,
                fill: COLORS[i],
            })).filter((item) => item.value > 0),
        [data],
    );

    return (
        <Card className="gap-1">
            <CardHeader>
                <CardTitle className="text-lg">Estimasi Rentang Pendapatan</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
                            {chartData.map((entry, i) => (
                                <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <ChartLegend content={(props) => <ChartLegendContent payload={props.payload ? [...props.payload] : undefined} nameKey="name" />} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

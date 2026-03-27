"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { EmploymentLevel, TEmploymentLevel } from "@/types/user";
import type { ChartConfig } from "@/components/ui/chart";

interface JobLevelChartProps {
    data: Record<string, number>;
}

const BAR_COLOR = "#2563eb";

const chartConfig: ChartConfig = {
    jumlah: { label: "Jumlah", color: BAR_COLOR },
};

export default function JobLevelChart({ data }: JobLevelChartProps) {
    const chartData = useMemo(() => {
        return Object.entries(data)
            .sort(([, a], [, b]) => b - a)
            .map(([key, value]) => ({
                level: TEmploymentLevel[key as EmploymentLevel] ?? key,
                jumlah: value,
            }));
    }, [data]);

    return (
        <Card className="h-fit gap-1">
            <CardHeader>
                <CardTitle className="text-lg">Level Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[280px] w-full">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
                        <XAxis type="number" allowDecimals={false} />
                        <YAxis type="category" dataKey="level" width={140} tick={{ fontSize: 12 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="jumlah" radius={[0, 4, 4, 0]}>
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={BAR_COLOR} />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

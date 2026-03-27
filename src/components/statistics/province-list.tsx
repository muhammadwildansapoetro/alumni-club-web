"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlumniStatisticsProvince } from "@/types/statistic";
import { MapPinIcon } from "lucide-react";

interface ProvinceListProps {
    data: AlumniStatisticsProvince[];
    totalAlumni: number;
}

export default function ProvinceList({ data, totalAlumni }: ProvinceListProps) {
    const top = data.slice(0, 10);
    const maxCount = top[0]?.count ?? 1;

    return (
        <Card className="gap-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPinIcon className="h-5 w-5" /> Sebaran per Provinsi
                </CardTitle>
            </CardHeader>
            <CardContent>
                {top.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Belum ada data provinsi.</p>
                ) : (
                    <ul className="space-y-3">
                        {top.map(({ provinceId, provinceName, count }) => {
                            const pct = totalAlumni > 0 ? ((count / totalAlumni) * 100).toFixed(1) : "0";
                            return (
                                <li key={provinceId}>
                                    <div className="mb-1 flex justify-between text-sm">
                                        <span className="font-medium">{provinceName}</span>
                                        <span className="text-muted-foreground tabular-nums">
                                            {count.toLocaleString("id-ID")} ({pct}%)
                                        </span>
                                    </div>
                                    <div className="bg-muted h-2 rounded-full">
                                        <div
                                            className="h-2 rounded-full bg-green-600 transition-all"
                                            style={{ width: `${(count / maxCount) * 100}%` }}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

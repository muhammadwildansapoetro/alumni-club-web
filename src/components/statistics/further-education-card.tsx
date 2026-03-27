"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EDegree, TDegree } from "@/types/user";
import { GraduationCapIcon } from "lucide-react";

interface FurtherEducationCardProps {
    data: Record<string, number>;
}

const DEGREE_COLORS: Record<EDegree, string> = {
    [EDegree.MAGISTER]: "text-purple-600 border-purple-500 bg-purple-50/50",
    [EDegree.DOCTOR]: "text-indigo-600 border-indigo-500 bg-indigo-50/50",
};

export default function FurtherEducationCard({ data }: FurtherEducationCardProps) {
    const degrees = [EDegree.MAGISTER, EDegree.DOCTOR];

    return (
        <Card className="gap-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <GraduationCapIcon className="h-5 w-5" /> Pendidikan Lanjutan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {degrees.map((degree) => (
                        <div
                            key={degree}
                            className={`flex flex-col gap-1 rounded-lg border p-4 ${DEGREE_COLORS[degree]}`}
                        >
                            <p className="text-sm font-medium">{TDegree[degree]}</p>
                            <p className="text-2xl font-bold tabular-nums">
                                {(data[degree] ?? 0).toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs opacity-70">alumni</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

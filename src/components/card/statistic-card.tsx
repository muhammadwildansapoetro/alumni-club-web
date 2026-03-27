"use client";

import { AppleIcon, LeafIcon, TractorIcon, UsersIcon, WarehouseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { AlumniStatistics } from "@/types/statistic";

interface StatisticCardProps {
    data: AlumniStatistics;
}

export default function StatisticCard({ data }: StatisticCardProps) {
    return (
        <div className="space-y-1">
            <h2 className="text-lg font-bold">Statistik Alumni</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                <Card className="justify-between gap-3 border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <UsersIcon className="h-5 w-5" /> Alumni Terdaftar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold">{data.totalAlumni.toLocaleString("id-ID")}</p>
                    </CardContent>
                </Card>

                <Link href="/dashboard/alumni?department=TEP" className="block">
                    <Card className="cursor-pointer justify-between gap-3 border-green-500 bg-gradient-to-br from-green-50 to-green-100 text-green-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <TractorIcon className="h-5 w-5" /> Teknik Pertanian
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-bold">{(data.byDepartment["TEP"] ?? 0).toLocaleString("id-ID")}</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/alumni?department=TPN" className="block">
                    <Card className="cursor-pointer justify-between gap-3 border-red-500 bg-gradient-to-br from-red-50 to-red-100 text-red-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <AppleIcon className="h-5 w-5" /> Teknologi Pangan
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-bold">{(data.byDepartment["TPN"] ?? 0).toLocaleString("id-ID")}</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/alumni?department=TIN" className="block">
                    <Card className="cursor-pointer gap-3 border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <WarehouseIcon className="h-5 w-5" /> Teknologi Industri Pertanian
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-bold">{(data.byDepartment["TIN"] ?? 0).toLocaleString("id-ID")}</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/dashboard/alumni?department=TEKNOTAN" className="block">
                    <Card className="cursor-pointer gap-3 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <LeafIcon className="h-5 w-5" /> Teknologi Pertanian (Teknotan)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl font-bold">{(data.byDepartment["TEKNOTAN"] ?? 0).toLocaleString("id-ID")}</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

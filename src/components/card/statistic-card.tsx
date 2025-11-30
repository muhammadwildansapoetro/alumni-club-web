"use client";

import { AppleIcon, ArrowRightIcon, TractorIcon, UsersIcon, WarehouseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { AlumniDataDummy } from "@/data/dummy/alumni";

export default function StatisticCard() {
    const total = AlumniDataDummy?.length;
    const tep = AlumniDataDummy?.filter((a) => a.major === "tep").length;
    const tpn = AlumniDataDummy?.filter((a) => a.major === "tpn").length;
    const tin = AlumniDataDummy?.filter((a) => a.major === "tin").length;

    return (
        <div className="space-y-1">
            <h2 className="text-lg font-bold">Statistik Alumni</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                <Card className="justify-between gap-3 border-2 border-yellow-500 bg-yellow-50/50 text-yellow-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <UsersIcon className="h-5 w-5" /> Alumni Terdaftar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold">{total}</p>
                    </CardContent>
                </Card>

                <Card className="justify-between gap-3 border-green-500 bg-green-50/50 text-green-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <TractorIcon className="h-5 w-5" /> Teknik Pertanian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">{tep}</p>
                        <Button size={"sm"} variant={"outline"} className="h-7 border-green-500 text-xs">
                            Lihat <ArrowRightIcon />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="justify-between gap-3 border-red-500 bg-red-50/50 text-red-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <AppleIcon className="h-5 w-5" /> Teknologi Pangan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">{tpn}</p>
                        <Button size={"sm"} variant={"outline"} className="h-7 border-red-500 text-xs">
                            Lihat <ArrowRightIcon />
                        </Button>
                    </CardContent>
                </Card>

                <Card className="gap-3 border-orange-500 bg-orange-50/50 text-orange-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <WarehouseIcon className="h-5 w-5" /> Teknologi Industri Pertanian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">{tin}</p>
                        <Button size={"sm"} variant={"outline"} className="h-7 border-orange-500 text-xs">
                            Lihat <ArrowRightIcon />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

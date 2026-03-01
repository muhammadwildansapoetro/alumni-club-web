"use client";

import { AppleIcon, ArrowRightIcon, TractorIcon, UsersIcon, WarehouseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export default function StatisticCard() {
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
                        <p className="text-xl font-bold">0</p>
                    </CardContent>
                </Card>

                <Card className="justify-between gap-3 border-green-500 bg-green-50/50 text-green-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <TractorIcon className="h-5 w-5" /> Teknik Pertanian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">0</p>
                        <Link
                            href={"/dashboard/alumni/agricultural-engineering"}
                            className={buttonVariants({ className: "h-6! text-xs", size: "sm", variant: "outline" })}
                        >
                            Lihat <ArrowRightIcon />
                        </Link>
                    </CardContent>
                </Card>

                <Card className="justify-between gap-3 border-red-500 bg-red-50/50 text-red-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <AppleIcon className="h-5 w-5" /> Teknologi Pangan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">0</p>
                        <Link
                            href={"/dashboard/alumni/food-technology"}
                            className={buttonVariants({
                                className: "h-6! border-red-500 text-xs text-red-500 hover:border-red-500 hover:bg-red-50 hover:text-red-500",
                                size: "sm",
                                variant: "outline",
                            })}
                        >
                            Lihat <ArrowRightIcon />
                        </Link>
                    </CardContent>
                </Card>

                <Card className="gap-3 border-orange-500 bg-orange-50/50 text-orange-600">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <WarehouseIcon className="h-5 w-5" /> Teknologi Industri Pertanian
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-xl font-bold">0</p>
                        <Link
                            href={"/dashboard/alumni/agricultural-industrial-technology"}
                            className={buttonVariants({
                                className:
                                    "h-6! border-orange-500 text-xs text-orange-500 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-500",
                                size: "sm",
                                variant: "outline",
                            })}
                        >
                            Lihat <ArrowRightIcon />
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

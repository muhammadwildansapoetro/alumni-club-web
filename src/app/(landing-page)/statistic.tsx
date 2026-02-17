"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlumniDataDummy } from "@/data/dummy/alumni";
import IndustryChart from "@/components/chart/industry-chart";
import SalaryRangeChart from "@/components/chart/salary-range-chart";
import { Users, Globe, Building, TrendingUp } from "lucide-react";

export default function Statistic() {
    const totalAlumni = AlumniDataDummy?.length || 0;
    const countries = new Set(AlumniDataDummy?.map((a) => a.location)).size; // Using location field
    const industries = new Set(AlumniDataDummy?.map((a) => a.industry)).size;
    const companies = Math.floor(totalAlumni * 0.3); // Estimate: 30% work in different companies

    return (
        <section id="statistics" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl space-y-5">
                    {/* Section Header */}
                    <div className="pb-5 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Statistik Alumni</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-700">Angka-angka yang menunjukkan kekuatan jaringan alumni kami</p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                        <Card className="h-fit gap-0 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <Users className="h-8 w-8 text-green-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-3xl font-bold text-gray-900">{totalAlumni.toLocaleString()}+</h3>
                                <p className="text-sm text-gray-700">Total Alumni</p>
                            </CardContent>
                        </Card>

                        <Card className="h-fit gap-0 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                    <Globe className="h-8 w-8 text-blue-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-3xl font-bold text-gray-900">{countries}+</h3>
                                <p className="text-sm text-gray-700">Lokasi</p>
                            </CardContent>
                        </Card>

                        <Card className="h-fit gap-0 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <Building className="h-8 w-8 text-purple-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-3xl font-bold text-gray-900">{companies}+</h3>
                                <p className="text-sm text-gray-700">Perusahaan</p>
                            </CardContent>
                        </Card>

                        <Card className="h-fit gap-0 text-center transition-shadow hover:shadow-lg">
                            <CardHeader>
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                                    <TrendingUp className="h-8 w-8 text-orange-600" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <h3 className="text-3xl font-bold text-gray-900">{industries}</h3>
                                <p className="text-sm text-gray-700">Industri</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {/* Industry Distribution */}
                        <IndustryChart />

                        {/* Salary Range */}
                        <SalaryRangeChart />
                    </div>
                </div>
            </div>
        </section>
    );
}

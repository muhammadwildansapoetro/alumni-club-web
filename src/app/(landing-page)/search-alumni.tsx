"use client";

import { useState } from "react";
import SearchInput from "@/components/input/search-input";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactSelect from "@/components/ui/react-select";
import { AlumniDataDummy } from "@/data/dummy/alumni";
import { MapPin, Building, ArrowRight } from "lucide-react";
import Link from "next/link";

const majorLabels = {
    tep: "Teknik Pertanian",
    tpn: "Teknologi Pangan",
    tin: "Teknologi Industri Pertanian",
};

const industryLabels = {
    pertanian: "Pertanian",
    pangan: "Pangan",
    agroindustri: "Agroindustri",
    manufaktur: "Manufaktur",
    manufacturing: "Manufacturing",
    perkebunan: "Perkebunan",
    irigasi: "Irigasi",
    hospitality_food: "Hospitality & Food",
};

// Options for ReactSelect
const majorOptions = [
    { value: "all", label: "Semua Jurusan" },
    { value: "tep", label: "Teknik Pertanian" },
    { value: "tpn", label: "Teknologi Pangan" },
    { value: "tin", label: "Teknologi Industri Pertanian" },
];

const industryOptions = [
    { value: "all", label: "Semua Industri" },
    { value: "pertanian", label: "Pertanian" },
    { value: "pangan", label: "Pangan" },
    { value: "agroindustri", label: "Agroindustri" },
    { value: "manufaktur", label: "Manufaktur" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "perkebunan", label: "Perkebunan" },
    { value: "irigasi", label: "Irigasi" },
    { value: "hospitality_food", label: "Hospitality & Food" },
];

export default function SearchAlumni() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMajor, setSelectedMajor] = useState<string>("all");
    const [selectedIndustry, setSelectedIndustry] = useState<string>("all");

    // Filter alumni based on search and filters
    const filteredAlumni = AlumniDataDummy.filter((alumni) => {
        const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMajor = selectedMajor === "all" || alumni.major === selectedMajor;
        const matchesIndustry = selectedIndustry === "all" || alumni.industry === selectedIndustry;

        return matchesSearch && matchesMajor && matchesIndustry;
    }).slice(0, 9); // Show only 6 results on landing page

    return (
        <section id="search-alumni" className="bg-primary/10 py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    {/* Section Header */}
                    <div className="text-primary space-y-3 pb-10 text-center">
                        <h2 className="text-3xl font-bold md:text-4xl">Cari Alumni</h2>
                        <p className="mx-auto max-w-2xl text-lg font-medium">Jelajahi jaringan alumni kami dari berbagai jurusan dan industri</p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-5 rounded-xl bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <SearchInput placeholder="Cari alumni berdasarkan nama" onSelect={(value) => setSearchTerm(value)} />
                            </div>
                            <ReactSelect
                                name="major"
                                options={majorOptions}
                                value={majorOptions.find((option) => option.value === selectedMajor)}
                                onChange={(selectedOption) => setSelectedMajor(selectedOption?.value || "all")}
                                placeholder="Semua Jurusan"
                                instanceId="major-select"
                                isSearchable={false}
                            />
                            <ReactSelect
                                name="industry"
                                options={industryOptions}
                                value={industryOptions.find((option) => option.value === selectedIndustry)}
                                onChange={(selectedOption) => setSelectedIndustry(selectedOption?.value || "all")}
                                placeholder="Semua Industri"
                                instanceId="industry-select"
                                isSearchable={false}
                            />
                        </div>
                    </div>

                    {/* Alumni Cards */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAlumni.map((alumni) => (
                            <Card key={alumni.id} className="gap-0 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <CardTitle className="text-lg">{alumni.name}</CardTitle>
                                                <Badge variant={alumni.major.toUpperCase() as "TEP" | "TPN" | "TIN"} size={"xs"}>
                                                    {majorLabels[alumni.major as keyof typeof majorLabels]}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Building className="mr-2 h-4 w-4 text-gray-400" />
                                        {industryLabels[alumni.industry as keyof typeof industryLabels] || alumni.industry}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                                        {alumni.location}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* View All CTA */}
                    <div className="mt-5 text-center">
                        <Link href="/dashboard/alumni" className={buttonVariants({ variant: "outline" })}>
                            Lihat Semua Alumni
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

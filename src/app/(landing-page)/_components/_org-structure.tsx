"use client";

import { Building2, ChevronDown, Globe, Landmark } from "lucide-react";

interface OrgLevel {
    icon: React.ReactNode;
    title: string;
    description: string;
    bgColor: string;
    iconColor: string;
    borderColor: string;
}

const orgLevels: OrgLevel[] = [
    {
        icon: <Landmark className="h-8 w-8" />,
        title: "Pengurus Pusat",
        description: "Pusat koordinasi nasional IKA FTIP Unpad yang menetapkan kebijakan strategis, program kerja nasional, dan hubungan antar lembaga.",
        bgColor: "bg-primary-600",
        iconColor: "text-white",
        borderColor: "border-primary-600",
    },
    {
        icon: <Building2 className="h-8 w-8" />,
        title: "Pengurus Fakultas (FTIP)",
        description:
            "Penghubung antara alumni dengan fakultas, mengelola kegiatan di lingkungan FTIP Unpad, dan menjadi mitra strategis dekanat.",
        bgColor: "bg-primary-500",
        iconColor: "text-white",
        borderColor: "border-primary-500",
    },
    {
        icon: <Globe className="h-8 w-8" />,
        title: "Pengurus Kewilayahan",
        description:
            "Unit pelaksana di berbagai wilayah Indonesia yang mengkoordinasikan kegiatan alumni lokal dan memperluas jejaring daerah.",
        bgColor: "bg-primary-400",
        iconColor: "text-white",
        borderColor: "border-primary-400",
    },
];

export default function OrgStructure() {
    return (
        <section id="organization" className="bg-white py-24">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-600">
                        Organisasi
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Struktur <span className="text-primary-gradient">Organisasi</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Tiga pilar kepengurusan yang saling terhubung untuk menjalankan misi IKA FTIP Unpad secara efektif.
                    </p>
                </div>

                {/* Org Flow */}
                <div className="flex flex-col items-center gap-0">
                    {orgLevels.map((level, index) => (
                        <div key={level.title} className="flex w-full flex-col items-center">
                            {/* Card */}
                            <div
                                className={`group w-full rounded-2xl border-2 ${level.borderColor} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8`}
                            >
                                <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
                                    {/* Icon Circle */}
                                    <div className={`shrink-0 rounded-xl ${level.bgColor} p-4 ${level.iconColor}`}>{level.icon}</div>

                                    {/* Text */}
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">{level.title}</h3>
                                        <p className="leading-relaxed text-gray-600">{level.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Connector Arrow (not after last item) */}
                            {index < orgLevels.length - 1 && (
                                <div className="flex flex-col items-center py-2">
                                    <div className="h-6 w-0.5 bg-primary-300" />
                                    <ChevronDown className="h-5 w-5 text-primary-400" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

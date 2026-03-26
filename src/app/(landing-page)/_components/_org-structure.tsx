"use client";

import { ChevronDown, Gavel, Network, Shield, Users } from "lucide-react";

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
        icon: <Gavel className="h-8 w-8" />,
        title: "Rapat Anggota",
        description:
            "Pemegang kekuasaan tertinggi perkumpulan. Menetapkan kebijakan, program kerja, dan keputusan strategis organisasi IKA FTIP Unpad.",
        bgColor: "bg-primary-600",
        iconColor: "text-white",
        borderColor: "border-primary-600",
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: "Pengurus",
        description:
            "Pelaksana operasional perkumpulan yang terdiri dari Ketua Umum, Wakil Ketua Umum, Sekretaris Umum, dan Bendahara Umum, serta bidang-bidang kerja.",
        bgColor: "bg-primary-500",
        iconColor: "text-white",
        borderColor: "border-primary-500",
    },
    {
        icon: <Shield className="h-8 w-8" />,
        title: "Pengawas",
        description:
            "Bertugas memberi nasihat kepada Pengurus dalam menjalankan kegiatan perkumpulan dan memastikan organisasi berjalan sesuai AD/ART.",
        bgColor: "bg-primary-400",
        iconColor: "text-white",
        borderColor: "border-primary-400",
    },
];

export default function OrgStructure() {
    return (
        <section id="organization" className="from-primary-50 to-primary-100 relative overflow-hidden bg-linear-to-br via-white py-24">
            {/* Decorative floating shapes */}
            <div className="pointer-events-none absolute inset-0">
                <div className="bg-primary-200/30 absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full blur-3xl" />
                <div className="bg-primary-300/20 absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl [animation-delay:1s]" />
                <div className="bg-accent-200/20 absolute top-1/2 left-1/3 h-48 w-48 animate-pulse rounded-full blur-3xl [animation-delay:2s]" />
            </div>
            <div className="container relative z-10 mx-auto max-w-4xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="bg-primary-50 text-primary-600 mb-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-sm font-semibold">
                        <Network className="h-3.5 w-3.5" /> Organisasi
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Struktur <span className="text-primary-gradient">Organisasi</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Berdasarkan Pasal 10 Anggaran Dasar, organ IKA FTIP Unpad terdiri dari tiga unsur yang saling mendukung.
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
                                    <ChevronDown className="text-primary-400 h-4 w-4" />
                                    <ChevronDown className="text-primary-400 h-4 w-4" />
                                    <ChevronDown className="text-primary-400 h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

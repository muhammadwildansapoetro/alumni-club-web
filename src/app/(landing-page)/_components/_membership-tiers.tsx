"use client";

import { Award, GraduationCap, Users } from "lucide-react";

interface MembershipTier {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    members: string[];
    accentColor: string;
    bgColor: string;
    borderColor: string;
}

const tiers: MembershipTier[] = [
    {
        icon: <GraduationCap className="h-8 w-8" />,
        title: "Anggota Biasa",
        subtitle: "Lulusan FTIP Unpad",
        description: "Alumni dari semua jenjang pendidikan yang telah diwisuda dari Fakultas Teknologi Industri Pertanian Unpad.",
        members: ["Sarjana (S1)", "Pascasarjana (S2 & S3)", "Diploma (D3/D4)", "Program Profesi"],
        accentColor: "text-primary-600",
        bgColor: "bg-primary-50",
        borderColor: "border-primary-200",
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: "Anggota Luar Biasa",
        subtitle: "Mitra & Simpatisan",
        description: "Dosen, tenaga kependidikan, dan simpatisan yang memiliki kepedulian terhadap perkembangan FTIP Unpad.",
        members: ["Dosen Aktif/Pensiunan", "Tenaga Kependidikan", "Simpatisan & Pendukung"],
        accentColor: "text-accent-600",
        bgColor: "bg-accent-50",
        borderColor: "border-accent-200",
    },
    {
        icon: <Award className="h-8 w-8" />,
        title: "Anggota Kehormatan",
        subtitle: "Kontribusi Istimewa",
        description: "Individu yang telah memberikan kontribusi luar biasa bagi kemajuan IKA FTIP Unpad dan almamater.",
        members: ["Tokoh Berjasa", "Kontributor Istimewa", "Penghargaan Khusus"],
        accentColor: "text-primary-700",
        bgColor: "bg-primary-100",
        borderColor: "border-primary-300",
    },
];

export default function MembershipTiers() {
    return (
        <section id="membership" className="bg-white py-24">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-600">
                        Keanggotaan
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Keanggotaan <span className="text-primary-gradient">IKA Unpad</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Berdasarkan AD/ART IKA Unpad 2024, keanggotaan IKA Unpad terdiri dari tiga kategori utama.
                    </p>
                </div>

                {/* Tier Cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.title}
                            className={`group relative rounded-2xl border ${tier.borderColor} bg-white p-8 shadow-sm transition-all duration-300 
                            :-translate-y-1 hover:shadow-xl`}
                        >
                            {/* Icon */}
                            <div className={`mb-5 inline-flex rounded-xl ${tier.bgColor} p-3 ${tier.accentColor}`}>{tier.icon}</div>

                            {/* Title */}
                            <h3 className="mb-1 text-xl font-bold text-gray-900">{tier.title}</h3>
                            <p className={`mb-3 text-sm font-semibold ${tier.accentColor}`}>{tier.subtitle}</p>

                            {/* Description */}
                            <p className="mb-5 leading-relaxed text-gray-600">{tier.description}</p>

                            {/* Member Types */}
                            <ul className="space-y-2">
                                {tier.members.map((member) => (
                                    <li key={member} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className={`h-1.5 w-1.5 rounded-full ${tier.bgColor} ring-2 ring-current ${tier.accentColor}`} />
                                        {member}
                                    </li>
                                ))}
                            </ul>

                            {/* Hover glow */}
                            <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-primary-100/0 to-primary-200/0 transition-all duration-300 group-hover:from-primary-50/50 group-hover:to-primary-100/30" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

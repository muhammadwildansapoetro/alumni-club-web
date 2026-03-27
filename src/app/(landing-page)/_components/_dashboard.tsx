"use client";

import { BookOpen, Briefcase, Building2, BarChart3, UserPlus } from "lucide-react";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    highlight: string;
}

const features: Feature[] = [
    {
        icon: <BookOpen className="h-7 w-7" />,
        title: "Direktori Alumni",
        description: "Temukan dan terhubung dengan sesama alumni FTIP Unpad di seluruh Indonesia. Cari berdasarkan nama, angkatan, atau domisili.",
        highlight: "Menghimpun alumni sebagai wadah silaturahmi dan jejaring",
    },
    {
        icon: <Briefcase className="h-7 w-7" />,
        title: "Lowongan Kerja",
        description: "Akses dan bagikan peluang karir dari jaringan alumni. Alumni dapat memposting lowongan untuk sesama alumni FTIP Unpad.",
        highlight: "Optimalisasi sumber daya alumni untuk pembangunan nasional",
    },
    {
        icon: <Building2 className="h-7 w-7" />,
        title: "Bisnis Alumni",
        description: "Daftarkan dan temukan bisnis milik alumni FTIP Unpad — dari agribisnis, konsultasi pertanian, hingga budidaya tanaman.",
        highlight: "Membangun perekonomian masyarakat di bidang industri pertanian",
    },
    {
        icon: <BarChart3 className="h-7 w-7" />,
        title: "Statistik Keanggotaan",
        description: "Lihat data statistik persebaran alumni berdasarkan angkatan, domisili, dan bidang pekerjaan.",
        highlight: "Data sebaran alumni FTIP Unpad secara nasional",
    },
];

export default function Dashboard() {
    return (
        <section id="features" className="from-primary-600 to-primary-800 relative overflow-hidden bg-linear-to-br py-24">
            {/* Ornament blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute top-1/3 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
                <div className="bg-primary-400/20 absolute top-0 right-1/3 h-56 w-56 rounded-full blur-2xl" />
                {/* Grid dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-4xl text-center">
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1 text-sm font-semibold text-white">
                        <UserPlus className="h-3.5 w-3.5" /> Bergabung Sekarang
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Jadilah Bagian dari <span className="text-primary-200">Komunitas IKA FTIP Unpad</span>
                    </h2>
                    <p className="text-lg text-white/80">
                        Buat akun alumni dan nikmati akses penuh ke seluruh fitur dasbor — terhubung, berbagi peluang, dan berkembang bersama.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group hover:border-primary-200/60 relative rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-t-8 hover:bg-white/15 hover:shadow-xl"
                        >
                            {/* Icon */}
                            <div className="mb-5 inline-flex rounded-xl bg-white/20 p-3 text-white">{feature.icon}</div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>

                            {/* Description */}
                            <p className="mb-4 leading-relaxed text-white/80">{feature.description}</p>

                            {/* Highlight Quote */}
                            <div className="border-primary-200 rounded-lg border-l-3 bg-white/10 px-4 py-3">
                                <p className="text-primary-100 text-sm font-semibold italic">&ldquo;{feature.highlight}&rdquo;</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

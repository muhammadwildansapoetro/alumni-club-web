"use client";

import { BookOpen, Briefcase, Scale } from "lucide-react";

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
        description: "Temukan dan terhubung dengan sesama alumni FTIP Unpad di seluruh Indonesia dan dunia.",
        highlight: "Membangun jejaring dan rasa kebersamaan",
    },
    {
        icon: <Briefcase className="h-7 w-7" />,
        title: "Karir & Kolaborasi",
        description: "Akses peluang karir, kolaborasi bisnis, dan sumber daya profesional dari jaringan alumni.",
        highlight: "Optimalisasi sumber daya alumni untuk pembangunan nasional",
    },
    {
        icon: <Scale className="h-7 w-7" />,
        title: "Legal & Etika Hub",
        description: "Akses dokumen AD/ART, Kode Etik, dan informasi kelembagaan organisasi secara transparan.",
        highlight: "Akses AD/ART dan Kode Etik",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-linear-to-b from-gray-50 to-white py-24">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-600">
                        Fitur
                    </span>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                        Rumah Alumni — <span className="text-primary-gradient">Dashboard Digital Anda</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Satu platform untuk mengelola keanggotaan, memperluas jejaring, dan berkontribusi bagi almamater.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative rounded-2xl border border-white/50 bg-white/70 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Glassmorphism green accent bar */}
                            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-primary-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Icon */}
                            <div className="mb-5 inline-flex rounded-xl bg-primary-50 p-3 text-primary-600">{feature.icon}</div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>

                            {/* Description */}
                            <p className="mb-4 leading-relaxed text-gray-600">{feature.description}</p>

                            {/* Highlight Quote */}
                            <div className="rounded-lg border-l-3 border-primary-400 bg-primary-50/50 px-4 py-3">
                                <p className="text-sm font-semibold text-primary-700 italic">&ldquo;{feature.highlight}&rdquo;</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

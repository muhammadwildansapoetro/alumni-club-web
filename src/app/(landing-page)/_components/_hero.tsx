"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, LogInIcon, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="home"
            className="from-primary-50 to-primary-100 relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-linear-to-br via-white"
        >
            {/* Decorative floating shapes */}
            <div className="pointer-events-none absolute inset-0">
                <div className="bg-primary-200/30 absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full blur-3xl" />
                <div className="bg-primary-300/20 absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full blur-3xl [animation-delay:1s]" />
                <div className="bg-accent-200/20 absolute top-1/2 left-1/3 h-48 w-48 animate-pulse rounded-full blur-3xl [animation-delay:2s]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="mx-auto max-w-4xl space-y-8 text-center">
                    {/* Vision Badge */}
                    <div className="border-primary-300 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                        <Sparkles className="text-primary-500 h-4 w-4" />
                        <span className="text-primary-700 text-sm font-semibold tracking-wide">Menghimpun Alumni, Membangun Negeri</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        IKA FTIP Unpad:
                        <br />
                        <span className="text-primary-gradient">Wadah Alumni, Mitra Bangsa</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                        Menghimpun alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran — bersama membangun perekonomian masyarakat di
                        bidang teknologi industri pertanian dan mencerdaskan bangsa.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
                        <Link
                            href="/signin"
                            className={buttonVariants({
                                size: "lg",
                                className: "shadow-primary-500/25 gap-2 px-8 text-base! shadow-lg",
                            })}
                        >
                            <LogInIcon className="h-5 w-5" />
                            Masuk ke Dasbor
                        </Link>

                        <Link
                            href="#about"
                            className={buttonVariants({
                                size: "lg",
                                variant: "outline",
                                className: "gap-2 px-8 text-base!",
                            })}
                        >
                            Pelajari Lebih Lanjut
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="mx-auto flex max-w-lg items-center justify-center gap-8 pt-8 md:gap-12">
                        <div className="text-center">
                            <p className="text-primary-600 text-2xl font-bold md:text-3xl">1.200+</p>
                            <p className="text-sm text-gray-500">Total Alumni</p>
                        </div>
                        <div className="h-10 w-px bg-gray-300" />
                        <div className="text-center">
                            <p className="text-primary-600 text-2xl font-bold md:text-3xl">80+</p>
                            <p className="text-sm text-gray-500">Industri</p>
                        </div>
                        <div className="h-10 w-px bg-gray-300" />
                        <div className="text-center">
                            <p className="text-primary-600 text-2xl font-bold md:text-3xl">34</p>
                            <p className="text-sm text-gray-500">Provinsi Tersebar</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

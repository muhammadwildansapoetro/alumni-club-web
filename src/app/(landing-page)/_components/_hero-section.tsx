"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, GlobeIcon } from "lucide-react";

export default function HeroSection() {
    return (
        <section id="home" className="flex items-center justify-center bg-white py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl space-y-5 text-center">
                    {/* Badge */}
                    <div className="text-primary border-primary inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
                        <GlobeIcon className="mr-2 h-4 w-4" />
                        FTIP Unpad Alumni Club
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-6xl">
                        Bergabung dengan <br />
                        <span className="text-primary-gradient">FTIP Unpad Alumni Club</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
                        Dapatkan berbagai manfaat eksklusif dan jadilah bagian dari komunitas alumni FTIP Unpad yang aktif, profesional, dan saling
                        mendukung. Bangun profil alumni, perluas jejaring, akses lowongan kerja, hingga mempromosikan bisnis alumni.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/register" className={buttonVariants({ size: "lg", className: "text-base!" })}>
                            Bergabung Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>

                        <Link href="#statistics" className={buttonVariants({ size: "lg", variant: "outline", className: "text-base!" })}>
                            Lihat Statistik
                        </Link>
                    </div>

                    {/* Feature Highlights */}
                    {/* <div className="grid grid-cols-1 gap-8 pt-5 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <Users className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">5,000+ Alumni</h3>
                            <p className="text-gray-600">Jaringan luas alumni</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <Globe className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">25+ Kota</h3>
                            <p className="text-gray-600">Alumni tersebar di seluruh daerah</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <Briefcase className="text-primary h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">500+ Perusahaan</h3>
                            <p className="text-gray-600">Berkarir di perusahaan ternama</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

"use client";

import Link from "next/link";
import { MailIcon, CalendarDays, FileText } from "lucide-react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const navigation = [
    { name: "Tentang", href: "#about" },
    { name: "Keanggotaan", href: "#membership" },
    { name: "Fitur", href: "#features" },
    { name: "Organisasi", href: "#organization" },
    { name: "Dasbor", href: "/signin" },
];

export default function Footer() {
    return (
        <footer id="contact" className="from-primary-600 to-primary-800 relative overflow-hidden bg-linear-to-br text-white">
            {/* Ornaments */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
                <div className="bg-primary-400/20 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" />
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
            </div>
            <div className="relative z-10 container mx-auto max-w-7xl space-y-8 px-4 py-16">
                <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={45} height={45} />
                            <span className="text-xl font-bold">IKA FTIP Unpad</span>
                        </div>
                        <p className="max-w-md leading-relaxed text-white/80">
                            Ikatan Alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran. Terhubung, berbagi, dan berkembang bersama
                            alumni FTIP Unpad.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                                <span className="text-white/70">Didirikan:</span>{" "}
                                <strong className="text-white">07 Maret 2017 · Nomor Akta 01</strong>
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                            <FileText className="h-4 w-4" />
                            <span>
                                <span className="text-white/70">SK Kemenkumham:</span>{" "}
                                <strong className="text-white">AHU-0005459.AH.01.07.TAHUN 2017</strong>
                            </span>
                        </div>
                    </div>
                    {/* Right group */}
                    <div className="flex shrink-0 gap-12">
                        {/* Menu */}
                        <div className="space-y-3">
                            <h3 className="font-semibold">Menu</h3>
                            <ul className="space-y-2">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kontak */}
                        <div className="space-y-3">
                            <h3 className="font-semibold">Kontak</h3>
                            <div className="space-y-2">
                                <a href="mailto:ikaftip@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-white hover:underline">
                                    <MailIcon className="h-4 w-4 shrink-0" />
                                    ikaftip@gmail.com
                                </a>
                                <a
                                    href="https://www.instagram.com/ikaftipunpad"
                                    target="_blank"
                                    className="flex items-center gap-2 text-white/80 hover:text-white hover:underline"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="h-4 w-4" />
                                    ikaftipunpad
                                </a>
                            </div>
                        </div>
                    </div>{" "}
                    {/* end right group */}
                </div>

                <div className="border-t border-white/20" />

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-2 text-sm text-white/70 md:flex-row">
                    <p>© {new Date().getFullYear()} IKA FTIP Unpad. Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
                    <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                        Kebijakan Privasi
                    </Link>
                </div>
            </div>
        </footer>
    );
}

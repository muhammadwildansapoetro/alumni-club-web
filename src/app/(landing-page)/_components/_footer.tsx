"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id="contact" className="bg-primary text-white">
            <div className="container mx-auto max-w-7xl space-y-4 px-4 py-16">
                <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-8">
                    {/* Company Info */}
                    <div className="max-w-md space-y-2">
                        <div className="flex items-center gap-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={45} height={45} />
                            <span className="text-xl font-bold">FTIP Unpad Alumni Club</span>
                        </div>
                        <p className="leading-relaxed">
                            Website Ikatan Alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran. Terhubung, berbagi, dan berkembang
                            bersama alumni FTIP Unpad di seluruh dunia.
                        </p>
                    </div>

                    <div className="flex items-start gap-8">
                        {/* Quick Links */}
                        <div className="space-y-2">
                            <h3 className="font-semibold">Menu</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="#search-alumni" className="whitespace-nowrap underline-offset-4 transition-colors hover:underline">
                                        Cari Alumni
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#statistics" className="whitespace-nowrap underline-offset-4 transition-colors hover:underline">
                                        Statistik
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#alumni-story" className="whitespace-nowrap underline-offset-4 transition-colors hover:underline">
                                        Cerita Alumni
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="whitespace-nowrap underline-offset-4 transition-colors hover:underline">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-2">
                            <h3 className="font-semibold">Kontak</h3>
                            <a href="mailto:ikaftip@gmail.com" className="flex items-center gap-1 hover:underline">
                                <MailIcon className="h-4 w-4 shrink-0 text-white" />
                                ikaftip@gmail.com
                            </a>
                            <a
                                href="https://www.instagram.com/ikaftipunpad"
                                target="_blank"
                                className="flex items-center gap-1 hover:underline"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="h-4 w-4" /> Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white" />

                {/* Bottom Footer */}

                <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
                    <p>Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>

                    <Link href="/privacy-policy?from=home" target="_blank" className="underline underline-offset-4 transition-colors hover:underline">
                        Kebijakan Privasi
                    </Link>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from "next/link";
import { MailIcon, MapPin, CalendarDays } from "lucide-react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const navigation = [
    { name: "Keanggotaan", href: "#membership" },
    { name: "Fitur", href: "#features" },
    { name: "Organisasi", href: "#organization" },
    { name: "Dashboard", href: "/dashboard" },
];

const offices = [
    {
        city: "Bandung",
        address: "Kampus FTIP Unpad, Jatinangor, Sumedang, Jawa Barat",
    },
    {
        city: "Jakarta",
        address: "Sekretariat IKA FTIP Unpad, DKI Jakarta",
    },
];

export default function Footer() {
    return (
        <footer id="contact" className="bg-primary text-white">
            <div className="container mx-auto max-w-7xl space-y-8 px-4 py-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-3 lg:col-span-2">
                        <div className="flex items-center gap-2">
                            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={45} height={45} />
                            <span className="text-xl font-bold">IKA FTIP Unpad</span>
                        </div>
                        <p className="max-w-md leading-relaxed text-white/80">
                            Ikatan Alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran. Terhubung, berbagi, dan berkembang bersama
                            alumni FTIP Unpad di seluruh Indonesia.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                                <strong className="text-white">Established:</strong> 24 September 1960
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Menu</h3>
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Office */}
                    <div className="space-y-4">
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
                                @ikaftipunpad
                            </a>
                        </div>

                        <h3 className="pt-2 font-semibold">Kantor</h3>
                        <div className="space-y-3">
                            {offices.map((office) => (
                                <div key={office.city} className="flex items-start gap-2 text-sm text-white/80">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-white">{office.city}</p>
                                        <p>{office.address}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/20" />

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-2 text-sm text-white/70 md:flex-row">
                    <p>© {new Date().getFullYear()} IKA FTIP Unpad. Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
                    <Link href="/privacy-policy?from=home" target="_blank" className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline">
                        Kebijakan Privasi
                    </Link>
                </div>
            </div>
        </footer>
    );
}

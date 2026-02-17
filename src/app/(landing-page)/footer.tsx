"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id="contact" className="bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-7xl py-16">
                    <div className="mb-12 flex justify-between">
                        {/* Company Info */}
                        <div className="max-w-md">
                            <div className="mb-4 flex items-center space-x-2">
                                <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={45} height={45} />
                                <span className="text-xl font-bold">FTIP Alumni</span>
                            </div>
                            <p className="mb-6 leading-relaxed">
                                Website Ikatan Alumni Fakultas Teknologi Industri Pertanian Universitas Padjadjaran. Terhubung, berbagi, dan
                                berkembang bersama alumni FTIP di seluruh dunia.
                            </p>

                            {/* Social Media */}
                            <div className="flex space-x-4">
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border-white bg-white transition-colors hover:border hover:text-white"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://www.instagram.com/ikaftipunpad"
                                    target="_blank"
                                    className="text-primary hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border-white bg-white transition-colors hover:border hover:text-white"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="h-6 w-6" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Menu</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#search-alumni" className="underline-offset-4 transition-colors hover:underline">
                                        Cari Alumni
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#statistics" className="underline-offset-4 transition-colors hover:underline">
                                        Statistik
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#alumni-story" className="underline-offset-4 transition-colors hover:underline">
                                        Cerita Alumni
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="underline-offset-4 transition-colors hover:underline">
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-4 w-4 shrink-0 text-white" />
                                    <span className="text-sm">Jl. Raya Bandung-Sumedang KM. 21, Jatinangor</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-4 w-4 shrink-0 text-white" />
                                    <span className="text-sm">+62 812 3456 7890</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-4 w-4 shrink-0 text-white" />
                                    <span className="text-sm">ikaftip@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-white pt-6">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <p className="mb-4 text-sm md:mb-0">Dikelola oleh Pengurus IKA FTIP Unpad 2025-2029</p>
                            <div className="flex space-x-6 text-sm">
                                <Link
                                    href="/privacy-policy?from=home"
                                    target="_blank"
                                    className="underline underline-offset-4 transition-colors hover:underline"
                                >
                                    Kebijakan Privasi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

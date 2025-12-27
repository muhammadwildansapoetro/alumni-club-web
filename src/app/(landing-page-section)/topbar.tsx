"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navigation = [
    { name: "Cari Alumni", href: "#search-alumni" },
    { name: "Statistik", href: "#statistics" },
    { name: "Cerita Alumni", href: "#alumni-story" },
];

export default function TopBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 shadow backdrop-blur supports-backdrop-filter:bg-white/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={45} height={45} />
                    <span className="text-xl font-bold text-gray-900">FTIP Unpad Alumni Club</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center space-x-8 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="hover:text-primary hover:border-primary text-sm font-medium text-gray-700 transition-colors hover:border-b-2"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA Buttons */}
                <div className="hidden items-center space-x-3 md:flex">
                    <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                        Log in
                    </Link>

                    <Link href="/register" className={buttonVariants()}>
                        Daftar
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="size-5" />
                            <span className="sr-only">Buka menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-75 sm:w-100">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription>Navigasi FTIP Alumni Club</SheetDescription>
                        </SheetHeader>
                        <nav className="mt-6 flex flex-col space-y-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="hover:text-primary text-sm font-medium text-gray-700 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-2 border-t pt-4">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        Masuk
                                    </Link>
                                </Button>
                                <Button size="sm" className="bg-primary hover:bg-primary" asChild>
                                    <Link href="/register" onClick={() => setIsOpen(false)}>
                                        Daftar
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

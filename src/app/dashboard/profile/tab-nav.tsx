"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { label: "Profil", href: "/dashboard/profile" },
    { label: "Bisnis", href: "/dashboard/profile/business" },
    { label: "Pekerjaan", href: "/dashboard/profile/jobs" },
];

export default function ProfileTabNav() {
    const pathname = usePathname();

    return (
        <div className="flex border-b">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                                ? "border-primary text-primary border-b-2"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {tab.label}
                    </Link>
                );
            })}
        </div>
    );
}

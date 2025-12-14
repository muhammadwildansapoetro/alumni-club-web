"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { NAVIGATIONS, filterNavigationByRole } from "@/constant/navigations";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

export default function NavigationMenu() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { user } = useAuthStore();

    // Filter navigation based on user role
    const filteredNavigations = filterNavigationByRole(user?.role || "USER", NAVIGATIONS);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="flex items-center gap-5">
            {filteredNavigations?.map((nav) => {
                const isActive = nav?.active?.includes(pathname);
                const hasChildren = (nav?.children?.length ?? 0) > 0;

                return (
                    <div key={nav.name} className="relative">
                        {/* Parent Menu */}
                        {hasChildren ? (
                            <button
                                onClick={() => toggleDropdown(nav.name)}
                                className={cn(
                                    "hover:text-primary flex flex-col items-center justify-center py-1.5 text-xs transition hover:cursor-pointer",
                                    isActive ? "text-primary border-primary border-b-2" : "text-gray-700",
                                )}
                            >
                                {typeof nav.icon === "string" ? (
                                    <Image src={nav.icon} alt={nav.name} width={22} height={22} />
                                ) : (
                                    <nav.icon className="mb-1 h-6 w-6" />
                                )}
                                <span className="flex items-center gap-1">
                                    {nav.name}
                                    <ChevronDown
                                        className={cn("mt-0.5 h-4 w-4 transition", openDropdown === nav.name ? "text-primary rotate-180" : "")}
                                    />
                                </span>
                            </button>
                        ) : (
                            <Link
                                href={nav.href ?? "#"}
                                className={cn(
                                    "hover:text-primary flex flex-col items-center justify-center py-1.5 text-xs transition",
                                    isActive ? "text-primary border-primary border-b-2" : "text-gray-700",
                                )}
                            >
                                {typeof nav.icon === "string" ? (
                                    <Image src={nav.icon} alt={nav.name} width={22} height={22} />
                                ) : (
                                    <nav.icon className="mb-1 h-6 w-6" />
                                )}
                                <span>{nav.name}</span>
                            </Link>
                        )}

                        {/* Dropdown */}
                        {hasChildren && openDropdown === nav?.name && (
                            <div className="absolute top-14 left-1/2 z-50 w-64 -translate-x-1/2 rounded-md border bg-white py-2 shadow-lg">
                                {nav?.children?.map((child) => {
                                    const childActive = child.active.includes(pathname);
                                    const childHasChildren = (child?.children?.length ?? 0) > 0;

                                    return (
                                        <div key={child.name} className="relative">
                                            <Link
                                                href={child.href ?? "#"}
                                                className={cn(
                                                    "hover:bg-primary/10 flex items-center gap-3 px-4 py-2 text-sm",
                                                    childActive ? "text-primary bg-primary/10" : "text-gray-700",
                                                )}
                                            >
                                                {typeof child.icon === "string" ? (
                                                    <Image src={child.icon} alt={child.name} width={18} height={18} />
                                                ) : (
                                                    <child.icon className="h-4 w-4" />
                                                )}
                                                {child.name}
                                            </Link>

                                            {/* Sub-Level Dropdown */}
                                            {childHasChildren && (
                                                <div className="mt-1 ml-4 space-y-1 border-l pl-4">
                                                    {child?.children?.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href ?? "#"}
                                                            className={cn(
                                                                "block rounded px-2 py-1 text-sm hover:bg-gray-100",
                                                                sub.active.includes(pathname) ? "text-primary bg-primary/10" : "text-gray-600",
                                                            )}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { abbreviation, cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter as useNavigation } from "next/navigation";
import { useEffect, useState } from "react";
import LogoTitle from "./logo-title";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import dynamic from "next/dynamic";
import MobileNavigationMenu from "./mobile-navigation-menu";
import { useAuthStore } from "@/stores/auth.store";

const SearchInput = dynamic(() => import("../input/search-input"), { ssr: false });
const NavigationMenu = dynamic(() => import("./navigation-menu"), { ssr: false });

const Topbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigation = useNavigation();
    const isMobile = useIsMobile();
    const abbr = abbreviation(user?.name || "");
    const [scrollUp, setScrollUp] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleLogout = async () => {
        try {
            logout();
            navigation.push("/login");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < lastScrollY) {
                setScrollUp(true);
            } else {
                setScrollUp(false);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Don't render if not authenticated
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <nav
            className={cn(
                "fixed top-0 right-0 left-0 z-998 flex h-16 w-full items-center justify-between gap-3 border-b bg-white/90 shadow backdrop-blur-md transition-transform duration-300",
                scrollUp ? "translate-y-0" : "-translate-y-full",
                isMobile ? "px-3" : "lg:px-20 xl:px-40",
            )}
        >
            {/* Mobile Menu */}
            {isMobile && (
                <div className="flex items-center gap-1">
                    <MobileNavigationMenu />
                    <LogoTitle />
                </div>
            )}

            {/* Topbar Navigation */}
            {!isMobile && (
                <div className="flex items-center gap-3">
                    <LogoTitle />
                    <SearchInput />
                </div>
            )}

            {/* Profile, Log Out */}
            <div className="flex items-center justify-end gap-5">
                {!isMobile && <NavigationMenu />}
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="hover:bg-primary/5 flex w-fit items-center gap-2 hover:rounded-xl">
                            <Avatar className="h-9 w-9 border border-black/30 hover:cursor-pointer">
                                <AvatarImage />
                                <AvatarFallback>{abbr}</AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col items-start gap-0.5 hover:cursor-pointer">
                                <span className="line-clamp-1 max-w-24 text-left text-sm font-medium sm:max-w-fit">
                                    {user.profile?.fullName || user.name}
                                </span>
                                <div className="flex items-center gap-2">
                                    {user.role === "ADMIN" && (
                                        <Badge size="xs" variant={"outline"}>
                                            Pengurus
                                        </Badge>
                                    )}
                                    <Badge size="xs" variant={"default"}>
                                        {user?.profile?.department} - {user.profile?.classYear || "Alumni"}
                                    </Badge>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-2 w-[180px]">
                            <DropdownMenuItem onClick={handleLogout} className="hover:cursor-pointer focus:bg-red-50 focus:text-red-500">
                                <LogOut className="focus:text-red-500" /> Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;

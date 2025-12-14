"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDownIcon, ChevronUpIcon, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { INavigation, NAVIGATIONS, filterNavigationByRole } from "@/constant/navigations";
import LogoTitle from "./logo-title";
import SearchInput from "../input/search-input";
import { useAuthStore } from "@/stores/auth.store";

interface MobileNavItemProps {
    item: INavigation;
    onLinkClick: () => void;
    level?: number;
}

const MobileNavItem = ({ item, onLinkClick, level = 0 }: MobileNavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Use exact match logic like the desktop NavigationMenu
    const isActive = item.active?.includes(pathname) ?? false;
    const hasChildren = item.children && item.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        } else if (item.href) {
            router.push(item.href);
            onLinkClick();
        }
    };

    const Icon = item.icon;

    return (
        <div className="w-full">
            <Button
                variant="ghost"
                className={cn(
                    "hover:bg-primary/5 hover:text-primary w-full justify-start gap-3",
                    level > 0 && "pl-8",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/10 font-medium",
                )}
                onClick={handleClick}
            >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <span className="flex-1 text-left">{item.name}</span>
                {hasChildren && (isOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />)}
            </Button>

            {hasChildren && isOpen && (
                <div className="mt-1 space-y-1 pl-2">
                    {item.children?.map((child, index) => (
                        <MobileNavItem key={index} item={child} onLinkClick={onLinkClick} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const MobileNavigationMenu = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { user } = useAuthStore();

    // Filter navigation based on user role
    const filteredNavigations = filterNavigationByRole(user?.role || "USER", NAVIGATIONS);

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <button className="hover:bg-primary/5 rounded-lg p-2 transition-colors hover:cursor-pointer">
                    <Menu className="text-muted-foreground h-6 w-6" />
                </button>
            </SheetTrigger>

            <SheetContent side="left" className="z-999 w-xs gap-0 p-0">
                <SheetHeader className="border-b py-2.5">
                    <SheetTitle className="flex gap-3">
                        <LogoTitle />
                        <div className="-space-y-1 font-bold">
                            <p>FTIP Unpad</p>
                            <p>Alumni Club</p>
                        </div>
                    </SheetTitle>
                </SheetHeader>

                {/* Navigation Items */}
                <div className="h-[calc(100vh-80px)] space-y-3 overflow-y-auto p-3">
                    <SearchInput inputClassName="!w-full" />
                    <div className="flex flex-col gap-1 py-0">
                        {filteredNavigations.map((item, index) => (
                            <MobileNavItem key={index} item={item} onLinkClick={() => setIsSheetOpen(false)} />
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNavigationMenu;

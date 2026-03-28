"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    overlay?: boolean;
}

const sizeMap = {
    sm: { logo: 32, ring: "w-12 h-12" },
    md: { logo: 44, ring: "w-16 h-16" },
    lg: { logo: 56, ring: "w-20 h-20" },
};

const Loading = ({ size = "md", className, overlay = false }: LoadingProps) => {
    const { logo, ring } = sizeMap[size];

    const content = (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="relative flex items-center justify-center">
                {/* Spinning ring */}
                <div className={cn("absolute animate-spin rounded-full border-2 border-primary-200 border-t-primary-500", ring)} />
                {/* Logo */}
                <Image
                    src="/logo/logo-ika-ftip-unpad.png"
                    alt="IKA FTIP Unpad"
                    width={logo}
                    height={logo}
                    priority
                    className="relative z-10 object-contain opacity-90"
                />
            </div>
        </div>
    );

    if (overlay) {
        return <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">{content}</div>;
    }

    return content;
};

export { Loading };

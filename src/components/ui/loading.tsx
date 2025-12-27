"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    overlay?: boolean;
}

interface LoadingContentProps {
    size: "sm" | "md" | "lg";
    className?: string;
}

const LoadingContent = ({ size, className }: LoadingContentProps) => {
    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
    };

    return (
        <div className={cn("flex items-center justify-center", className)}>
            {/* Logo with fade-in animation */}
            <div className={cn("relative flex animate-ping items-center justify-center", sizeClasses[size])}>
                <Image src="/logo/logo-ika-ftip-unpad.png" alt="IKA FTIP Unpad Logo" width={50} height={50} className="object-contain" />
            </div>
        </div>
    );
};

const Loading = ({ size = "md", className, overlay = false }: LoadingProps) => {
    if (overlay) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5">
                <LoadingContent size={size} className={className} />
            </div>
        );
    }

    return <LoadingContent size={size} className={className} />;
};

export { Loading };

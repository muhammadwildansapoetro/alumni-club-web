import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface LogoProps {
    size?: number;
    className?: string;
}

const LogoTitle: React.FC<LogoProps> = ({ size = 45, className = "" }) => {
    const router = useRouter();

    const handleLogoClick = () => {
        router.push("/dashboard");
    };

    return (
        <div
            className={`flex items-center justify-center gap-1 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
            onClick={handleLogoClick}
        >
            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={size} height={size} className="shrink-0" />
        </div>
    );
};

export default LogoTitle;

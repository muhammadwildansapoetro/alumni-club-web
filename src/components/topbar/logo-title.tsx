import Image from "next/image";
import React from "react";

interface LogoProps {
    size?: number;
    className?: string;
}

const LogoTitle: React.FC<LogoProps> = ({ size = 45, className = "" }) => {
    return (
        <div className={`flex items-center justify-center gap-1 ${className}`}>
            <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={size} height={size} className="shrink-0" />
        </div>
    );
};

export default LogoTitle;

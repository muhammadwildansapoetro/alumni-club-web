import Image from "next/image";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-2">
                <Image src="/logo/logo-ika-ftip-unpad.png" alt="Logo" width={70} height={70} className="animate-pulse transition-all duration-300" />
                <p className="animate-pulse text-sm font-semibold">FTIP Unpad Alumni Club</p>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Loader2 } from "lucide-react";

interface AdminProtectionProps {
    children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
    const { user } = useAuthStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAdminAccess = () => {
            if (!user) {
                router.push("/login");
                return;
            }

            if (user.role !== "ADMIN") {
                router.push("/dashboard");
                return;
            }

            setIsLoading(false);
        };

        checkAdminAccess();
    }, [user, router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="text-primary h-8 w-8 animate-spin" />
                    <p className="text-sm text-gray-600">Memeriksa hak akses...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

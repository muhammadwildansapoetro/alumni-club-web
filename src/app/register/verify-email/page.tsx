"use client";

import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParamsSafe } from "@/components/search-params-provider";

export default function VerifyEmailPage() {
    const searchParams = useSearchParamsSafe();
    const token = searchParams.get("token");
    const { verifyEmail } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleVerification = async () => {
            if (!token) {
                toast.error("Token Tidak Ditemukan", {
                    description: "Tidak ada token verifikasi.",
                    duration: 3000,
                });
                // Redirect to login after showing error
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
                return;
            }

            await verifyEmail(token);
        };

        handleVerification();
    }, [token, verifyEmail, router]);

    return (
        <div className="to-primary-50 flex min-h-screen items-center justify-center bg-linear-to-t from-white">
            <div className="text-center">
                <Loader2Icon className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">Memverifikasi email Anda...</p>
            </div>
        </div>
    );
}

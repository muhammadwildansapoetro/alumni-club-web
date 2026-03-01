"use client";

import Topbar from "@/components/topbar/topbar";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user) {
            router.replace("/");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <Topbar />

            <div className="container mx-auto min-h-screen px-5 py-20 transition-all duration-300">
                <main>{children}</main>
            </div>

            <p className="bg-primary py-0.5 text-center text-xs text-white">Dikelola oleh Pengurus Ikatan Alumni FTIP Unpad 2025-2029</p>
        </div>
    );
};

export default DashboardLayout;

"use client";

import Topbar from "@/components/topbar/topbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Topbar />

            <div className="min-h-screen bg-gray-100 px-3 py-20 transition-all duration-300 lg:px-20 xl:px-40">
                <main>{children}</main>
            </div>

            <p className="bg-primary py-0.5 text-center text-xs text-white">Dikelola oleh Pengurus Ikatan Alumni FTIP Unpad 2025-2029</p>
        </div>
    );
};

export default DashboardLayout;

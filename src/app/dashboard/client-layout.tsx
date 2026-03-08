"use client";

import DialogProvider from "@/components/dialog/dialog-provider";
import Topbar from "@/components/topbar/topbar";
import { VERSION_TAG } from "@/config";
import React from "react";

const DashboardClientLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Topbar />

            <div className="container mx-auto min-h-screen px-5 py-20 transition-all duration-300">
                <main>{children}</main>
            </div>

            <DialogProvider />

            <p className="bg-primary py-0.5 text-center text-xs text-white">Dikelola oleh Pengurus Ikatan Alumni FTIP Unpad 2025-2029</p>

            <span className="fixed right-0 bottom-0 z-40 rounded-tl-md bg-white px-2 text-xs font-medium select-none">v{VERSION_TAG}</span>
        </div>
    );
};

export default DashboardClientLayout;

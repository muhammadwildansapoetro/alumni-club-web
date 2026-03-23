import StoreInitializer from "@/components/store-initializer";
import { getOwnProfile } from "@/server/profile.server";
import { redirect } from "next/navigation";
import React from "react";
import DashboardClientLayout from "./client-layout";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getOwnProfile();

    if (!user) {
        redirect("/signin");
    }

    return (
        <>
            <StoreInitializer user={user} />
            <DashboardClientLayout>{children}</DashboardClientLayout>
        </>
    );
};

export default DashboardLayout;

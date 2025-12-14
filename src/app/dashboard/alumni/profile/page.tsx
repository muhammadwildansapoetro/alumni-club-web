"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function ProfilePage() {
    const { user } = useAuthStore();

    return (
        <div>
            <h1>{user?.profile?.fullName}</h1>
            <p>{user?.email}</p>
            <p>{user?.profile?.department}</p>
            <p>{user?.profile?.classYear}</p>
            <p>{user?.profile?.jobTitle ?? "-"}</p>
            <p>{user?.profile?.companyName ?? "-"}</p>
            <p>{user?.profile?.employmentLevel ?? "-"}</p>
            <p>{user?.profile?.industry ?? "-"}</p>
        </div>
    );
}

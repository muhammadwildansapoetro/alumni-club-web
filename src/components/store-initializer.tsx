"use client";

import { useAuthStore } from "@/stores/auth.store";
import { User } from "@/types/user";
import { useRef } from "react";

export default function StoreInitializer({ user }: { user: User }) {
    const initialized = useRef(false);

    if (!initialized.current) {
        useAuthStore.setState({ user });
        initialized.current = true;
    }

    return null;
}

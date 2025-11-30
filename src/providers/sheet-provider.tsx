"use client";

import { startTransition, useEffect, useState } from "react";
export const SheetProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        startTransition(() => {
            setIsMounted(true);
        });
    }, []);

    if (!isMounted) {
        return null;
    }

    return <></>;
};

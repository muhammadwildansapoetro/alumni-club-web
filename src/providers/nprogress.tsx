// In /app/providers.tsx
"use client";

import { ProgressProvider } from "@bprogress/next/app";

const NextProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProgressProvider height="4px" color="#075d26" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressProvider>
    );
};

export default NextProgressProviders;

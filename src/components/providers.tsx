"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { SearchParamsProvider } from "@/components/search-params-provider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <SearchParamsProvider>{children}</SearchParamsProvider>
        </GoogleOAuthProvider>
    );
}

"use client";

import { createContext, useContext, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loading } from "@/components/ui/loading";

interface SearchParamsContextType {
    searchParams: URLSearchParams | null;
}

const SearchParamsContext = createContext<SearchParamsContextType>({
    searchParams: null,
});

export function useSearchParamsSafe() {
    const context = useContext(SearchParamsContext);
    return context.searchParams || new URLSearchParams();
}

export function SearchParamsProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Suspense fallback={<Loading size="md" />}>
            <SearchParamsWrapper>
                {children}
            </SearchParamsWrapper>
        </Suspense>
    );
}

function SearchParamsWrapper({
    children
}: {
    children: React.ReactNode
}) {
    const searchParams = useSearchParams();

    return (
        <SearchParamsContext.Provider value={{ searchParams }}>
            {children}
        </SearchParamsContext.Provider>
    );
}
"use client";

import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from 'use-debounce';

import { SearchIcon } from "lucide-react";

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    fetchData?: (keyword: string) => Promise<string[]>; // async fetch
    onSearch?: (value: string) => void;
    debounceMs?: number;
    inputClassName?: string;
    containerClassName?: string;
    variant?: "default" | "dashboard";
}

export default function SearchInput({
    placeholder = "Cari Alumni",
    value: controlledValue,
    onChange,
    onSelect,
    fetchData,
    onSearch,
    debounceMs = 300,
    inputClassName,
    containerClassName,
    variant = "default",
}: SearchInputProps) {
    const [internalValue, setInternalValue] = useState(controlledValue || "");

    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const isControlled = controlledValue !== undefined;

    const debouncedSearch = useDebouncedCallback(
        (searchValue: string) => {
            onSearch?.(searchValue);
        },
        debounceMs
    );

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isControlled) {
            onChange?.(newValue);
        } else {
            setInternalValue(newValue);
        }

        // Trigger debounced search
        debouncedSearch(newValue);

        // For backward compatibility with fetchData
        if (fetchData) {
            fetchData(newValue);
        }
    }, [isControlled, onChange, debouncedSearch, fetchData]);

    // Cleanup debounced callback on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const isDashboard = variant === "dashboard";

    return (
        <div className={`relative w-full ${isDashboard ? "" : "lg:w-64"} ${containerClassName || ""}`}>
            <SearchIcon className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 ${isDashboard ? "text-muted-foreground left-3" : "left-2"}`} />
            <Input
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={() => onSelect?.(value)}
                className={isDashboard ? `bg-background w-full pl-9 ${inputClassName || ""}` : `rounded-full border-black/50 pl-8 ${inputClassName || ""}`}
            />
        </div>
    );
}

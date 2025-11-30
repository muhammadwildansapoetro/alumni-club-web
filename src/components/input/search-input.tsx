"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

import { SearchIcon } from "lucide-react";

interface SearchInputProps {
    placeholder?: string;
    onSelect?: (value: string) => void;
    fetchData?: (keyword: string) => Promise<string[]>; // async fetch
    inputClassName?: string;
}

export default function SearchInput({ placeholder = "Cari Alumni" }: SearchInputProps) {
    const [keyword, setKeyword] = useState("");

    const handleChange = async (value: string) => {
        setKeyword(value);
    };

    return (
        <div className="relative w-full lg:w-64">
            <SearchIcon className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
            <Input
                value={keyword}
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => keyword}
                className="rounded-full border-black/50 pl-8"
            />
        </div>
    );
}

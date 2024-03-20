"use client";

import type { KeyboardEvent } from "react";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

const SearchBar = (p: { query: string }) => {
    const router = useRouter();
    const ref = useRef<HTMLInputElement | null>(null);

    const [query, setQuery] = useState<string>(p.query);
    const [isSearching, startTransition] = useTransition();

    const handleSearch = () => {
        startTransition(() => {
            router.push(`/search?q=${query}`);
        });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Escape":
                ref.current?.blur();
                break;
            case "Enter":
                handleSearch();
                break;
        }
    };

    return (
        <div className="relative w-full h-14 flex flex-col bg-white dark:bg-black">
            <div className="relative h-14 z-10 rounded-md">
                <Input
                    ref={ref}
                    value={query}
                    disabled={isSearching}
                    onKeyDown={handleKeyDown}
                    className="absolute inset-0 h-full"
                    onChange={e => setQuery(e.target.value)}
                />
                <Button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="absolute right-0 inset-y-0 h-full rounded-l-none"
                >
                    {isSearching ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                        <Search className="h-6 w-6" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;

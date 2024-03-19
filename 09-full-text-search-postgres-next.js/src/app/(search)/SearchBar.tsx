"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRef } from "react";

const SearchBar = () => {
    const ref = useRef<HTMLInputElement | null>(null);

    return (
        <div className="relative w-full h-14 flex flex-col bg-white dark:bg-black">
            <div className="relative h-14 z-10 rounded-md">
                <Input
                    ref={ref}
                    className="absolute inset-0 h-full"
                    onKeyDown={e => e.key === "Escape" && ref.current?.blur()}
                />
                <Button className="absolute right-0 inset-y-0 h-full rounded-l-none">
                    <Search className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const imageUrl =
    "https://raw.githubusercontent.com/joschan21/magicsearch/master/public/dark_down_jacket_1.png";

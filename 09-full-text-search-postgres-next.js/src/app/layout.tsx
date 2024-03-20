import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Magic Search - Full-text Search with Postgres, Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" className="">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

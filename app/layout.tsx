'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./src/components/navbar";
import Footer from "./src/components/footer";
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const queryClient = new QueryClient();
export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
        >
        <Navbar />
        <main className="flex-grow container mx-auto px-4  pt-20">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </main>
        <Footer />
        </body>
        </html>
    );
}

'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../src/components/navbar";
import Footer from "../src/components/footer";
// @ts-ignore
import "../globals.css";
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
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer:wght@100..900&family=Noto+Serif+Khmer:wght@100..900&display=swap"
                rel="stylesheet"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gray-50`}
        >
        <Navbar/>
        <main className="grow container mx-auto px-3 md:px-4  pt-20">
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </main>
        <Footer />
        </body>
        </html>
    );
}

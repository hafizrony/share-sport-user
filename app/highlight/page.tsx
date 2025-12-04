"use client";
import React, { useState, useMemo } from 'react';
import { Highlight } from "@/app/src/interface/highlight.interface";
import { Banner } from "@/app/src/interface/banner.interface";
import { useHighlight } from "@/app/src/hook/useHighlight";
import { useBanner } from "@/app/src/hook/useBanner";
import HighlightStandardCard from "@/app/src/components/highlightStandardCard";
import Loader from "@/app/src/components/loader";
import AdBanner from "@/app/src/components/adsBanner";
import { Search } from "lucide-react";

export default function HighlightPage() {

    const { data: highlights, isLoading: isHighlightLoading, isError: isHighlightError } = useHighlight();
    const { data: banners, isLoading: isBannerLoading, isError: isBannerError } = useBanner();

    // State for the search query
    const [searchQuery, setSearchQuery] = useState("");

    const highlightArray: Highlight[] = Array.isArray(highlights) ? highlights : (highlights?.data || []);

    // Filter highlights based on the search query (title)
    const filteredHighlights = useMemo(() => {
        if (!searchQuery.trim()) return highlightArray;
        return highlightArray.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [highlightArray, searchQuery]);

    const sidebarBanners = useMemo(() => {
        return (banners || []).filter((banner: Banner) => {
            if (banner.position !== "sidebar") return false;

            const now = new Date();
            const start = new Date(banner.start_at);
            const end = new Date(banner.end_at);

            return now >= start && now <= end;
        });
    }, [banners]);

    if (isHighlightLoading || isBannerLoading) return <Loader />;
    if (isHighlightError || isBannerError) return <div>Error</div>;

    const showSidebar = sidebarBanners.length > 0;

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">

            <div className="max-w-7xl mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className={showSidebar ? "lg:col-span-8" : "lg:col-span-12"}>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div className="bg-[#4c3b71] text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 w-fit shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                HIGHLIGHTS
                            </div>

                            {/* Search Bar Input */}
                            <div className="relative w-full sm:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-[#4c3b71] focus:ring-1 focus:ring-[#4c3b71] sm:text-sm transition duration-150 ease-in-out shadow-sm"
                                    placeholder="Search by title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Render Filtered Highlights */}
                        <div className={showSidebar ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "grid grid-cols-1 sm:grid-cols-3 gap-6"}>
                            {filteredHighlights.length > 0 ? (
                                filteredHighlights.map((item: Highlight) => {
                                    return (
                                        <div key={item.id} className="h-full">
                                            <HighlightStandardCard
                                                id={item.id}
                                                title={item.title}
                                                thumbnail_url={item.thumbnail_url}
                                                slug={item.slug}
                                                video_url={item.video_url}
                                                category={{
                                                    slug: item.category?.slug,
                                                    name: item.category?.name,
                                                }}
                                                views_count={item.views_count}
                                                published_at={item.published_at}
                                                summary={item.summary}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-10 text-center text-gray-500">
                                    No highlights found matching ${searchQuery}.
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {sidebarBanners.map((item: Banner) => {
                            return (
                                <div key={item.id}>
                                    <AdBanner
                                        image_url={item.image_url}
                                        title={item.title}
                                        link_url={item.link_url}
                                        id={item.id}
                                        position={item.position}
                                        start_at={item.start_at}
                                        end_at={item.end_at}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
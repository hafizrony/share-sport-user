"use client";
import React, { useState, useMemo } from 'react';
import { Highlight } from "@/app/src/interface/highlight.interface";
import { Banner } from "@/app/src/interface/banner.interface";
import { Category } from "@/app/src/interface/category.interface";
import { useHighlight } from "@/app/src/hook/useHighlight";
import { useBanner } from "@/app/src/hook/useBanner";
import HighlightStandardCard from "@/app/src/components/highlightStandardCard";
import Loader from "@/app/src/components/loader";
import AdBanner from "@/app/src/components/adsBanner";
import { Search, ChevronRight } from "lucide-react";
import { useCategories } from "@/app/src/hook/useCategories";

export default function HighlightPage() {

    const { data: highlights, isLoading: isHighlightLoading, isError: isHighlightError } = useHighlight();
    const { data: banners, isLoading: isBannerLoading, isError: isBannerError } = useBanner();
    const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredHighlights = useMemo(() => {
        let highlightArray: Highlight[] =
            Array.isArray(highlights) ? highlights : (highlights?.data || []);

        if (searchQuery.trim()) {
            highlightArray = highlightArray.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())||
                item.summary?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== "all") {
            highlightArray = highlightArray.filter((item) =>
                item.category?.slug === selectedCategory
            );
        }

        return highlightArray;
    }, [highlights, searchQuery, selectedCategory]);

    const sidebarBanners = useMemo(() => {
        return (banners || []).filter((banner: Banner) => {
            if (banner.position !== "sidebar") return false;
            const now = new Date();
            const start = new Date(banner.start_at);
            const end = new Date(banner.end_at);
            return now >= start && now <= end;
        });
    }, [banners]);

    if (isHighlightLoading || isBannerLoading || isCategoriesLoading) return <Loader />;
    if (isHighlightError || isBannerError || isCategoriesError) return <div>Error</div>;

    const showRightSidebar = sidebarBanners.length > 0;

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
            <div className="w-full py-8 flex flex-col lg:flex-row gap-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">

                    {/* --- LEFT SIDEBAR: CATEGORIES (Desktop Only) --- */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                            <h3 className="font-bold text-lg mb-4 text-[#4c3b71]">Categories</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => setSelectedCategory("all")}
                                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                                            selectedCategory === "all"
                                                ? "bg-[#4c3b71] text-white"
                                                : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        All Sports
                                        {selectedCategory === "all" && <ChevronRight size={14} />}
                                    </button>
                                </li>
                                {categories?.map((cat: Category) => (
                                    <li key={cat.id || cat.slug}>
                                        <button
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                                                selectedCategory === cat.slug
                                                    ? "bg-[#4c3b71] text-white"
                                                    : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {cat.name}
                                            {selectedCategory === cat.slug && <ChevronRight size={14} />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* --- CENTER: HIGHLIGHTS --- */}
                    <div className={showRightSidebar ? "lg:col-span-8" : "lg:col-span-10"}>

                        {/* === MOBILE HEADER (Custom 2-Row Layout) === */}
                        <div className="lg:hidden mb-6 flex flex-col gap-4">

                            {/* Row 1: Title (Left) + Search (Right) */}
                            <div className="flex items-center gap-3">
                                {/* Title Badge */}
                                <div className="bg-[#4c3b71] text-white px-3 py-2 rounded-md text-xs font-bold flex items-center gap-1 shrink-0 shadow-sm whitespace-nowrap">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{selectedCategory === 'all' ? 'HIGHLIGHTS' : selectedCategory.toUpperCase()}</span>
                                </div>

                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-[#4c3b71] focus:ring-1 focus:ring-[#4c3b71] text-sm shadow-sm"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Row 2: Horizontal Categories Scroll List */}
                            <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                        selectedCategory === "all"
                                            ? "bg-[#4c3b71] text-white border-[#4c3b71]"
                                            : "bg-white text-gray-600 border-gray-200"
                                    }`}
                                >
                                    All
                                </button>
                                {categories?.map((cat: Category) => (
                                    <button
                                        key={cat.id || cat.slug}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                            selectedCategory === cat.slug
                                                ? "bg-[#4c3b71] text-white border-[#4c3b71]"
                                                : "bg-white text-gray-600 border-gray-200"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* === DESKTOP HEADER (Hidden on Mobile) === */}
                        <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div className="bg-[#4c3b71] text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 w-fit shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {selectedCategory === 'all' ? 'ALL HIGHLIGHTS' : selectedCategory.toUpperCase()}
                            </div>

                            <div className="relative w-full sm:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-[#4c3b71] focus:ring-1 focus:ring-[#4c3b71] sm:text-sm shadow-sm"
                                    placeholder="Search by title..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className={showRightSidebar ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"}>
                            {filteredHighlights.length > 0 ? (
                                filteredHighlights.map((item: Highlight) => (
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
                                ))
                            ) : (
                                <div className="col-span-full py-10 text-center text-gray-500">
                                    No highlights found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT SIDEBAR: BANNERS (Span 2) --- */}
                    {showRightSidebar && (
                        <div className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-4 space-y-4">
                                {sidebarBanners.map((item: Banner) => (
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
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
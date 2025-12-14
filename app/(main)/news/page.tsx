"use client";
import React, { useState, useMemo } from 'react';
import { News } from "@/app/src/interface/news.interface";
import { Banner } from "@/app/src/interface/banner.interface";
import { Category } from "@/app/src/interface/category.interface";
import { useNews } from "@/app/src/hook/useNews";
import { useSidebarBanners } from "@/app/src/hook/useBanner";
import { useCategories } from "@/app/src/hook/useCategories";
import Loader from "@/app/src/components/loader";
import AdBanner from "@/app/src/components/adsBanner";
import NewsStandardCard from "@/app/src/components/newsStandardCard";
import { Search, ChevronRight, Newspaper, Clock, Eye, TrendingUp, RefreshCcw } from "lucide-react";
import Link from "next/link";
import {ENDPOINTS} from "@/app/src/utils/endpoints";

export default function NewsPage() {

    const { data: newsList, isLoading: isNewsLoading, isError: isNewsError } = useNews();
    const { sidebarBanners: sidebarBanners, isLoading: isBannerLoading, isError: isBannerError } = useSidebarBanners();
    const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategories();


    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(6);


    const filteredNews = useMemo(() => {
        let newsArray: News[] = Array.isArray(newsList) ? newsList : (newsList?.data || []);


        if (searchQuery.trim()) {
            newsArray = newsArray.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.summary?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }


        if (selectedCategory !== "all") {
            newsArray = newsArray.filter((item) =>
                item.category?.slug === selectedCategory
            );
        }

        return newsArray;
    }, [newsList, searchQuery, selectedCategory]);


    const trendingNews = useMemo(() => {
        const newsArray: News[] = Array.isArray(newsList) ? newsList : (newsList?.data || []);
        return [...newsArray]
            .sort((a, b) => (b.views_count || 0) - (a.views_count || 0))
            .slice(0, 3);
    }, [newsList]);


    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatViews = (num: number) => {
        if (!num) return "0";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toString();
    };

    if (isNewsLoading || isBannerLoading || isCategoriesLoading) return <Loader />;
    if (isNewsError || isBannerError || isCategoriesError) return <div className="w-full h-[200px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 flex items-center justify-center text-red-500">Error</div>;

    const showRightSidebar = sidebarBanners.length > 0;


    const heroNews = filteredNews.length > 0 ? filteredNews[0]:null;
    const standardNews = filteredNews.length > 1 ? filteredNews.slice(1, visibleCount) : [];
    const hasMore = filteredNews.length > visibleCount;

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800">
            <div className="w-full py-8 flex flex-col lg:flex-row gap-6">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">

                    {/* --- LEFT SIDEBAR: CATEGORIES (Original Style) --- */}
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
                                        All News
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

                    {/* --- CENTER: NEWS CONTENT --- */}
                    <div className={showRightSidebar ? "lg:col-span-8" : "lg:col-span-10"}>

                        {/* Mobile Header (Original) */}
                        <div className="lg:hidden mb-4 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#4c3b71] text-white px-3 py-2 rounded-md text-xs font-bold flex items-center gap-1 shrink-0 shadow-sm whitespace-nowrap">
                                    <Newspaper className="h-3 w-3" />
                                    <span>{selectedCategory === 'all' ? 'NEWS' : selectedCategory.toUpperCase()}</span>
                                </div>
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-[#4c3b71] focus:ring-1 focus:ring-[#4c3b71] text-sm shadow-sm"
                                        placeholder="Search news..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
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

                        {/* Desktop Header (Original) */}
                        <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                            <div className="bg-[#4c3b71] text-white px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 w-fit shadow-sm">
                                <Newspaper className="h-4 w-4" />
                                {selectedCategory === 'all' ? 'ALL NEWS' : selectedCategory.toUpperCase()}
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

                        {/* === CONTENT AREA === */}
                        <div className="flex flex-col gap-6">

                            {filteredNews.length === 0 ? (
                                <div className="col-span-full py-10 text-center text-gray-500">
                                    No news articles found.
                                </div>
                            ) : (
                                <>
                                    {/* 1. BIG FEATURED NEWS (Hero) */}
                                    {heroNews && (
                                        <Link className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
                                              href={`/news/${heroNews.slug}`}
                                        >
                                            <div className="relative h-64 md:h-96 w-full overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`${ENDPOINTS.IMAGES}${heroNews.thumbnail_url}` || "/placeholder.jpg"}
                                                    alt={heroNews.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-[#4c3b71] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                                        Featured Story
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                                                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider mb-2 opacity-90">
                                                        <span className="bg-white/20 px-2 py-0.5 rounded text-white backdrop-blur-sm">
                                                            {heroNews.category?.name || 'News'}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} /> {formatDate(heroNews.published_at)}
                                                        </span>
                                                    </div>
                                                    <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight line-clamp-2">
                                                        {heroNews.title}
                                                    </h1>
                                                    <p className="hidden md:block text-gray-200 text-sm line-clamp-2 mb-4 max-w-2xl">
                                                        {heroNews.summary}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-gray-300">
                                                        <span className="flex items-center gap-1"><Eye size={14}/> {formatViews(heroNews.views_count)} views</span>
                                                        <span className="flex items-center gap-1 text-white underline decoration-[#4c3b71] decoration-2 underline-offset-4">Read Full Article <ChevronRight size={14}/></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}

                                    {/* 2. STANDARD LIST (Using your original Component) */}
                                    <div className="flex flex-col gap-4">
                                        {standardNews.map((item: News) => (
                                            <div key={item.id} className="h-full">
                                                <NewsStandardCard
                                                    id={item.id}
                                                    title={item.title}
                                                    thumbnail_url={item.thumbnail_url}
                                                    slug={item.slug}
                                                    category={{
                                                        slug: item.category?.slug,
                                                        name: item.category?.name,
                                                    }}
                                                    views_count={item.views_count}
                                                    published_at={item.published_at}
                                                    summary={item.summary}
                                                    content={item.content}
                                                    image_url={item.image_url}
                                                    author={{
                                                        name: item.author.name
                                                    }}
                                                    tags={{
                                                        name:item.tags.name,
                                                        slug:item.tags.slug
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* 3. LOAD MORE BUTTON */}
                                    {hasMore && (
                                        <div className="flex justify-center pt-4 pb-8">
                                            <button
                                                onClick={() => setVisibleCount(prev => prev + 5)}
                                                className="bg-white border border-gray-300 text-gray-600 px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 hover:border-[#4c3b71] hover:text-[#4c3b71] transition-all shadow-sm flex items-center gap-2 group"
                                            >
                                                <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500"/>
                                                Load More Articles
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT SIDEBAR: BANNERS & TRENDING --- */}
                    {showRightSidebar && (
                        <div className="hidden lg:block lg:col-span-2">
                            <div className="sticky top-4 space-y-6">
                                {trendingNews.length > 0 && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                                            <TrendingUp size={18} className="text-[#4c3b71]" />
                                            <h3 className="font-bold text-[#4c3b71] text-sm">Trending Now</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {trendingNews.map((item, index) => (
                                                <Link href={`/news/${item.slug}`}
                                                      key={item.id}
                                                >
                                                    <li className="group cursor-pointer">
                                                        <div className="flex gap-3 items-start">
                                                            <span className="text-2xl font-black text-gray-200 group-hover:text-[#4c3b71] transition-colors leading-none -mt-1">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                            <div>
                                                                <h4 className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#4c3b71] transition-colors line-clamp-2">
                                                                    {item.title}
                                                                </h4>
                                                                <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                                                    <Clock size={10} /> {formatDate(item.published_at)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="space-y-4">
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
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
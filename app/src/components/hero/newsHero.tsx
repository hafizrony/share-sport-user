"use client";

import Image from "next/image";
import Link from "next/link";
import {AgoTime} from "../../utils/agoTime";
import {useNews} from "@/app/src/hook/useNews";
import NewsHeroSkeleton from "@/app/src/components/skeleton/newsSkeleton";
import {ENDPOINTS} from "@/app/src/utils/endpoints";
export default function NewsHero({ is_featured, is_breaking }:{ is_featured: boolean ,is_breaking: boolean }) {
    const { data: news, isLoading, isError, error } = useNews();
    const newsArray = Array.isArray(news) ? news : (news?.data || []);
    const filteredNews = newsArray.filter((item:{is_featured:boolean,is_breaking:boolean}) => {
        if (is_featured) {
            return item.is_featured;
        }
        if (is_breaking) {
            return item.is_breaking;
        }
        return false;
    }) || [];
    if (isError) return <div className="w-full h-[200px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 flex items-center justify-center text-red-500">Error : {error.message}</div>;

    const mainStory = filteredNews[0];
    const subStories = filteredNews.slice(1, 5);
    return (
        <section className="w-full my-4 md:my-8">
            <div className="flex justify-between items-center mb-4">
                <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    FUTURE NEWS
                </div>
                <Link href="/news" className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1">
                    More News
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            {!isLoading?<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[700px]">
                <Link
                    href={`/news/${mainStory.slug}`}
                    className="relative w-full h-64 lg:h-full rounded-xl overflow-hidden shadow-sm group block"
                >
                    <Image
                        src={`${ENDPOINTS.IMAGES}${mainStory.thumbnail_url}`}
                        alt={mainStory.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="eager"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                            <span className="bg-white/20 backdrop-blur-md tracking-wider border border-white/10 shadow-sm text-xs font-bold px-2 py-1 rounded mb-3 inline-block ">
                              {mainStory.category.name}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2 group-hover:text-yellow-500 transition-colors line-clamp-2">
                            {mainStory.title}
                            </h2>
                            <p className="text-gray-300 text-xs mt-1 opacity-90">
                            {new Date(mainStory.published_at).toLocaleDateString()}
                            </p>
                        </div>
                </Link>

                {/* RIGHT: 4 SMALL STORIES (List Layout) */}
                <div className="flex flex-col gap-3 h-full">
                    {subStories.map((item:{id:number,slug:string,title:string,thumbnail_url:string,summary:string,category:{name:string},published_at:string}) => (
                        <Link
                            key={item.id}
                            href={`/news/${item.slug}`}
                            className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md hover:border-purple-100-100 hover:-translate-y-1 transition-all duration-300 group h-full items-center"
                        >
                            {/* Thumbnail Image with Ring Effect */}
                            <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100 group-hover:border-purple-400-200 transition">
                                <Image
                                    src={`${ENDPOINTS.IMAGES}${item.thumbnail_url}`}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading="eager"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="flex flex-col flex-grow py-2 justify-between">
                                <h3 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 mb-1">
                                    {item.title}
                                </h3>
                                <h3 className="text-sm text-gray-500 leading-snug line-clamp-2 mb-1">
                                    {item.summary}
                                </h3>
                                <div className="flex items-center justify-between w-full mb-1 pt-2">
                                    <span className="text-[10px] font-black tracking-wider text-[#4c3b71] uppercase bg-white/20 backdrop-blur-md border border-white/10 shadow-sm px-2 py-0.5 rounded-full">
                                      {item.category.name}
                                    </span>
                                    <div className="flex items-end gap-1 text-[10px] text-gray-500 font-medium w-auto">
                                        {AgoTime(item.published_at)}
                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>:<NewsHeroSkeleton/>}
            
        </section>
    );
}
"use client";
import Link from "next/link";
import HighlightCard from "@/app/src/components/highlightCard";
import {useHighlight} from "@/app/src/hook/useHighlight";
import {Highlight} from "@/app/src/interface/highlight.interface";

export default function HighlightHero() {
    const {data:highlights, isLoading, isError} = useHighlight();
    if(isLoading) return null;
    if(isError) return <div>Error</div>;
    const highlightArray = Array.isArray(highlights) ? highlights : (highlights?.data || []);
    return (
        <section className="w-full my-8">
            <div className="flex justify-between items-center mb-4">
                <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    HIGHLIGHTS
                </div>

                <Link href="/highlight" className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1">
                    More Highlights
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4
                auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[350px]">

                {highlightArray.slice(0, 6).map((video:Highlight, index:string|number) => (
                    <HighlightCard
                        key={index}
                        hidePlayButton={true}
                        largeText={false}
                        Highlight={{
                            id: video.id,
                            title: video.title,
                            thumbnail_url: video.thumbnail_url,
                            video_url: video.video_url,
                            published_at: video.published_at,
                            views_count: video.views_count,
                            slug: video.slug,
                            category: video.category,
                            summary: video.summary,


                        }}
                    />
                ))}

            </div>
        </section>
    );
}
"use client";

import React,{useEffect} from "react";
import { Calendar, Eye, Clock } from "lucide-react";
import ReactPlayer from "react-player";
import { useHighlightBySlug } from "../../../src/hook/useHighlightBySlug";
import Link from "next/link";
import { useParams } from "next/navigation";
import {ENDPOINTS} from "@/app/src/utils/endpoints";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Loader from "@/app/src/components/loader";
import AdBanner from "@/app/src/components/adsBanner";
import {useSidebarBanners} from "@/app/src/hook/useBanner";
import { Banner } from "@/app/src/interface/banner.interface";

const formatDate = (dateString: string) =>
    dateString ? new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

const formatViews = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
};
export default function VideoDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const { data: video, isLoading, isError } = useHighlightBySlug(slug);
    const {sidebarBanners:sidebarBanners,isLoading:isBannerLoading,isError:isBannerError}=useSidebarBanners();
    useEffect(() => {
        if (video) {
            document.title = `${video.title} - Share Sport`;
        }
        if (video?.id) {
            const countView = async () => {
                try {
                    const url = `${ENDPOINTS.VIEW_HIGHLIGHT}/${video.id}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error("Error counting view:", error);
                }
            };

            countView();
        }
    }, [video]);

    if (isLoading||isBannerLoading) {
        return <Loader/>;
    }

    if (isError || !video) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">Video not found</h2>
                    <Link href="/highlights" className="text-blue-500 hover:underline mt-2 block">
                        Back to Highlights
                    </Link>
                </div>
            </div>
        );
    }

    const videoSrc = video.video_url.startsWith('http')
        ? video.video_url
        : `${ENDPOINTS.IMAGES}${video.video_url}`;
    const showRightSidebar = sidebarBanners.length > 0;
    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-2">
        <main 
            className={
            showRightSidebar 
                ? "lg:col-span-9 max-w-5xl py-2 md:py-4" 
                : "lg:col-span-12 max-w-5xl py-2 md:py-4"
            }
        >
            <div className="relative aspect-video overflow-hidden shadow-xl">
            <ReactPlayer
                src={videoSrc}
                controls
                width="100%"
                height="100%"
            />
            </div>

            <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
                {video.category?.name && (
                <span className="bg-[#483D67] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {video.category.name}
                </span>
                )}
                <span className="text-slate-500 text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {video.published_at ? formatDate(video.published_at) : "Recent"}
                </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                {video.title || "Untitled Video"}
            </h1>

            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-slate-400" /> 
                    {formatViews(video.views_count || 0)} views
                </span>
                <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-slate-400" /> 
                    {video.published_at ? formatDate(video.published_at) : "N/A"}
                </span>
                </div>
            </div>
            </div>

            <div className="pt-10">
            <div className="flex items-start gap-4">
                <div className="flex-1">
                {video.summary && (
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {video.summary}
                    </p>
                )}
                <article className="prose prose-lg max-w-none prose-slate">
                    <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    >
                    {video.content || ""}
                    </ReactMarkdown>
                </article>
                </div>
            </div>
            </div>
        </main>

        {showRightSidebar && (
            <div className="hidden lg:block lg:col-span-3 border-l border-slate-100 md:py-4">
            <div className="sticky top-4 space-y-6">
                <div className="space-y-4">
                {sidebarBanners?.map((item: Banner) => (
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
    );
}
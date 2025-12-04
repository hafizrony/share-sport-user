"use client";

import React,{useEffect} from "react";
import { Calendar, Eye, Clock, Share2, MoreHorizontal, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react";
import ReactPlayer from "react-player";
import { useHighlightBySlug } from "../../src/hook/useHighlightBySlug";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {ENDPOINTS} from "@/app/src/utils/endpoints";

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
    useEffect(() => {
        // Only run if we have the video data and a valid ID
        if (video?.id) {
            const countView = async () => {
                try {
                    // Construct the URL using the ID: API + / + id + /view (Adjust path as needed)
                    const url = `${ENDPOINTS.VIEW_HIGHLIGHT}/${video.id}`;
                    console.log("video", url);
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
            </div>
        );
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
        : `https://pub-64a1f52f8ce34898ad37705d90a1d23b.r2.dev/${video.video_url}`;

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pb-12">
            <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
                <div className="relative aspect-video bg-black overflow-hidden shadow-xl">
                    <ReactPlayer
                        src={videoSrc}
                        controls
                        width="100%"
                        height="100%"
                    />
                </div>

                <div className="mt-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        {video.category && (
                            <span className="bg-[#483D67] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {video.category.name}
                            </span>
                        )}
                        <span className="text-slate-500 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDate(video.published_at)}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
                        {video.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                        <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-slate-400" /> {formatViews(video.views_count)} views
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-slate-400" /> {formatDate(video.published_at)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-10">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                                <p>{video.summary}</p>
                                {video.content && <p>{video.content}</p>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
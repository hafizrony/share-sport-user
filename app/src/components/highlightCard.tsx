"use client";
import React, { useRef, useState } from "react";
import { Eye, Calendar, PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {AgoTime} from "@/app/src/utils/agoTime";
import {Highlight} from "@/app/src/interface/highlight.interface"
import {ENDPOINTS} from "@/app/src/utils/endpoints";
interface HighlightCardProps {
    Highlight: Highlight;
    hidePlayButton?: boolean;
    largeText?: boolean;
}

const HighlightCard: React.FC<HighlightCardProps> = ({largeText = false, hidePlayButton = false,Highlight}) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const formatViews = (num?: number) => {
        if (!num) return "0";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toString();
    };

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-slate-900`}
            onMouseEnter={() => {
                setIsHovered(true);
                videoRef.current?.play();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                videoRef.current?.pause();
                videoRef.current!.currentTime = 0;
            }}
            onClick={() => router.push(`/highlight/${Highlight.slug}`)}
        >
            {/* Video */}
            <video
                ref={videoRef}
                src={`${ENDPOINTS.IMAGES}${Highlight.video_url}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                muted
                loop
                playsInline
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

            {/* Play Icon Overlay */}
            {!hidePlayButton && (
                <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                        isHovered ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="rounded-full p-3 ">
                        <PlayCircle className=" text-white" size={48} />
                    </div>
                </div>
            )}

            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-10">
                <div>
                    <h3
                        className={`font-bold text-white leading-tight mb-2 ${
                            largeText ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                        } group-hover:text-slate-200 transition-colors`}
                    >
                        {Highlight.title}
                    </h3>
                        {/*<p className= w-full text-slate-300 text-sm mb-4 line-clamp-2 hidden sm:block>{Highlight.summary}</p>*/}
                    <div className="flex items-center gap-3 text-slate-300 text-xs font-medium">
                        <span className="flex items-center gap-1.5" title={`${Highlight.views_count} views`}>
                            <Eye className="w-3 h-3" /> {formatViews(Highlight.views_count)}
                        </span>

                        <span className="w-1 h-1 rounded-full bg-slate-500"></span>

                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" /> {AgoTime(Highlight.published_at)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HighlightCard;

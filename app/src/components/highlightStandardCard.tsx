import React, {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {PlayCircle} from "lucide-react";
import {AgoTime} from "@/app/src/utils/agoTime";
import {Highlight} from "@/app/src/interface/highlight.interface";

const HighlightStandardCard: React.FC<Highlight> = (video:Highlight) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
             onMouseEnter={() => {
                 setIsHovered(true);
                 const playPromise = videoRef.current?.play();
                 if (playPromise !== undefined) {
                     playPromise.catch((error) => {

                     });
                 }
             }}

             onMouseLeave={() => {
                 setIsHovered(false);
                 if (videoRef.current) {
                     videoRef.current.pause();
                     videoRef.current.currentTime = 0;
                 }
             }}
             onClick={() => router.push(`/highlight/${video.slug}`)}
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video flex-shrink-0 overflow-hidden">
                <video
                    ref={videoRef}
                    src={`https://pub-64a1f52f8ce34898ad37705d90a1d23b.r2.dev/${video.video_url}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 flex items-center justify-center transition-all opacity-100 group-hover:opacity-0">
                    <PlayCircle className="text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" size={48} />
                </div>
                {/* Category Badge */}
                <span className="absolute bottom-2 left-2 bg-gray-100 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
                        {video.category?.name}
                    </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-[#4c3b71] transition-colors mb-2">
                        {video.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                        {video.summary}
                    </p>
                </div>

                <div className="flex items-center justify-end text-xs text-gray-400">
                    <span>{AgoTime(video.published_at)}</span>
                </div>
            </div>
        </div>
    )};
export default HighlightStandardCard;
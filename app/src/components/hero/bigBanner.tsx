"use client";

import { useState, useEffect } from "react";
import {useBanner} from "@/app/src/hook/useBanner";
import {Banner} from "@/app/src/interface/banner.interface"
import Image from "next/image";
import {ENDPOINTS} from "@/app/src/utils/endpoints";

export default function BigBanner() {
    const [current, setCurrent] = useState(0);
    const { data: ads, isLoading, isError, error} = useBanner();
    const adsFilter = ads?.filter((banner: Banner) => {
        if (banner.position !== "header") return false;
        const now = new Date();
        const start = new Date(banner.start_at);
        const end = new Date(banner.end_at);
        return now >= start && now <= end;
    });

    useEffect(() => {

        if (!adsFilter || adsFilter.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % adsFilter.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [adsFilter]);

    if (isLoading) return <div className="w-full animate-pulse h-[200px] md:h-[400px] bg-gray-300 rounded-xl  my-6"></div>;

    if (isError) return <div className="w-full h-[200px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 flex items-center justify-center text-red-500">Error : {error.message}</div>;

    if (!ads || ads.length === 0) return null;

    return (
        <div className="relative w-full h-55 md:h-auto md:max-h-120 md:aspect-video overflow-hidden rounded-xl shadow-lg my-6 group bg-gray-50">
            {adsFilter.map((ad: { id: number; link_url: string | undefined; image_url: string; title: string; }, index: number) => (
                <a
                    key={ad.id || index}
                    href={ad.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out block ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <Image
                    src={`${ENDPOINTS.IMAGES}${ad.image_url}`}
                    alt={ad.title}
                    fill
                    loading="eager"
                    className="object-cover object-center"
                    >
                    </Image>
                </a>
            ))}

            {/*{ads.length > 1 && (*/}
            {/*    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">*/}
            {/*        {ads.map((_, idx) => (*/}
            {/*            <button*/}
            {/*                key={idx}*/}
            {/*                onClick={() => setCurrent(idx)}*/}
            {/*                className={`w-3 h-3 rounded-full transition-colors duration-300 ${*/}
            {/*                    current === idx ? "bg-white scale-110 shadow-md" : "bg-white/50 hover:bg-white/80"*/}
            {/*                }`}*/}
            {/*                aria-label={`Go to slide ${idx + 1}`}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}
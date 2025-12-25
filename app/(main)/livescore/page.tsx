"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Loader from "@/app/src/components/loader";
import AdBanner from "@/app/src/components/adsBanner";
import { useLiveScore } from "./hook/useLiveScore";
import { useSidebarBanners } from "@/app/src/hook/useBanner";
import DateSelector from './components/DateSelector';
import MatchList from './components/MatchList';
import { Banner } from "@/app/src/interface/banner.interface";
import { getFormattedToday, getMatchDetailUrl } from "./helper/livescoreHelper"; 
import MatchListSkeleton from "./components/SkeletonLoading";

export default function LivescorePage() {
    const router = useRouter(); 
    const [activeDate, setActiveDate] = useState(getFormattedToday());
    const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
    const { data: liveData, loading: isMatchLoading, error } = useLiveScore(activeDate);
    const { sidebarBanners, isLoading: isBannerLoading } = useSidebarBanners();
    if (error) return <div className="text-center py-10 text-red-500">Error loading scores.</div>;
    const showRightSidebar = isBannerLoading || (sidebarBanners && sidebarBanners.length > 0);
    const handleMatchClick = (id: string) => {
        const url = getMatchDetailUrl(liveData, id);
        if (url) {
            router.push(url);
        }
    };
    return (
        <>
        <header><title>Live Score - Share Sport</title></header>
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 relative">
            <div className="w-full py-2 md:py-8 container mx-auto md:px-4 max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                    <div className={`flex flex-col gap-4 ${showRightSidebar ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}`}>
                        <DateSelector
                            activeDate={activeDate}
                            onDateChange={(date) => setActiveDate(date)}
                        />
                        {isMatchLoading? (
                            <div className="mt-2">
                                <MatchListSkeleton />
                                <MatchListSkeleton />
                            </div>
                        ) : (
                            <MatchList
                                data={liveData}
                                selectedLeagueId={selectedLeagueId}
                                onSelectMatch={handleMatchClick}
                                activeMatchId={null} 
                            />
                        )}
                    </div>

                    {showRightSidebar && (
                        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-4 h-fit">
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
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
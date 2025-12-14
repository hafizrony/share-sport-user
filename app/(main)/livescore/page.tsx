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

const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
};

export default function LivescorePage() {
    const router = useRouter(); 
    const [activeDate, setActiveDate] = useState(getToday());
    const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

    const { data: liveData, loading: isMatchLoading, error } = useLiveScore(activeDate);
    const { sidebarBanners, isLoading: isBannerLoading } = useSidebarBanners();

    if (isMatchLoading || isBannerLoading) return <Loader />;
    if (error) return <div className="text-center py-10 text-red-500">Error loading scores.</div>;

    const showRightSidebar = sidebarBanners && sidebarBanners.length > 0;

    // --- FIX: Access Array Index [0] ---
    const handleMatchClick = (id: string) => {
        // Find the match object from the data using the ID
        let foundMatch: any = null;
        
        // Loop through stages to find the event
        if (liveData?.Stages) {
            for (const stage of liveData.Stages) {
                const match = stage.Events.find((e: any) => e.Eid === id);
                if (match) {
                    foundMatch = match;
                    break;
                }
            }
        }

        if (!foundMatch) return;

        const params = new URLSearchParams({
            hName: foundMatch.T1?.[0]?.Nm || "Home",
            aName: foundMatch.T2?.[0]?.Nm || "Away",
            hImg: foundMatch.T1?.[0]?.Img || "",
            aImg: foundMatch.T2?.[0]?.Img || "",
            status: foundMatch.Eps || "NS",
            scoreH: foundMatch.Tr1 || "0",
            scoreA: foundMatch.Tr2 || "0",
            time: foundMatch.Esd?.toString() || ""
        });

        router.push(`/livescore/${id}?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-slate-800 relative">
            <div className="w-full py-8 container mx-auto px-4 max-w-[1600px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                    <div className={`flex flex-col gap-4 ${showRightSidebar ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}`}>
                        <DateSelector
                            activeDate={activeDate}
                            onDateChange={(date) => setActiveDate(date)}
                        />

                        <MatchList
                            data={liveData}
                            selectedLeagueId={selectedLeagueId}
                            onSelectMatch={handleMatchClick} // Pass ID to handler
                            activeMatchId={null} 
                        />
                    </div>

                    {showRightSidebar && (
                        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-4 h-fit">
                            <div className="space-y-4">
                                {sidebarBanners.map((item:Banner) => (
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
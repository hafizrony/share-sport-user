"use client";
import Link from "next/link";
import Image from "next/image";
import LiveCard from "@/app/src/components/livecard";
import {useLiveMatch} from "@/app/src/hook/useLiveMatch";

export default function LiveStreamScrollCardForHome() {
    const matches = [
        {
            id: 1,
            league: "Premier League",
            minute: "45",
            home_team: {
                name: "Manchester United",
                short_name: "MUN",
                logo: "https://1000logos.net/wp-content/uploads/2017/03/Manchester-United-Logo-768x778.png",
            },
            away_team: {
                name: "Chelsea",
                short_name: "CHE",
                logo: "https://1000logos.net/wp-content/uploads/2016/11/Chelsea-Logo-1024x640.png",
            },
            home_score: 2,
            away_score: 1,
        },
        {
            id: 2,
            league: "La Liga",
            minute: "67",
            home_team: {
                name: "Barcelona",
                short_name: "BAR",
                logo: "https://1000logos.net/wp-content/uploads/2016/10/Barcelona-Logo-1024x640.png",
            },
            away_team: {
                name: "Real Madrid",
                short_name: "RMD",
                logo: "https://1000logos.net/wp-content/uploads/2020/09/Real-Madrid-logo-1536x1024.png",
            },
            home_score: 3,
            away_score: 3,
        },
        {
            id: 3,
            league: "Serie A",
            minute: "22",
            home_team: {
                name: "AC Milan",
                short_name: "MIL",
                logo: "https://1000logos.net/wp-content/uploads/2016/10/AC-Milan-Logo-1536x864.png",
            },
            away_team: {
                name: "Inter",
                short_name: "INT",
                logo: "https://1000logos.net/wp-content/uploads/2021/05/Inter-Milan-logo-1536x864.png",
            },
            home_score: 0,
            away_score: 2,
        },
        {
            id: 4,
            league: "Premier League",
            minute: "45",
            home_team: {
                name: "Manchester United",
                short_name: "MUN",
                logo: "https://1000logos.net/wp-content/uploads/2017/03/Manchester-United-Logo-768x778.png",
            },
            away_team: {
                name: "Chelsea",
                short_name: "CHE",
                logo: "https://1000logos.net/wp-content/uploads/2016/11/Chelsea-Logo-1024x640.png",
            },
            home_score: 2,
            away_score: 1,
        },
        {
            id: 5,
            league: "La Liga",
            minute: "67",
            home_team: {
                name: "Barcelona",
                short_name: "BAR",
                logo: "https://1000logos.net/wp-content/uploads/2016/10/Barcelona-Logo-1024x640.png",
            },
            away_team: {
                name: "Real Madrid",
                short_name: "RMD",
                logo: "https://1000logos.net/wp-content/uploads/2020/09/Real-Madrid-logo-1536x1024.png",
            },
            home_score: 3,
            away_score: 3,
        },
        {
            id: 6,
            league: "Serie A",
            minute: "22",
            home_team: {
                name: "AC Milan",
                short_name: "MIL",
                logo: "https://1000logos.net/wp-content/uploads/2016/10/AC-Milan-Logo-1536x864.png",
            },
            away_team: {
                name: "Inter",
                short_name: "INT",
                logo: "https://1000logos.net/wp-content/uploads/2021/05/Inter-Milan-logo-1536x864.png",
            },
            home_score: 0,
            away_score: 2,
        },
    ];
    // const {data,isLoading,isError} = useLiveMatch();
    // const dataArray = Array.isArray(data) ? data : (data?.data || []);
    // if(!isLoading) return console.log(dataArray);
    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
                    <div className="relative w-8 h-8">
                        <Image
                            src="/icons/live.gif"
                            alt="Live Icon"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <span className="tracking-wide uppercase">Live Now</span>
                </div>
                <Link href="/news" className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1">
                    See All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {matches.map((match) => (
                    <LiveCard
                        key={match.id}
                        league={match.league}
                        minute={match.minute}
                        team1={match.home_team.short_name}
                        team2={match.away_team.short_name}
                        score={`${match.home_score} - ${match.away_score}`}
                        logo1={match.home_team.logo}
                        logo2={match.away_team.logo}
                    />
                ))}
            </div>
        </div>
    );
}
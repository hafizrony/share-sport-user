"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { LiveScoreServices } from "../services/LiveScoreServices"; 
import { BarChart2, Repeat, Shirt, ChevronLeft, Info, ScrollText } from "lucide-react";
import Loader from "@/app/src/components/loader"; 
import { getImg, getStartTime } from "../helper/detailHelper";
import MatchTimeline from "../components/MatchTimeLine";
import MatchLineups from "../components/MatchLineups";
import MatchStats from "../components/MatchStats";
import MatchH2H from "../components/MatchH2H"; 
import MatchOverview from "../components/MatchOverview";

export default function MatchDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const matchId = params?.id as string;

  const [activeTab, setActiveTab] = useState<number>(4); 
  const [loading, setLoading] = useState<boolean>(true);
  
  const [lineups, setLineups] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [h2h, setH2h] = useState<any>(null);
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [scoreboard, setScoreboard] = useState<any>(null);

  const heroData = {
      hName: searchParams.get('hName') || "Home Team",
      aName: searchParams.get('aName') || "Away Team",
      hImg: searchParams.get('hImg'),
      aImg: searchParams.get('aImg'),
      status: searchParams.get('status') || "NS",
      scoreH: searchParams.get('scoreH') || "0",
      scoreA: searchParams.get('scoreA') || "0",
      time: searchParams.get('time') || ""
  };

  const displayScoreH = matchInfo?.Tr1 || heroData.scoreH;
  const displayScoreA = matchInfo?.Tr2 || heroData.scoreA;
  const displayStatus = matchInfo?.Eps || heroData.status;
  const isMatchLiveOrFinished = displayStatus !== "NS" && displayStatus !== "";

  useEffect(() => {
    if (!matchId || matchId === 'undefined') return;
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [infoRes, lineupRes, statsRes, h2hRes, scoreboardRes] = await Promise.all([
             LiveScoreServices.getMatchInfo ? LiveScoreServices.getMatchInfo(matchId).catch(()=>null) : Promise.resolve(null),
             LiveScoreServices.getMatchLineups(matchId).catch(()=>null),
             LiveScoreServices.getMatchStats(matchId).catch(()=>null),
             LiveScoreServices.getMatchH2H(matchId).catch(()=>null),
             LiveScoreServices.getScoreboard(matchId).catch(()=>null),
        ]);
        setMatchInfo(infoRes);
        setLineups(lineupRes);
        setStats(statsRes);
        setH2h(h2hRes);
        setScoreboard(scoreboardRes);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    fetchAllData();
  }, [matchId]);

  if (loading && !heroData.hName) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* HEADER */}
      <div className="bg-white text-[#2f2151] pt-6 pb-6 shadow-sm border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
             <button onClick={() => router.back()} className="mb-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-600"><ChevronLeft size={20}/></button>
             <div className="flex items-center justify-between">
                {/* Home */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                        <img src={getImg(heroData.hImg) || '/icons/null.png'} className="object-contain w-full h-full" onError={(e:any)=>e.currentTarget.src='/icons/null.png'}/>
                    </div>
                    <span className="text-[14px] md:text-2xl font-bold text-center">{heroData.hName}</span>
                </div>
                {/* Score */}
                <div className="px-4 md:px-12 text-center min-w-[120px]">
                    <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1 text-[#2f2151]">
                        {isMatchLiveOrFinished ? `${displayScoreH} - ${displayScoreA}` : getStartTime(heroData.time)}
                    </div>
                    <div className="inline-block bg-[#ffce00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{displayStatus}</div>
                </div>
                {/* Away */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                        <img src={getImg(heroData.aImg) || '/icons/null.png'} className="object-contain w-full h-full" onError={(e:any)=>e.currentTarget.src='/icons/null.png'}/>
                    </div>
                    <span className="text-[14px] md:text-2xl font-bold text-center">{heroData.aName}</span>
                </div>
             </div>
        </div>
      </div>

      {/* TABS */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
            <div className="flex justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar">
                {[
                    {id:0, l:"Overview", i: Info}, {id:4, l:"Summary", i: ScrollText},
                    {id:1, l:"Lineups", i: Shirt}, {id:2, l:"Statistics", i: BarChart2}, {id:3, l:"H2H", i: Repeat}
                ].map(t => (
                    <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`py-4 px-4 text-xs font-bold uppercase border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab===t.id ? 'border-[#2f2151] text-[#2f2151]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}><t.i size={14}/> {t.l}</button>
                ))}
            </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto max-w-6xl pt-4 md:p-6 min-h-[600px]">
         {loading ? <div className="text-center py-20"><Loader/></div> : (
             <>
                 {activeTab === 0 && <MatchOverview matchInfo={matchInfo} heroData={heroData} />}
                 {activeTab === 4 && <MatchTimeline scoreboard={scoreboard} />}
                 {activeTab === 1 && <MatchLineups lineups={lineups} heroData={heroData} />}
                 {activeTab === 2 && <MatchStats stats={stats} />}
                 {activeTab === 3 && <MatchH2H h2h={h2h} />}
             </>
         )}
      </div>
    </div>
  );
}
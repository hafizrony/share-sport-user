"use client";

import React, { JSX, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { LiveScoreServices } from "../services/LiveScoreServices"; 
import { BarChart2, Repeat, Shirt, ChevronLeft, Info, MapPin, Calendar, ArrowUp, ArrowDown, Trophy, RefreshCw, ScrollText, X } from "lucide-react";
import Loader from "@/app/src/components/loader"; 

const BASE_IMAGE = "https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/high/";

export default function MatchDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const matchId = params?.id as string;

  // Added tab ID 4 for Timeline
  const [activeTab, setActiveTab] = useState<number>(4); 
  const [loading, setLoading] = useState<boolean>(true);
  
  const [lineups, setLineups] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [h2h, setH2h] = useState<any>(null);
  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [scoreboard, setScoreboard] = useState<any>(null); // This contains the events/incidents

  // --- HERO DATA (Fallback from URL) ---
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

  // --- LIVE DATA HELPERS ---
  // Prefer live matchInfo over URL params if available
  const displayScoreH = matchInfo?.Tr1 || matchInfo?.Tr1 || heroData.scoreH;
  const displayScoreA = matchInfo?.Tr2 || matchInfo?.Tr2 || heroData.scoreA;
  const displayStatus = matchInfo?.Eps || heroData.status; // Eps usually contains "FT", "HT", or live minute "23'"
  const isMatchLiveOrFinished = displayStatus !== "NS" && displayStatus !== "";

  const getImg = (img: string | null) => (img && img !== "NULL" && img !== "undefined") ? `${BASE_IMAGE}${img}` : null;

  const getStartTime = (dateStr: string) => {
    if (!dateStr || dateStr.length < 12) return "--:--";
    const s = dateStr.toString();
    return s.length >= 12 ? `${s.slice(8, 10)}:${s.slice(10, 12)}` : "--:--";
  };

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
      } catch (err) {
        console.error("Error fetching match data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [matchId]);

  // ==========================================
  // VIEW: TIMELINE (Scoreboard/Events)
  // ==========================================

  const IncidentTypesMap: Record<number, { label: string; icon: JSX.Element }> = {
  // Goals
  36: { label: "Goal", icon: <div className="text-green-600">⚽</div> },
  37: { label: "Penalty Goal", icon: <div className="text-green-700">⚽P</div> },
  38: { label: "Missed Penalty", icon: <div className="text-red-500">✖️P</div> },
  39: { label: "Own Goal", icon: <div className="text-red-600">OG</div> },

  // Cards
  43: { label: "Yellow Card", icon: <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div> },
  44: { label: "Second Yellow Card", icon: <div className="w-3 h-4 bg-yellow-600 rounded-sm"></div> },
  45: { label: "Red Card", icon: <div className="w-3 h-4 bg-red-500 rounded-sm"></div> },

  // Check events
  1046: { label: "Penalty Check", icon: <div className="text-gray-500">PC</div> },
  1047: { label: "Goal Check", icon: <div className="text-gray-500">GC</div> },
  1048: { label: "Card Check", icon: <div className="text-gray-500">CC</div> },
};

const renderTimeline = () => {
  if (!scoreboard || !scoreboard.Incs) return <div>No events</div>;

  let events: any[] = [];

  Object.values(scoreboard.Incs).forEach((arr: any) => {
    arr.forEach((e: any) => {
      const team = e.Nm === 1 ? "home" : "away";

      if (e.Incs && e.Incs.length > 0) {
        const goalPlayer = e.Incs.find((inc: any) => inc.IT === 36 || inc.IT === 37);
        const assistPlayer = e.Incs.find((inc: any) => inc.IT === 63);

        if (goalPlayer) {
          let displayName = goalPlayer.Pn;
          if (assistPlayer) displayName += `(${assistPlayer.Pn})`;

          const scoreText = e.Sc ? `[${e.Sc[0]}-${e.Sc[1]}]` : "";
          const itCode = goalPlayer.IT;

          events.push({ ...e, team, displayName, IT: itCode, scoreText });
        }
      } else {
        events.push({ ...e, team, displayName: e.Pn, IT: e.IT });
      }
    });
  });

  events.sort((a, b) => (a.Min || 0) - (b.Min || 0));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Match Timeline</span>
        </div>
        <div className="relative py-8 px-4">
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100 -translate-x-1/2"></div>

          {events.map((e, i) => {
            console.log("Rendering event:", e.MinEx);
            const isHome = e.team === "home";
            const incident = IncidentTypesMap[e.IT] || { label: "Event", icon: <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div> };
            const nameParts = e.displayName?.split("(");

            return (
              <div key={i} className={`flex items-center mb-6 last:mb-0 relative ${isHome ? 'justify-end' : 'justify-start'}`}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm z-10">
                  {e.Min}'{e.MinEx}
                </div>

                <div className={`w-[42%] flex items-center gap-3 ${isHome ? 'justify-end md:pr-10' : 'justify-start md:pl-10'}`}>
                  <div className="flex flex-col text-sm font-bold text-gray-800">
                    <span>{nameParts[0]}</span>
                    {nameParts[1] && <span className="text-gray-300 text-[10px]">({nameParts[1].replace(")", "")})</span>}
                    {e.scoreText && <span className="text-gray-500 text-[10px] ml-1">{incident.label} {e.scoreText}</span>}
                    {!e.scoreText && <span className="text-gray-500 text-[10px]">{incident.label}</span>}
                  </div>

                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm`}>
                    {incident.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};











  // ==========================================
  // VIEW: LINEUPS
  // ==========================================
  const LineupsView = () => {
    if (!lineups?.Lu || lineups.Lu.length < 2) {
        return <div className="p-10 text-center text-gray-500">Lineups are not available yet.</div>;
    }

    // --- Helper: Process Starters ---
    const processStarters = (teamIndex: number) => {
        const teamData = lineups.Lu[teamIndex];
        const formationMap = teamData.Fo || [4, 4, 2];
        const players = teamData.Ps || [];
        const gk = players.find((p: any) => p.Pos == 1 || p.Pos === "1" || p.Pon === "GOALKEEPER");
        const outfield = players.filter((p: any) => p.Pid !== gk?.Pid).sort((a:any, b:any) => (a.PosA || 0) - (b.PosA || 0));

        const rows: any[][] = [];
        if (gk) rows.push([gk]);

        let currentIndex = 0;
        formationMap.forEach((count: number) => {
            rows.push(outfield.slice(currentIndex, currentIndex + count));
            currentIndex += count;
        });

        return { rows, formation: formationMap.join("-") }; 
    };

    // --- Helper: Pair Substitutions ---
    function pairSubs(subs: any[]) {
        if (!subs) return [];
        subs = subs.sort((a: { Min: number; Sor: number; }, b: { Min: number; Sor: number; }) => (a.Min - b.Min) || (a.Sor - b.Sor));
        const outs = subs.filter((s: { IT: number; }) => s.IT === 4);
        const ins  = subs.filter((s: { IT: number; }) => s.IT === 5);
        const usedIn = new Set();
        const pairs: { min: any; out: any; in: any; }[] = [];
        
        outs.forEach((out: { IDo: any; ID: any; Min: any; }) => {
            const matchIndex = ins.findIndex((inn: { ID: any; IDo: any; }, i: unknown) => {
                if (usedIn.has(i)) return false;
                return (
                    String(inn.ID) === String(out.IDo) ||
                    String(inn.IDo) === String(out.ID)
                );
            });

            if (matchIndex !== -1) {
                pairs.push({
                    min: out.Min,
                    out,
                    in: ins[matchIndex]
                });
                usedIn.add(matchIndex);
            }
        });
        return pairs;
    }

    const homeStarters = processStarters(0);
    const awayStarters = processStarters(1);
    const homeBench = lineups.Lu?.[0]?.Ps.filter((item: any) => item.Pos === 5) || [];
    const awayBench = lineups.Lu?.[1]?.Ps.filter((item: any) => item.Pos === 5) || [];
    const homeInjuries = lineups.Lu?.[0]?.IS || [];
    const awayInjuries = lineups.Lu?.[1]?.IS || [];
    const homeSubsHistory = pairSubs(lineups.Subs?.[2]?.filter((item: any) => item.Nm === 1));
    const awaySubsHistory = pairSubs(lineups.Subs?.[2]?.filter((item: any) => item.Nm === 2));

    const getStarterSubOutTime = (pid: string, history: any[]) => {
        const event = history.find(h => String(h.out.ID) === String(pid));
        return event ? event.min : null;
    };

    const getBenchSubInData = (pid: string, history: any[]) => {
        const event = history.find(h => String(h.in.ID) === String(pid));
        return event ? { min: event.min, outName: event.out?.Ln || event.out?.Fn } : null;
    };

    // -- Component: Player Pin --
    const PlayerPin = ({ p, isAway, subOutMin }: any) => {
        if (!p) return null;
        const rating = p.Rate && p.Rate !== "0" ? parseFloat(p.Rate) : null;
        return (
            <div className="flex flex-col items-center justify-center w-12 h-12 md:w-20 md:h-20 relative z-10 group cursor-pointer transition-all hover:scale-105">
                 {/* Rating Badge */}
                 {rating && (
                     <div className={`absolute lg:-top-1 -top-1/5 ${isAway ? 'lg:-left-1 -left-3' : 'lg:-right-1 -right-3'} z-30 
                     ${rating>=7 ? 'bg-green-600 text-white' : (rating<6 ? 'bg-red-500 text-white' : 'bg-orange-400 text-white')} 
                     text-[9px] md:text-[10px] font-bold px-1.5 rounded shadow-sm border border-white/50`}>
                        {p.Rate}
                     </div>
                 )}

                 {/* Subbed Out Indicator */}
                 {subOutMin && (
                    <div className={`absolute lg:top-9 top-4 ${isAway ? 'left-1' : '-right-7'} -translate-x-1/2 z-40 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full flex items-center border border-white shadow-sm whitespace-nowrap`}>
                        <ArrowDown size={8} /> {subOutMin}'
                    </div>
                 )}

                 {/* Avatar */}
                 <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-lg relative flex items-center justify-center
                    ${isAway ? 'bg-[#2f2151] border-white text-white' : 'bg-yellow-400 border-white text-black'}`}>
                    <span className="text-[10px] md:text-sm font-bold">{p.Snu}</span>
                </div>

                {/* Name */}
                <div className="bg-black/60 backdrop-blur-[2px] text-white text-[8px] md:text-[10px] px-2 py-0.5 rounded mt-1 truncate max-w-[70px] md:max-w-20 text-center font-semibold shadow-sm border border-white/10">
                    {p.Ln || p.Fn}
                </div>
            </div>
        );
    };

    const BenchItem = ({ p, subData, isAway }: any) => (
        <div className={`flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 ${isAway ? 'flex-row-reverse text-right' : ''}`}>
             <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 border border-gray-200">
                    {p.Snu}
                </div>
                {subData && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm">
                        <ArrowUp size={10} />
                    </div>
                )}
             </div>
             <div className="flex flex-col flex-1">
                 <div className="text-xs font-bold text-gray-700 truncate">{p.Ln || p.Fn}</div>
                 {subData ? (
                     <div className={`text-[10px] text-green-600 flex items-center gap-1 mt-0.5 ${isAway ? 'justify-end' : 'justify-start'}`}>
                         <span className="font-bold bg-green-100 px-1 rounded">{subData.min}'</span>
                         <span className="text-red-400 flex items-center gap-1"><RefreshCw size={8} /> {subData.outName}</span>
                     </div>
                 ) : (
                    <div className="text-[10px] text-gray-400 font-medium">{p.PosS==1?'GK':p.PosS==2?'DEF':p.PosS==3?'MID':p.PosS==4?'FW':'Bench'}</div>
                 )}
             </div>
        </div>
    );

    return (
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            {/* --- HEADER --- */}
            <div className="flex justify-center lg:justify-start px-6 py-3 bg-gray-50 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <span className="text-yellow-400">{heroData.hName} ({homeStarters.formation})</span>
            </div>

            {/* --- RESPONSIVE PITCH --- */}
            <div className="relative w-full aspect-9/16 lg:aspect-20/9 bg-[#3a8d4a] overflow-hidden group">
                {/* --- FIELD MARKINGS --- */}
                <div className="absolute inset-0">
                    {/* Grass Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[10%_100%]"></div>
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_10%]"></div>
                    
                    {/* Outer Border */}
                    <div className="absolute inset-4 border-2 border-white/70 rounded-sm"></div>

                    {/* --- DESKTOP LINES (Hidden on Mobile) --- */}
                    {/* Center Line Vertical */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 -translate-x-1/2"></div>
                    {/* Left Goal Area */}
                    <div className="hidden lg:block absolute top-1/2 left-4 -translate-y-1/2 w-16 h-32 border-r-2 border-y-2 border-white/70"></div>
                    {/* Right Goal Area */}
                    <div className="hidden lg:block absolute top-1/2 right-4 -translate-y-1/2 w-16 h-32 border-l-2 border-y-2 border-white/70"></div>

                    {/* --- MOBILE LINES (Hidden on Desktop) --- */}
                    {/* Center Line Horizontal */}
                    <div className="block lg:hidden absolute top-1/2 left-0 right-0 h-0.5 bg-white/70 -translate-y-1/2"></div>
                    {/* Top Goal Area (Home) */}
                    <div className="block lg:hidden absolute top-4 left-1/2 -translate-x-1/2 w-32 h-14 border-b-2 border-x-2 border-white/70"></div>
                    {/* Bottom Goal Area (Away) */}
                    <div className="block lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-14 border-t-2 border-x-2 border-white/70"></div>

                    {/* Center Circle */}
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-24 md:h-24 border-2 border-white/70 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* --- PLAYERS CONTAINER --- */}
                {/* Mobile: flex-col (Home Top, Away Bottom). Desktop: flex-row (Home Left, Away Right) */}
                <div className="absolute inset-0 flex flex-col lg:flex-row pb-4 pt-4 lg:py-4">
                    
                    {/* HOME TEAM (Top on Mobile / Left on Desktop) */}
                    <div className="flex-1 flex flex-col lg:flex-row items-center justify-around relative px-2 lg:pl-2 lg:pr-8">
                        {homeStarters.rows.map((row, i) => (
                            // Mobile: Row of players. Desktop: Col of players
                            <div key={i} className="flex flex-row lg:flex-col justify-around items-center w-full lg:w-auto lg:h-full">
                                {row.map((p:any, j:number) => (
                                    <PlayerPin 
                                        key={j} 
                                        p={p} 
                                        isAway={false} 
                                        subOutMin={getStarterSubOutTime(p.Pid, homeSubsHistory)} 
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* AWAY TEAM (Bottom on Mobile / Right on Desktop) */}
                    {/* Mobile: flex-col-reverse (GK at bottom). Desktop: flex-row-reverse (GK at right) */}
                    <div className="flex-1 flex flex-col-reverse lg:flex-row-reverse items-center justify-around relative px-2 lg:pr-2 lg:pl-8">
                         {awayStarters.rows.map((row, i) => (
                            <div key={i} className="flex flex-row lg:flex-col justify-around items-center w-full lg:w-auto lg:h-full">
                                {row.map((p:any, j:number) => (
                                    <PlayerPin 
                                        key={j} 
                                        p={p} 
                                        isAway={true} 
                                        subOutMin={getStarterSubOutTime(p.Pid, awaySubsHistory)} 
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="flex justify-center lg:justify-end px-6 py-3 bg-gray-50 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <span className="text-[#2f2151]">{heroData.aName} ({awayStarters.formation})</span>
            </div>
            {/* --- BENCH --- */}
            <div className="bg-white p-4 md:p-6">
                <h3 className="text-center font-bold text-[#2f2151] mb-6 uppercase text-xs tracking-widest bg-gray-50 py-2 rounded">
                    Substitutions
                </h3>
                <div className="grid grid-cols-2 gap-8 md:gap-12 relative">
                     <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                     {/* Home Bench */}
                     <div className="flex flex-col">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">Home</div>
                        {homeBench.length > 0 ? (
                            homeBench.map((p:any, i:number) => (
                                <BenchItem 
                                    key={i} 
                                    p={p} 
                                    subData={getBenchSubInData(p.Pid, homeSubsHistory)}
                                    isAway={false} 
                                />
                            ))
                        ) : <div className="text-gray-400 text-xs italic">No info</div>}
                     </div>
                     {/* Away Bench */}
                     <div className="flex flex-col">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider text-right">Away</div>
                        <div className="flex flex-col">
                            {awayBench.length > 0 ? (
                                awayBench.map((p:any, i:number) => (
                                    <BenchItem 
                                        key={i} 
                                        p={p} 
                                        subData={getBenchSubInData(p.Pid, awaySubsHistory)}
                                        isAway={true} 
                                    />
                                ))
                            ) : <div className="text-gray-400 text-xs italic text-right">No info</div>}
                        </div>
                     </div>
                </div>
            </div>
            {/* --- INJURIES --- */}
            <div className="bg-white p-4 md:p-6 mt-6">
                <h3 className="text-center font-bold text-[#2f2151] mb-6 uppercase text-xs tracking-widest bg-gray-50 py-2 rounded">
                    Injuries
                </h3>
                <div className="grid grid-cols-2 gap-8 md:gap-12 relative">
                            
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                        {/* Home Injuries */}
                        <div className="flex flex-col">
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">Home</div>
                            {homeInjuries.length > 0 ? (
                                homeInjuries.map((injury:any, i:number) => (
                                    <div key={i} className="text-gray-700 text-sm mb-2 last:mb-0">
                                        <span className="font-bold">{injury.Fn + " " + injury.Ln}</span>
                                        <div className="text-[10px] text-red-400">{injury.Rs || 'Injury'}</div>
                                    </div>
                                ))
                            ) : <div className="text-gray-400 text-xs italic">No info</div>}
                        </div>
                        {/* Away Injuries */}
                        <div className="flex flex-col">
                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider text-right">Away</div>
                            {awayInjuries.length > 0 ? (
                                awayInjuries.map((injury:any, i:number) => (
                                    <div key={i} className="text-gray-700 text-sm mb-2 last:mb-0 text-right">
                                        <span className="font-bold">{injury.Fn + " " + injury.Ln}</span>
                                        <div className="text-[10px] text-red-400">{injury.Rs || 'Injury'}</div>
                                    </div>
                                ))
                            ) : <div className="text-gray-400 text-xs italic text-right">No info</div>}
                        </div>
                    </div>
                </div>
        </div>
    )
  };

  // ==========================================
  // RENDERERS (Stats, H2H, Overview)
  // ==========================================
  const renderStats = () => {
    const selectedKeys: Record<string, string> = {
        Pss: "Possession (%)",
        Shon: "Shots on target",
        Shof: "Shots off target",
        Shbl: "Blocked Shots",
        Cos: "Corner Kicks",
        Ofs: "Offsides",
        Fls: "Fouls",
        Ycs: "Yellow cards",
        Crs: "Crosses",
        Gks: "Goalkeeper saves",
        Goa: "Goals",
        Xg: "Expected Goals",
    };
    let statList: any[] = [];

    if (stats) {
        if (Array.isArray(stats)) statList = stats;
        else if (Array.isArray(stats.Stat)) statList = stats.Stat;
        else if (Array.isArray(stats.Stats)) statList = stats.Stats;
    }

    if (statList.length === 0) {
        return <div className="p-10 text-center text-gray-400">No stats available</div>;
    }
    // 2. Filter only selected keys
    const cleanStats = Object.keys(selectedKeys).map(key => ({
        label: selectedKeys[key],
        home: statList[0]?.[key] ?? 0,
        away: statList[1]?.[key] ?? 0,
        }));
    // 3. Render stats
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <h3 className="text-center font-bold text-[#2f2151] mb-6 uppercase text-xs tracking-widest border-b border-gray-100 pb-4">
            Match Statistics
        </h3>

        {cleanStats.map((s: any, i: number) => {
            const h = Number(s.home ?? 0);
            const a = Number(s.away ?? 0);
            const total = h + a;
            const hPct = total === 0 ? 50 : (h / total) * 100;

            return (
            <div key={i} className="mb-5">
                <div className="flex justify-between text-xs font-bold mb-1.5 text-gray-700">
                <span>{h}</span>
                <span className="text-gray-400 uppercase text-[10px] tracking-wider">{s.label}</span>
                <span>{a}</span>
                </div>
                <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-[#ffce00]" style={{ width: `${hPct}%` }}></div>
                <div className="bg-[#2f2151]" style={{ width: `${100 - hPct}%` }}></div>
                </div>
            </div>
            );
        })}
        </div>
    );
    };


  const renderH2H = () => {
      const matches = h2h?.H2H || [];
      if (matches.length === 0) return <div className="p-10 text-center text-gray-400">No History Available</div>;
      const getScoreColor = (s1: string, s2: string) => {
          const h = parseInt(s1); const a = parseInt(s2);
          if (h > a) return "bg-green-100 text-black border-green-200";
          if (h < a) return "bg-red-100 text-black border-red-200";
          return "bg-gray-400 text-white border-gray-500";
      };
      return (
          <div className="space-y-3 max-w-3xl mx-auto">
              {matches.map((m:any, i:number) => {
                  const t1Img = getImg(m.T1?.[0]?.Img); 
                  const t2Img = getImg(m.T2?.[0]?.Img);
                  const date = m.Esd?.toString();
                  return (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Trophy size={10}/> {m.Stg?.Snm || "League"}</span>
                            <span className="flex items-center gap-1"><Calendar size={10}/> {date ? `${date.slice(6,8)}/${date.slice(4,6)}/${date.slice(0,4)}` : '-'}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 ">
                            <div className="flex-1 flex items-center justify-end gap-2 text-right"><span className={`text-sm font-bold ${parseInt(m.Tr1) > parseInt(m.Tr2) ? 'text-black' : 'text-gray-500'}`}>{m.T1?.[0]?.Nm}</span><div className="w-8 h-8 rounded-full border border-gray-100 p-1 flex items-center justify-center shrink-0"><img src={t1Img || '/icons/null.png'} className="w-full h-full object-contain" onError={(e:any)=>e.currentTarget.src='/icons/null.png'}/></div></div>
                            <div className="flex items-center gap-2"><span className={`w-7 h-7 flex items-center justify-center rounded-md font-bold text-sm shadow-sm border ${getScoreColor(m.Tr1, m.Tr2)}`}>{m.Tr1}</span><span className="text-gray-300">-</span><span className={`w-7 h-7 flex items-center justify-center rounded-md font-bold text-sm shadow-sm border ${getScoreColor(m.Tr2, m.Tr1)}`}>{m.Tr2}</span></div>
                            <div className="flex-1 flex items-center justify-start gap-2 text-left"><div className="w-8 h-8 rounded-full border border-gray-100 p-1 flex items-center justify-center shrink-0"><img src={t2Img || '/icons/null.png'} className="w-full h-full object-contain" onError={(e:any)=>e.currentTarget.src='/icons/null.png'}/></div><span className={`text-sm font-bold ${parseInt(m.Tr2) > parseInt(m.Tr1) ? 'text-black' : 'text-gray-500'}`}>{m.T2?.[0]?.Nm}</span></div>
                        </div>
                    </div>
                  );
              })}
          </div>
      )
  }

  const renderOverview = () => {
      const venue = matchInfo?.Vnm || "Stadium info unavailable";
      const location = matchInfo?.Vcy && matchInfo?.VCnm ? `${matchInfo.Vcy}, ${matchInfo.VCnm}` : "";
      const fullVenue = location ? `${venue} - ${location}` : venue;
      const date = matchInfo?.Esd ? matchInfo.Esd.toString() : heroData.time;

      return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold text-[#2f2151] mb-4 uppercase text-xs tracking-wider"><MapPin size={16}/> Venue Info</h3>
                  <div className="text-sm font-bold text-gray-800">{fullVenue}</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="flex items-center gap-2 font-bold text-[#2f2151] mb-4 uppercase text-xs tracking-wider"><Info size={16}/> Match Details</h3>
                  <div className="flex items-center text-sm font-semibold mb-1"><Calendar size={16} className="text-gray-700 mr-2"/>{ date && date.length >= 8 ? `${date.slice(6,8)}/${date.slice(4,6)}/${date.slice(0,4)}` : 'TBD'}</div>
              </div>
          </div>
      )
  };

  if (loading && !heroData.hName) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* HEADER */}
      <div className="bg-white text-[#2f2151] pt-6 pb-6 shadow-sm border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
             <button onClick={() => router.back()} className="mb-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-600"><ChevronLeft size={20}/></button>
             <div className="flex items-center justify-between">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                    {getImg(heroData.hImg) ? (
                        <img
                        src={getImg(heroData.hImg)!}
                        className="object-contain w-full h-full"
                        onError={(e: any) => (e.currentTarget.src = '/icons/null.png')}
                        />
                    ) : (
                        <span className="text-gray-400 font-bold text-xl">{heroData.hName.substring(0, 1)}</span>
                    )}
                    </div>
                    <span className="text-[14px] md:text-2xl font-bold text-center">{heroData.hName}</span>
                </div>

                {/* Score / Time */}
                <div className="px-4 md:px-12 text-center min-w-[120px]">
                    {isMatchLiveOrFinished ? (
                    <div className="text-4xl md:text-5xl font-black tracking-tighter mb-1 text-[#2f2151]">
                        {displayScoreH} - {displayScoreA}
                    </div>
                    ) : (
                    <div className="text-3xl md:text-4xl font-black tracking-tighter mb-1 text-[#2f2151]">
                        {getStartTime(heroData.time)}
                    </div>
                    )}
                    <div className="inline-block bg-[#ffce00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {displayStatus}
                    </div>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full p-2 shadow-sm border border-gray-100 flex items-center justify-center">
                    {getImg(heroData.aImg) ? (
                        <img
                        src={getImg(heroData.aImg)!}
                        className="object-contain w-full h-full"
                        onError={(e: any) => (e.currentTarget.src = '/icons/null.png')}
                        />
                    ) : (
                        <span className="text-gray-400 font-bold text-xl">{heroData.aName.substring(0, 1)}</span>
                    )}
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
                    {id:0, l:"Overview", i: Info}, 
                    {id:4, l:"Summary", i: ScrollText},
                    {id:1, l:"Lineups", i: Shirt}, 
                    {id:2, l:"Statistics", i: BarChart2}, 
                    {id:3, l:"H2H", i: Repeat}
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
                 {activeTab === 0 && renderOverview()}
                 {activeTab === 4 && renderTimeline()}
                 {activeTab === 1 && <LineupsView />}
                 {activeTab === 2 && renderStats()}
                 {activeTab === 3 && renderH2H()}
             </>
         )}
      </div>
    </div>
  );
};
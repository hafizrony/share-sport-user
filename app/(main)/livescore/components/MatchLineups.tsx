import React from 'react';
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { processStarters, pairSubs } from "../helper/detailHelper";

const PlayerPin = ({ p, isAway, subOutMin }: any) => {
    if (!p) return null;
    const rating = p.Rate && p.Rate !== "0" ? parseFloat(p.Rate) : null;
    return (
        <div className="flex flex-col items-center justify-center w-12 h-12 md:w-20 md:h-20 relative z-10 group cursor-pointer transition-all hover:scale-105">
             {rating && (
                 <div className={`absolute lg:-top-1 -top-1/5 ${isAway ? 'lg:-left-1 -left-3' : 'lg:-right-1 -right-3'} z-30 
                 ${rating>=7 ? 'bg-green-600 text-white' : (rating<6 ? 'bg-red-500 text-white' : 'bg-orange-400 text-white')} 
                 text-[9px] md:text-[10px] font-bold px-1.5 rounded shadow-sm border border-white/50`}>
                    {p.Rate}
                 </div>
             )}
             {subOutMin && (
                <div className={`absolute lg:top-9 top-4 ${isAway ? 'left-1' : '-right-7'} -translate-x-1/2 z-40 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full flex items-center border border-white shadow-sm whitespace-nowrap`}>
                    <ArrowDown size={8} /> {subOutMin}'
                </div>
             )}
             <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-lg relative flex items-center justify-center
                ${isAway ? 'bg-[#2f2151] border-white text-white' : 'bg-yellow-400 border-white text-black'}`}>
                <span className="text-[10px] md:text-sm font-bold">{p.Snu}</span>
            </div>
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

export default function MatchLineups({ lineups, heroData }: any) {
    if (!lineups?.Lu || lineups.Lu.length < 2) {
        return <div className="p-10 text-center text-gray-500">Lineups are not available yet.</div>;
    }

    const homeStarters = processStarters(lineups, 0);
    const awayStarters = processStarters(lineups, 1);
    const subsArray = lineups.Subs && lineups.Subs[2] ? lineups.Subs[2] : [];
    
    const homeBench = lineups.Lu?.[0]?.Ps.filter((item: any) => item.Pos === 5) || [];
    const awayBench = lineups.Lu?.[1]?.Ps.filter((item: any) => item.Pos === 5) || [];
    
    const homeInjuries = lineups.Lu?.[0]?.IS || [];
    const awayInjuries = lineups.Lu?.[1]?.IS || [];

    const homeSubsHistory = pairSubs(subsArray.filter((item: any) => item.Nm === 1));
    const awaySubsHistory = pairSubs(subsArray.filter((item: any) => item.Nm === 2));

    const getStarterSubOutTime = (pid: string, history: any[]) => {
        const event = history.find(h => String(h.out.ID) === String(pid));
        return event ? event.min : null;
    };

    const getBenchSubInData = (pid: string, history: any[]) => {
        const event = history.find(h => String(h.in.ID) === String(pid));
        return event ? { min: event.min, outName: event.out?.Ln || event.out?.Fn } : null;
    };

    return (
        <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex justify-center lg:justify-start px-6 py-3 bg-gray-50 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <span className="text-yellow-400">{heroData.hName} ({homeStarters.formation})</span>
            </div>

            {/* Pitch */}
            <div className="relative w-full aspect-9/16 lg:aspect-20/9 bg-[#3a8d4a] overflow-hidden group">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[10%_100%]"></div>
                    <div className="absolute inset-4 border-2 border-white/70 rounded-sm"></div>
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 -translate-x-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 md:w-24 md:h-24 border-2 border-white/70 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col lg:flex-row pb-4 pt-4 lg:py-4">
                    {/* Home Players */}
                    <div className="flex-1 flex flex-col lg:flex-row items-center justify-around relative px-2 lg:pl-2 lg:pr-8">
                        {homeStarters.rows.map((row, i) => (
                            <div key={i} className="flex flex-row lg:flex-col justify-around items-center w-full lg:w-auto lg:h-full">
                                {row.map((p:any, j:number) => (
                                    <PlayerPin key={j} p={p} isAway={false} subOutMin={getStarterSubOutTime(p.Pid, homeSubsHistory)} />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* Away Players */}
                    <div className="flex-1 flex flex-col-reverse lg:flex-row-reverse items-center justify-around relative px-2 lg:pr-2 lg:pl-8">
                         {awayStarters.rows.map((row, i) => (
                            <div key={i} className="flex flex-row lg:flex-col justify-around items-center w-full lg:w-auto lg:h-full">
                                {row.map((p:any, j:number) => (
                                    <PlayerPin key={j} p={p} isAway={true} subOutMin={getStarterSubOutTime(p.Pid, awaySubsHistory)} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center lg:justify-end px-6 py-3 bg-gray-50 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <span className="text-[#2f2151]">{heroData.aName} ({awayStarters.formation})</span>
            </div>

            {/* Bench / Substitutions */}
            <div className="bg-white p-4 md:p-6">
                <h3 className="text-center font-bold text-[#2f2151] mb-6 uppercase text-xs tracking-widest bg-gray-50 py-2 rounded">Substitutions</h3>
                <div className="grid grid-cols-2 gap-8 md:gap-12 relative">
                     <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2 hidden md:block"></div>
                     <div className="flex flex-col">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">Home</div>
                        {homeBench.length > 0 ? (
                            homeBench.map((p:any, i:number) => <BenchItem key={i} p={p} subData={getBenchSubInData(p.Pid, homeSubsHistory)} isAway={false} />)
                        ) : <div className="text-gray-400 text-xs italic">No info</div>}
                     </div>
                     <div className="flex flex-col">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider text-right">Away</div>
                        {awayBench.length > 0 ? (
                            awayBench.map((p:any, i:number) => <BenchItem key={i} p={p} subData={getBenchSubInData(p.Pid, awaySubsHistory)} isAway={true} />)
                        ) : <div className="text-gray-400 text-xs italic text-right">No info</div>}
                     </div>
                </div>
            </div>

            {/* --- INJURIES SECTION --- */}
            <div className="bg-white p-4 md:p-6 mt-6 border-t border-gray-100">
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
                                    <span className="font-bold">{injury.Fn?injury.Fn:"" + " " + injury.Ln?injury.Ln:""}</span>
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
                                    <span className="font-bold">{injury.Fn?injury.Fn:"" + " " + injury.Ln?injury.Ln:""}</span>
                                    <div className="text-[10px] text-red-400">{injury.Rs || 'Injury'}</div>
                                </div>
                            ))
                        ) : <div className="text-gray-400 text-xs italic text-right">No info</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
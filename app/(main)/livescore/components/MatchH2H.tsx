import React from 'react';
import { Trophy, Calendar } from "lucide-react";
import { getImg } from "../helper/detailHelper";

export default function MatchH2H({ h2h }: any) {
    const matches = h2h?.H2H || [];
    
    if (matches.length === 0) {
        return <div className="p-10 text-center text-gray-400">No History Available</div>;
    }

    const getScoreColor = (s1: string, s2: string) => {
        const h = parseInt(s1); 
        const a = parseInt(s2);
        if (h > a) return "bg-green-100 text-black border-green-200";
        if (h < a) return "bg-red-100 text-black border-red-200";
        return "bg-gray-400 text-white border-gray-500";
    };

    return (
        <div className="space-y-3 max-w-3xl mx-auto">
            {matches.map((m: any, i: number) => {
                const t1Img = getImg(m.T1?.[0]?.Img); 
                const t2Img = getImg(m.T2?.[0]?.Img);
                const date = m.Esd?.toString();
                
                return (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      {/* Match Header: Tournament & Date */}
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider">
                          <span className="flex items-center gap-1"><Trophy size={10}/> {m.Stg?.Snm || "League"}</span>
                          <span className="flex items-center gap-1">
                              <Calendar size={10}/> 
                              {date ? `${date.slice(6,8)}/${date.slice(4,6)}/${date.slice(0,4)}` : '-'}
                          </span>
                      </div>

                      {/* Match Content: Team 1 - Score - Team 2 */}
                      <div className="flex items-center justify-between gap-2">
                          {/* Home Team */}
                          <div className="flex-1 flex items-center justify-end gap-2 text-right">
                              <span className={`text-sm font-bold ${parseInt(m.Tr1) > parseInt(m.Tr2) ? 'text-black' : 'text-gray-500'}`}>
                                  {m.T1?.[0]?.Nm}
                              </span>
                              <div className="w-8 h-8 rounded-full border border-gray-100 p-1 flex items-center justify-center shrink-0">
                                  <img 
                                    src={t1Img || '/icons/null.png'} 
                                    className="w-full h-full object-contain" 
                                    onError={(e:any)=>e.currentTarget.src='/icons/null.png'}
                                    alt="Home Team"
                                  />
                              </div>
                          </div>

                          {/* Score Box */}
                          <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 flex items-center justify-center rounded-md font-bold text-sm shadow-sm border ${getScoreColor(m.Tr1, m.Tr2)}`}>
                                  {m.Tr1}
                              </span>
                              <span className="text-gray-300">-</span>
                              <span className={`w-7 h-7 flex items-center justify-center rounded-md font-bold text-sm shadow-sm border ${getScoreColor(m.Tr2, m.Tr1)}`}>
                                  {m.Tr2}
                              </span>
                          </div>

                          {/* Away Team */}
                          <div className="flex-1 flex items-center justify-start gap-2 text-left">
                              <div className="w-8 h-8 rounded-full border border-gray-100 p-1 flex items-center justify-center shrink-0">
                                  <img 
                                    src={t2Img || '/icons/null.png'} 
                                    className="w-full h-full object-contain" 
                                    onError={(e:any)=>e.currentTarget.src='/icons/null.png'}
                                    alt="Away Team"
                                  />
                              </div>
                              <span className={`text-sm font-bold ${parseInt(m.Tr2) > parseInt(m.Tr1) ? 'text-black' : 'text-gray-500'}`}>
                                  {m.T2?.[0]?.Nm}
                              </span>
                          </div>
                      </div>
                  </div>
                );
            })}
        </div>
    );
}
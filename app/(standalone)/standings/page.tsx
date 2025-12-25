"use client";

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LiveScoreServices } from '../../(main)/livescore/services/LiveScoreServices'; 
import Loader from '@/app/src/components/loader';

interface TableRow {
  rnk: number;
  Tid: string;
  Tnm: string;
  Img: string;
  pld: number;
  win: number;
  drw: number;
  lst: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
}

function StandingsContent() {
  const searchParams = useSearchParams();
  const ccd = searchParams.get('ccd');
  const scd = searchParams.get('scd');
  const cnm = searchParams.get('cnm') || "";
  const snm = searchParams.get('snm') || "";

  const [subTab, setSubTab] = useState<1 | 2 | 3>(1);
  const [standingsData, setStandingsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cnm && snm) {
      document.title = `${cnm}: ${snm} - Share Sport`;
    }
  }, [cnm, snm]);

  useEffect(() => {
    const fetchData = async () => {
      if (!ccd || !scd) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await LiveScoreServices.getStandings(ccd, scd);
        setStandingsData(result);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ccd, scd]);

  const tableRows = useMemo(() => {
    if (!standingsData?.LeagueTable?.L) return [];
    const leagueData = standingsData.LeagueTable.L[0];
    const tables = leagueData.Tables || [];
    const currentTable = tables.find((t: any) => t.LTT === subTab);
    return currentTable ? currentTable.team : [];
  }, [standingsData, subTab]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#F8F9FA] overflow-y-auto font-sans container mx-auto px-4 pt-6 pb-6">
          <div className="bg-[#4c3b71] rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6">
               <div className="w-16 h-16 rounded-lg flex items-center justify-center p-2">
                   {ccd && (
                    <img 
                        src={`https://getimage.membertsd.workers.dev/?url=https://static.livescore.com/i2/fh/${ccd}.jpg`} 
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                        alt="" 
                    />
                   )}
               </div>
               <div className="flex-1">
                   <h1 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">
                       {cnm}
                   </h1>
                   <div className="text-white font-bold text-sm uppercase mt-1">
                       {snm}
                   </div>
               </div>
          </div>

          {/* --- Main Content Area --- */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
            
            {/* Sub Tabs */}
            <div className="flex gap-2 p-4 border-b border-gray-100 bg-gray-50">
                    {[
                    {id: 1, label: 'Overall'}, 
                    {id: 2, label: 'Home'}, 
                    {id: 3, label: 'Away'}
                    ].map((tab) => (
                        <button 
                        key={tab.id}
                        onClick={() => setSubTab(tab.id as 1|2|3)}
                        className={`px-6 py-2 rounded-md text-xs font-bold uppercase transition-all shadow-sm ${
                            subTab === tab.id 
                            ? 'bg-[#4c3b71] text-white' 
                            : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                        }`}
                        >
                        {tab.label}
                        </button>
                    ))}
            </div>

            {/* Content Body */}
            <div className="p-0">
                {/* --- LOADING --- */}
                {loading && (
                    <Loader/>
                )}

                {/* --- ERROR --- */}
                {!loading && error && (
                    <div className="p-20 text-center text-red-500 font-bold bg-red-50 m-4 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && (!standingsData?.LeagueTable?.L) && (
                    <div className="p-20 text-center text-gray-500 font-bold m-4">
                        No standings data available for this competition.
                    </div>
                )}

                {/* --- STANDINGS TABLE --- */}
                {!loading && !error && (standingsData?.LeagueTable?.L) && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-white uppercase bg-[#4c3b71]">
                                <tr>
                                    <th className="px-4 py-3 text-center w-12">#</th>
                                    <th className="px-4 py-3 min-w-50">Team</th>
                                    <th className="px-2 py-3 text-center min-w-12 w-10 bg-[#423361]">MP</th>
                                    <th className="px-2 py-3 text-center min-w-12 w-10">W</th>
                                    <th className="px-2 py-3 text-center min-w-12 w-10">D</th>
                                    <th className="px-2 py-3 text-center min-w-12 w-10">L</th>
                                    <th className="px-2 py-3 text-center min-w-15 w-16">G</th>
                                    <th className="px-2 py-3 text-center min-w-10 w-15">GD</th>
                                    <th className="px-2 py-3 text-center min-w-12 w-15 bg-[#4642cb] font-bold">PTS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-slate-700">
                                {tableRows.map((row: TableRow, idx: number) => (
                                    <tr key={row.Tid} className="hover:bg-[#f3f0f9] transition-colors odd:bg-white even:bg-gray-50">
                                        <td className="px-4 py-3 text-center font-bold text-[#2f2151]">
                                            {row.rnk}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-[#2f2151]">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={`https://getimage.membertsd.workers.dev/?url=https://lsm-static-prod.livescore.com/medium/${row.Img}`} 
                                                    className="w-6 h-6 object-contain"
                                                    onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                                                    alt="" 
                                                />
                                                <span>{row.Tnm}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 text-center font-bold bg-gray-100">{row.pld}</td>
                                        <td className="px-2 py-3 text-center text-green-600 font-bold">{row.win}</td>
                                        <td className="px-2 py-3 text-center text-gray-500">{row.drw}</td>
                                        <td className="px-2 py-3 text-center text-red-500">{row.lst}</td>
                                        <td className="px-2 py-3 text-center text-gray-600 text-xs">{row.gf}:{row.ga}</td>
                                        <td className="px-2 py-3 text-center font-medium">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                                        <td className="px-2 py-3 text-center font-bold text-[#6f4b98] bg-[#f8f5fc] text-base">
                                            {row.pts}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
          </div>
    </div>
  );
}

export default function StandingsPage() {
  return (
    <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
             <div className="w-10 h-10 border-4 border-[#6f4b98] border-t-transparent rounded-full animate-spin"></div>
        </div>
    }>
      <StandingsContent />
    </Suspense>
  );
}
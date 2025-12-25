import React from 'react';
import Link from 'next/link';
import { LiveScoreResponse, Stage } from '../utils/LiveScore.interface';
import { getAPEvents } from '../helper/livescoreHelper';
import { CheckCircle } from 'lucide-react';
import MatchListSkeleton from "./SkeletonLoading";

interface MatchListProps {
  data: LiveScoreResponse | null;
  selectedLeagueId: string | null;
  onSelectMatch: (matchId: string) => void;
  activeMatchId: string | null; 
}

const MatchList: React.FC<MatchListProps> = ({ data, selectedLeagueId, onSelectMatch, activeMatchId }) => {
  
  const formatTime = (dateNum: number) => {
    if (!dateNum) return '';
    const dateStr = dateNum.toString();
    if (dateStr.length < 12) return '';
    const hour = dateStr.slice(8, 10);
    const minute = dateStr.slice(10, 12);
    return `${hour}:${minute}`;
  };

  const getMatchStatus = (status: string, startTime: number) => {
    if (status === 'NS') {
      return formatTime(startTime);
    }
    return status;
  };

  if (!data || !data.Stages || data.Stages.length === 0) {
    return (
        <MatchListSkeleton/>
    );
  }

  const filteredStages = selectedLeagueId
    ? data.Stages.filter((stage: Stage) => stage.Cid === selectedLeagueId || stage.Sid === selectedLeagueId)
    : data.Stages;

  if (filteredStages.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No matches found for this league today.</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredStages.map((stage: Stage) => (
        <div key={stage.Sid} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="bg-[#4c3b71] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={`https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/flag/${stage.Ccd}.jpg`}
                        onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                        className="w-5 h-4 object-cover rounded shadow-sm"
                        alt={stage.Cnm}
                    />
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm uppercase tracking-wide">
                            {stage.Cnm}
                        </span>
                        <span className="text-white font-normal opacity-70">{stage.Snm}</span>
                    </div>
                </div>

                {stage.Ccd && stage.Scd && (
                    <Link 
                        href={`/standings?ccd=${stage.Ccd}&scd=${stage.Scd}&cnm=${encodeURIComponent(stage.Cnm)}&snm=${encodeURIComponent(stage.Snm)}`} 
                        target="_blank"
                        onClick={(e) => e.stopPropagation()} 
                        className="text-xs text-white/70 hover:text-white hover:underline flex items-center gap-1 transition-colors"
                    >
                        Standings &rsaquo;
                    </Link>
                )}
            </div>

            <div className="divide-y divide-gray-100">
                {stage.Events.map((event) => {
                    const displayStatus = getMatchStatus(event.Eps, event.Esd);
                    const isLive =/^\d+[`']$/.test(event.Eps) && parseInt(event.Eps) <= 90 ||['1H', '2H', 'HT', 'ET', 'P'].includes(event.Eps);
                    const isFinished = ['FT', 'AET', 'AP'].includes(event.Eps);
                    const isPenalty = displayStatus === "AP";
                    const AP = getAPEvents(stage);
                    let hwin = false;
                    let awin = false;
                    if(isPenalty){
                      const trp1 = Number(AP?.[0].Trp1);
                      const trp2 = Number(AP?.[0].Trp2);
                      trp1>trp2?hwin=true:awin=true;
                    }
                    return (
                        <div 
                            key={event.Eid} 
                            onClick={() => onSelectMatch(event.Eid)}
                            className={`flex items-center p-4 cursor-pointer transition-all border-l-4 hover:bg-gray-50 border-transparent`}>
                            
                            <div className="w-10 flex flex-col justify-center text-left mr-4">
                                <span className={`text-sm font-semibold ${isLive ? 'text-red-500 animate-pulse' : isFinished ? 'text-gray-500' : 'text-gray-800'}`}>
                                    {displayStatus}
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col gap-3 border-l border-gray-100 pl-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img 
                                          src={`https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/medium/${event.T1[0]?.Img}`}
                                          className="w-5 h-5 object-contain" 
                                          alt={event.T1[0]?.Nm} 
                                          onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                                        />
                                        <span className="font-medium col-1 flex text-sm text-gray-800 items-center">
                                            {event.T1[0]?.Nm}
                                            {hwin?<CheckCircle size={15} color='green' className='pl-1'/>:""}
                                        </span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">{event.Tr1 ?? ''}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <img 
                                          src={`https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/medium/${event.T2[0]?.Img}`}
                                          className="w-5 h-5 object-contain" 
                                          alt={event.T2[0]?.Nm}
                                          onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                                        />
                                        <span className="font-medium col-1 flex items-center text-sm text-gray-800">
                                            {event.T2[0]?.Nm}
                                            {awin?<CheckCircle size={15} color='green' className='pl-1'/>:""}
                                        </span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">{event.Tr2 ?? ''}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
"use client";

import Link from "next/link";
import { useLiveScore } from "@/app/(main)/livescore/hook/useLiveScore";
import { Trophy} from "lucide-react";

export default function LiveScore() {
  const getFormattedToday = (): string => {
        const d = new Date();
        return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    };
  const currentDate = getFormattedToday();
  const { data: liveData, loading: isLoading, error } = useLiveScore(currentDate);
  
  if (error) {
    return <div className="w-full h-[200px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 flex items-center justify-center text-red-500">Error</div>;
  }
  const matches = liveData?.Stages.flatMap(stage => stage.Events).slice(0, 12);
  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-4">
        <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
            <Trophy size={12}/>
            <span className="tracking-wide uppercase">Live Score</span>
        </div>

        <Link
            href="/livescore"
            className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1"
        >
            See All
        </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {!isLoading&&liveData?matches?.map((match) => (
            <div 
            key={match.Eid} 
            className="flex items-center p-4 transition-all border-l-4 border-transparent hover:bg-gray-50 bg-white shadow-sm rounded-lg"
            >
            <div className="w-5 flex flex-col justify-center text-left mr-4">
                <span className="text-sm font-semibold text-gray-800">
                {match.Eps}
                </span>
            </div>

            <div className="flex-1 flex flex-col gap-2 border-l border-gray-100 pl-4">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                    src={`https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/medium/${match.T1[0]?.Img}`}
                    className="w-5 h-5 object-contain" 
                    alt={match.T1[0]?.Nm} 
                    onError={(e) => {e.currentTarget.src = '/icons/null.png'}}
                    />
                    <span className="font-medium text-sm text-gray-800">
                    {match.T1[0]?.Nm}
                    </span>
                </div>
                <span className="font-bold text-gray-900 text-sm">{match.Tr1 ?? ''}</span>
                </div>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                    src={`https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/medium/${match.T2[0]?.Img}`}
                    className="w-5 h-5 object-contain" 
                    alt={match.T2[0]?.Nm}
                    />
                    <span className="font-medium text-sm text-gray-800">
                    {match.T2[0]?.Nm}
                    </span>
                </div>
                <span className="font-bold text-gray-900 text-sm">{match.Tr2 ?? ''}</span>
                </div>
            </div>
            </div>
        )):Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center p-4 bg-white shadow-sm rounded-lg animate-pulse"
        >
          <div className="w-5 mr-4">
            <div className="h-4 w-4 bg-gray-300 rounded" />
          </div>
          <div className="flex-1 flex flex-col gap-3 border-l border-gray-100 pl-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-4 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="h-4 w-32 bg-gray-300 rounded" />
              </div>
              <div className="h-4 w-4 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      ))}
        </div>
    </div>
    );
}
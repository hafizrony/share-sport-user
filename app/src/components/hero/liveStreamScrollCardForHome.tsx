"use client";

import Image from "next/image";
import Link from "next/link";
import LiveCard from "@/app/src/components/livecard";
import { useLiveMatch } from "@/app/(main)/livescore/hook/useLiveScore";

type LiveMatchEvent = {
  Eid: string;
  T1: { Nm: string; Img: string; Abr: string }[];
  T2: { Nm: string; Img: string; Abr: string }[];
  Tr1?: number;
  Tr2?: number;
  Esd?: number;
  Eps: string;
};

type LiveStage = {
  Events?: LiveMatchEvent[];
  Snm: string;
};

export default function LiveStreamScrollCardForHome() {
  const { data, isLoading, isError } = useLiveMatch();

  if (isLoading) return <div className="text-center text-gray-500 py-6 font-semibold">
          Loading
        </div>;
  if (isError) {
    console.log("ERROR LIVE :", isError);
    return null;
  }
  
  const stages: LiveStage[] = Array.isArray(data?.Stages) ? data.Stages : [];
  const mainURL = process.env.NEXT_PUBLIC_LIVESCORE_IMAGE_URL;

  const matches = stages.flatMap((stage) =>
    stage.Events?.map((match) => ({
      stageName: stage.Snm,
      ...match,
    })) ?? []
  );

  if (matches.length === 0) {
    return (
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
            <div className="relative w-8 h-8">
              <Image src="/icons/live.gif" alt="Live Icon" fill className="object-contain" unoptimized />
            </div>
            <span className="tracking-wide uppercase">Live Now</span>
          </div>

          <Link
            href="/livestream"
            className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1"
          >
            See All
          </Link>
        </div>

        <div className="text-center text-gray-500 py-6 font-semibold">
          No match live now
        </div>
      </div>
    );
  }

  // HAS LIVE MATCH
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-[#4c3b71] text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 h-10">
          <div className="relative w-8 h-8">
            <Image src="/icons/live.gif" alt="Live Icon" fill className="object-contain" unoptimized />
          </div>
          <span className="tracking-wide uppercase">Live Now</span>
        </div>

        <Link
          href="/livestream"
          className="text-[#4c3b71] font-bold text-sm hover:underline flex items-center gap-1"
        >
          See All
        </Link>
      </div>

      {/* Smooth Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide">
        {matches.map((match) => (
          <div key={match.Eid} className="snap-start shrink-0">
            <LiveCard
              league={match.stageName}
              minute={match.Eps || "-"}
              team1={match.T1?.[0].Abr}
              team2={match.T2?.[0].Abr}
              score={`${match.Tr1 ?? 0} - ${match.Tr2 ?? 0}`}
              logo1={mainURL + "team/medium/" + match.T1?.[0].Img}
              logo2={mainURL + "team/medium/" + match.T2?.[0].Img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import Image from "next/image";
interface LiveCardProps {
    league: string;
    minute: string;
    team1: string;
    team2: string;
    score: string;
    logo1: string;
    logo2: string;
}

export default function LiveCard({
                                     league,
                                     minute,
                                     team1,
                                     team2,
                                     score,
                                     logo1,
                                     logo2,
                                 }: LiveCardProps) {
    return (
        <div className="min-w-[280px] bg-white rounded-xl shadow-sm border border-gray-100 p-4 shrink-0 hover:shadow-md transition">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{league}</span>
                <span className="text-red-500 font-bold animate-pulse">LIVE {minute}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
                <div className="text-center">
                    <img
                        src={logo1}
                        alt={team1}
                        className="w-10 h-10 rounded-full mx-auto mb-1 object-cover"
                        width={100}
                        height={100}
                    />
                    <span className="font-bold text-gray-800">{team1}</span>
                </div>

                {/* Score */}
                <div className="text-xl font-black text-gray-800">{score}</div>

                <div className="text-center">
                    <img
                        src={logo2}
                        alt={team2}
                        className="w-10 h-10 rounded-full mx-auto mb-1 object-cover"
                        width={100}
                        height={100}
                    />
                    <span className="font-bold text-gray-800">{team2}</span>
                </div>
            </div>

            <button className="w-full py-2 bg-[#4c3b71] text-[#ffc107] rounded-lg text-sm font-semibold hover:bg-[#dc3545]">
                Watch Now
            </button>
        </div>
    );
}

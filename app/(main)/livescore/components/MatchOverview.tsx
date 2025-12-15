
import { MapPin, Info, Calendar } from "lucide-react";

export default function MatchOverview({ matchInfo, heroData }: any) {
    const venue = matchInfo?.Vnm || "Stadium info unavailable";
    const location = matchInfo?.Vcy && matchInfo?.VCnm ? `${matchInfo.Vcy}, ${matchInfo.VCnm}` : "";
    const fullVenue = location ? `${venue} - ${location}` : venue;
    const date = matchInfo?.Esd ? matchInfo.Esd.toString() : heroData.time;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {/* Venue Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-[#2f2151] mb-4 uppercase text-xs tracking-wider">
                    <MapPin size={16}/> Venue Info
                </h3>
                <div className="text-sm font-bold text-gray-800">{fullVenue}</div>
            </div>

            {/* Match Details Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-[#2f2151] mb-4 uppercase text-xs tracking-wider">
                    <Info size={16}/> Match Details
                </h3>
                <div className="flex items-center text-sm font-semibold mb-1">
                    <Calendar size={16} className="text-gray-700 mr-2"/>
                    {date && date.length >= 8 
                        ? `${date.slice(6,8)}/${date.slice(4,6)}/${date.slice(0,4)}` 
                        : 'Date TBD'
                    }
                </div>
            </div>
        </div>
    );
}


export default function MatchStats({ stats }: any) {
    const selectedKeys: Record<string, string> = {
        Xg: "Expected Goals",
        Pss: "Possession (%)", Shon: "Shots on target", Shof: "Shots off target",
        Cos: "Corner Kicks", Fls: "Fouls", Ycs: "Yellow cards", YRcs: "Red cards", Ofs: "Offsides",
    };
    
    let statList: any[] = [];
    if (stats) {
        if (Array.isArray(stats)) statList = stats;
        else if (Array.isArray(stats.Stat)) statList = stats.Stat;
        else if (Array.isArray(stats.Stats)) statList = stats.Stats;
    }

    if (statList.length === 0) return <div className="p-10 text-center text-gray-400">No stats available</div>;
    const cleanStats = Object.keys(selectedKeys).map(key => ({
        label: selectedKeys[key],
        home: statList[0]?.[key] ?? 0,
        away: statList[1]?.[key] ?? 0,
    }));

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-center font-bold text-[#2f2151] mb-6 uppercase text-xs tracking-widest border-b border-gray-100 pb-4">Match Statistics</h3>
            {cleanStats.map((s: any, i: number) => {
                const h = Number(s.home);
                const a = Number(s.away);
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
}
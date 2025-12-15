
export const BASE_IMAGE = "https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/team/high/";

export const getImg = (img: string | null) => 
  (img && img !== "NULL" && img !== "undefined") ? `${BASE_IMAGE}${img}` : null;

export const getStartTime = (dateStr: string) => {
  if (!dateStr || dateStr.length < 12) return "--:--";
  const s = dateStr.toString();
  return s.length >= 12 ? `${s.slice(8, 10)}:${s.slice(10, 12)}` : "--:--";
};

// --- LINEUP HELPERS ---

export const processStarters = (lineups: any, teamIndex: number) => {
    if (!lineups?.Lu) return { rows: [], formation: "4-4-2" };
    
    const teamData = lineups.Lu[teamIndex];
    if (!teamData) return { rows: [], formation: "" };

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

export const pairSubs = (subs: any[]) => {
    if (!subs) return [];
    // Sort by minute
    const sortedSubs = [...subs].sort((a, b) => (a.Min - b.Min) || (a.Sor - b.Sor));
    
    const outs = sortedSubs.filter((s: { IT: number; }) => s.IT === 4);
    const ins  = sortedSubs.filter((s: { IT: number; }) => s.IT === 5);
    const usedIn = new Set();
    const pairs: { min: any; out: any; in: any; }[] = [];
    
    outs.forEach((out: { IDo: any; ID: any; Min: any; }) => {
        const matchIndex = ins.findIndex((inn: { ID: any; IDo: any; }, i: unknown) => {
            if (usedIn.has(i)) return false;
            return (String(inn.ID) === String(out.IDo) || String(inn.IDo) === String(out.ID));
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
};

// --- TIMELINE CONSTANTS ---

export const IncidentTypesMap: Record<number, { label: string; icon: string; color: string }> = {
  36: { label: "Goal", icon: "⚽", color: "text-green-600" },
  37: { label: "Penalty Goal", icon: "⚽P", color: "text-green-700" },
  38: { label: "Missed Penalty", icon: "✖️P", color: "text-red-500" },
  39: { label: "Own Goal", icon: "OG", color: "text-red-600" },
  43: { label: "Yellow Card", icon: "█", color: "text-yellow-400" },
  44: { label: "Second Yellow", icon: "█", color: "text-yellow-600" },
  45: { label: "Red Card", icon: "█", color: "text-red-500" },
};
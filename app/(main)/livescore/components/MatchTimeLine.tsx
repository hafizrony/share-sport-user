import { formatMinute, IncidentTypesMap } from "../helper/detailHelper";
import { Scoreboard, MatchIncident } from "../utils/LiveScore.interface";

interface TimelineEvent extends MatchIncident {
  team: "home" | "away";
  displayName: string;
  scoreText?: string;
}

export default function MatchTimeline({ scoreboard }: { scoreboard: Scoreboard }) {
  if (!scoreboard || !scoreboard.Incs) {
    return <div className="p-10 text-center text-gray-400">No summary available</div>;
  }

  let events: TimelineEvent[] = [];

  Object.values(scoreboard.Incs).forEach((arr) => {
  // NO Show Penalti Score
  scoreboard.Incs[4]=[];
  arr?.forEach((e: any) => {
    const team: "home" | "away" = e.Nm === 2 ? "home" : "away";
    const scoreText = e.Sc ? `[${e.Sc[0]}-${e.Sc[1]}]` : "";
    if (e.Incs && e.Incs.length > 0) {
      const goalPlayer = e.Incs.find((inc: any) => inc.IT === 36 || inc.IT === 37);
      const assistPlayer = e.Incs.find((inc: any) => inc.IT === 63);
      if (goalPlayer) {
        let displayName = goalPlayer.Pn;
        if (assistPlayer) displayName += ` (${assistPlayer.Pn})`;
        events.push({ 
          ...e, 
          team, 
          displayName, 
          IT: goalPlayer.IT, 
          scoreText 
        });
        return;
      }
    }
    events.push({
      ...e,
      team,
      displayName: e.Pn || (e.Fn ? `${e.Fn} ${e.Ln}` : "Unknown Event"),
      scoreText
    });
  });
});
  events.sort((a, b) =>(a.Min + (a.MinEx || 0)) -(b.Min + (b.MinEx || 0)));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase text-gray-500 tracking-wider">
          Match Timeline
        </div>

        <div className="relative py-8 px-4">
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100 -translate-x-1/2" />

          {events.map((e, i) => {
            const isHome = e.team === "home";
            const incident =
              IncidentTypesMap[e.IT] || { label: "Event", icon: "", color: "bg-gray-400" };

            const nameParts = e.displayName.split("(");

            return (
              <div
                key={i}
                className={`flex items-center mb-6 relative ${
                  isHome ? "justify-end" : "justify-start"
                }`}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  w-13 h-8 bg-white border border-gray-200 rounded-full
                  flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm z-10">
                  {formatMinute(e.Min, e.MinEx)}
                </div>

                <div
                  className={`w-[42%] flex items-center gap-3 ${
                    isHome ? "justify-end md:pr-10" : "justify-start md:pl-10"
                  }`}
                >
                  <div className="flex flex-col text-sm font-bold text-gray-800">
                    <span>{nameParts[0]}</span>

                    {nameParts[1] && (
                      <span className="text-gray-300 text-[10px]">
                        ({nameParts[1].replace(")", "")})
                      </span>
                    )}

                    <span className="text-gray-500 text-[10px]">
                      {incident.label} {e.scoreText}
                    </span>
                  </div>

                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                    shadow-sm text-sm ${incident.color || ""}`}
                  >
                    {incident.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

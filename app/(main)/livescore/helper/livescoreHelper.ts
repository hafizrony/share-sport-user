
export const getFormattedToday = (): string => {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
};
export function getAPEvents(stage: any) {
    return stage?.Events.filter((event: { Eps: string; })=> event.Eps === "AP");
}
export const getMatchDetailUrl = (liveData: any, matchId: string): string | null => {

    let foundMatch: any = null;
    if (liveData?.Stages) {
        for (const stage of liveData.Stages) {
            const match = stage.Events.find((e: any) => e.Eid === matchId);
            if (match) {
                foundMatch = match;
                break;
            }
        }
    }

    if (!foundMatch) return null;
    const params = new URLSearchParams({
        hName: foundMatch.T1?.[0]?.Nm || "Home",
        aName: foundMatch.T2?.[0]?.Nm || "Away",
        hImg: foundMatch.T1?.[0]?.Img || "",
        aImg: foundMatch.T2?.[0]?.Img || "",
        status: foundMatch.Eps || "NS",
        scoreH: foundMatch.Tr1 || "0",
        scoreA: foundMatch.Tr2 || "0",
        time: foundMatch.Esd?.toString() || ""
    });

    return `/livescore/${matchId}?${params.toString()}`;
};
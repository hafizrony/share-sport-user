export interface League {
  Cid: string;
  Cnm: string;
  Ccd: string;
  Csnm?: string;
  Stages?: any[];
}

export interface LeagueData {
  Ccg: League[];
}

export interface Team {
  Nm: string;
  Img: string;
}

export interface MatchEvent {
  Eid: string;
  Eps: string; // Status (FT, AET, etc.)
  Esd: number; // Start date/time
  T1: Team[];
  T2: Team[];
  Tr1?: string; // Score Team 1
  Tr2?: string; // Score Team 2
}

export interface Stage {
  Sid: string;
  Snm: string; // Stage Name
  Cnm: string; // Country Name
  Ccd: string; // Country Code (for flag)
  Cid: string; // Country ID
  Scd: string; // Season Code
  Events: MatchEvent[];
}

export interface LiveScoreResponse {
  Stages: Stage[];
}

export interface H2HRoot {
  Eid: string;
  H2H: H2HMatch[];
}

export interface H2HMatch {
  Eid?: string;
  T1: TeamDetail[];
  T2: TeamDetail[];
  Tr1: string; // Score Team 1
  Tr2: string; // Score Team 2
  Stg: Stage;
  Esid: number;
  Eps: string; // "FT" etc.
  Epr: number;
  Ewt: number;
  Esd: number; // Date as number: 20250420130000
}

export interface TeamDetail {
  Nm: string;
  ID: string;
  Img: string;
  Abr: string;
  CoNm?: string;
}
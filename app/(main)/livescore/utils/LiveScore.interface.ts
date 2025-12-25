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
  Trp1?:string;
  Trp2?:string;
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

export interface Scoreboard {
  Eid: string;
  Tr1: string;
  Tr2: string;
  Tr1ET: string;
  Tr2ET: string;
  Trh1: string;
  Trh2: string;
  Tr1OR: string;
  Tr2OR: string;
  Incs: Incs;
}

export interface Incs {
  "1"?: MatchIncident[];
  "2"?: MatchIncident[];
  "3"?: MatchIncident[];
  "4"?: MatchIncident[];
}

export interface MatchIncident {
  Min: number;
  MinEx?: number;
  Nm: number;
  PosA: number;
  Aid: string;
  ID: string;
  Fn: string;
  Ln: string;
  Snm?: string;
  Pnt: string;
  Pnum: number;
  Pn: string;
  PnumO: number;
  IT: number;
  Sc: number[];
  Sor: number;
}


import { LiveScoreResponse } from "../utils/LiveScore.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;

export const LiveScoreServices = {
  getMatchesByDate: async (date: string, timezone: string = '7'): Promise<LiveScoreResponse> => {
    if (!API_URL || !API_KEY || !API_HOST) {
      throw new Error('API Configuration missing');
    }
    const response = await fetch(
      `${API_URL}/matches/v2/list-by-date?Category=soccer&Date=${date}&Timezone=${timezone}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return await response.json();
  },

  getStandings: async (ccd: string, scd: string) => {
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');

    const response = await fetch(
      `${API_URL}/leagues/v2/get-table?Category=soccer&Ccd=${ccd}&Scd=${scd}`,
      {
        method: 'GET',
        headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
      }
    );
    if (!response.ok) throw new Error('Failed to fetch table');
    return await response.json();
  },

  getMatchInfo: async (eid: string, category: string = 'soccer') => {
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-info?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchLineups: async (eid: string, category: string = 'soccer') => {
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-lineups?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchStats: async (eid: string, category: string = 'soccer') => {
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-statistics?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchH2H: async (eid: string, category: string = 'soccer') => {
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-h2h?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },
  getLiveMatch: async(category: string = 'soccer') => {
      if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
        const response = await fetch(`${API_URL}/matches/v2/list-live?Category=${category}&Timezone=-7`, {
            method: 'GET',
            headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
        });
        return response.json();
  },
  getScoreboard: async(eid:string,category: string = 'soccer') => {
      if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
        const response = await fetch(`${API_URL}/matches/v2/get-incidents?Category=${category}&Eid=${eid}`, {
            method: 'GET',
            headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
        });
        return response.json();
  }
};
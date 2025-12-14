// services/LiveScoreServices.ts
import { LiveScoreResponse } from "../utils/LiveScore.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST;
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
let requestCount = 0;
export const LiveScoreServices = {
  getMatchesByDate: async (date: string, timezone: string = '7'): Promise<LiveScoreResponse> => {
    requestCount++;
    console.log(`LiveScoreServices - getMatchesByDate called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) {
      throw new Error('API Configuration missing');
    }

    const cacheKey = `livescore_${date}`;
    
    // 1. Check Local Storage for Cache
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsedCache = JSON.parse(cached);
        const now = new Date().getTime();
        
        // If cache is valid (less than 2 hours old), return it
        if (now - parsedCache.timestamp < CACHE_DURATION) {
          console.log(`Using cached data for ${date}`);
          return parsedCache.data;
        }
      }
    }

    console.log(`Fetching new data for ${date}`);
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

    const data = await response.json();

    // 3. Save to Local Storage
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: new Date().getTime(),
        data: data
      }));
    }

    return data;
  },

  getStandings: async (ccd: string, scd: string) => {
    requestCount++;
    console.log(`LiveScoreServices - getStandings called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');

    const cacheKey = `livescore_table_${ccd}_${scd}`;

    // 1. Check Local Storage
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    }

    // 2. Fetch from API
    const response = await fetch(
      `${API_URL}/leagues/v2/get-table?Category=soccer&Ccd=${ccd}&Scd=${scd}`,
      {
        method: 'GET',
        headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch table');
    const data = await response.json();

    // 3. Save to Local Storage
    if (typeof window !== 'undefined') {
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
    }

    return data;
  },

  getMatchInfo: async (eid: string, category: string = 'soccer') => {
    requestCount++;
    console.log(`LiveScoreServices - getMatchInfo called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-info?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchLineups: async (eid: string, category: string = 'soccer') => {
    requestCount++;
    console.log(`LiveScoreServices - getMatchLineups called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-lineups?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchStats: async (eid: string, category: string = 'soccer') => {
    requestCount++;
    console.log(`LiveScoreServices - getMatchStats called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-statistics?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },

  getMatchH2H: async (eid: string, category: string = 'soccer') => {
    requestCount++;
    console.log(`LiveScoreServices - getMatchH2H called ${requestCount} times`);
    if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
    const response = await fetch(`${API_URL}/matches/v2/get-h2h?Category=${category}&Eid=${eid}`, {
      method: 'GET',
      headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
    });
    return response.json();
  },
  getLiveMatch: async(category: string = 'soccer') => {
        requestCount++;
        console.log(`LiveScoreServices - getLiveMatch called ${requestCount} times`);
      if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
        const response = await fetch(`${API_URL}/matches/v2/list-live?Category=${category}&Timezone=-7`, {
            method: 'GET',
            headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
        });
        return response.json();
  },
  getScoreboard: async(eid:string,category: string = 'soccer') => {
        requestCount++;
        console.log(`LiveScoreServices - getScoreboard called ${requestCount} times`);
      if (!API_URL || !API_KEY || !API_HOST) throw new Error('API Config missing');
        const response = await fetch(`${API_URL}/matches/v2/get-incidents?Category=${category}&Eid=${eid}`, {
            method: 'GET',
            headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST }
        });
        return response.json();
  }
};
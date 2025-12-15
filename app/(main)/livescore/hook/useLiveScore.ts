import { useState, useEffect } from 'react';
import { LiveScoreServices } from '../services/LiveScoreServices';
import { LiveScoreResponse } from '../utils/LiveScore.interface';
import {useQuery} from "@tanstack/react-query";

  export const useLiveScore = (date: string) => {
    const [data, setData] = useState<LiveScoreResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await LiveScoreServices.getMatchesByDate(date);
          setData(result);
        } catch (err:any) {
          setError(err.message || 'Something went wrong');
        } finally {
          setLoading(false);
        }
      };

      if (date) {
        fetchData();
      }
    }, [date]);

    return { data, loading, error };
  };
  export function useLiveMatch(category: string = 'soccer') {
      return useQuery({
          queryKey: ['live-match', category],
          queryFn: async () => {
              return await LiveScoreServices.getLiveMatch(category);
          },
          initialData: [],
      });
  }
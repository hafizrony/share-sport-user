import { useQuery } from '@tanstack/react-query';
import ApiService from '../utils/api';

export const useBanner = () => {
    return useQuery({
        queryKey: ['banner'],
        queryFn: () => ApiService.getInstance().fetchBanner(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
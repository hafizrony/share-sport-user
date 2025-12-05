import {useQuery} from "@tanstack/react-query";
import ApiService from "@/app/src/utils/api";


export const useNews = () => {
    return useQuery({
        queryKey: ['news'],
        queryFn: () => ApiService.getInstance().fetchNews(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
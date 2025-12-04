import {useQuery} from "@tanstack/react-query";
import ApiService from "@/app/src/utils/api";

export const useCategories = () => {
    return useQuery(
        {
            queryKey: ['categories'],
            queryFn:()=>ApiService.getInstance().fetchCategory(),
            staleTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        });
}
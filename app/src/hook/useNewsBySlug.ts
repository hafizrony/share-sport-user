import {useQuery} from "@tanstack/react-query";
import ApiService from "@/app/src/utils/api";

export const useNewsBySlug=(slug:string)=>{
    return useQuery({
        queryKey:['news',slug],
        queryFn:()=> ApiService.getInstance().fetchNewsBySlug(slug),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
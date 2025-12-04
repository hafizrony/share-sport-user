import {useQuery} from "@tanstack/react-query";
import ApiService from "@/app/src/utils/api";

export const useHighlightBySlug=(slug:string)=>{
    return useQuery({
        queryKey:['highlights',slug],
        queryFn:()=> ApiService.getInstance().fetchHighlightBySlug(slug),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}
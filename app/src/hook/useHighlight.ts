import {useQuery} from "@tanstack/react-query";
import ApiService from "@/app/src/utils/api";


export const useHighlight = ()=>{
    return useQuery({
        queryKey:['highlights'],
        queryFn: ()=> ApiService.getInstance().fetchHighlight(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}
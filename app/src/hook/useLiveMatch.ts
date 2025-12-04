import {useQuery} from "@tanstack/react-query";
import ApiService from '../utils/api';

export const useLiveMatch =()=>{
    return useQuery({
        queryKey:["list_live"],
        queryFn:()=>ApiService.getInstance().fetchLiveMatch(),
    });
}
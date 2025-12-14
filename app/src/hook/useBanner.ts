import { useQuery } from '@tanstack/react-query';
import ApiService from '../utils/api';
import {useMemo} from "react";
import {Banner} from "@/app/src/interface/banner.interface";

export const useBanner = () => {
    return useQuery({
        queryKey: ['banner'],
        queryFn: () => ApiService.getInstance().fetchBanner(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};

export const useSidebarBanners = () => {
    const { data: banners, ...rest } = useBanner();
    const sidebarBanners = useMemo(() => {
        return (banners || []).filter((banner: Banner) => {
            if (banner.position !== "sidebar") return false;

            const now = new Date();
            const start = new Date(banner.start_at);
            const end = new Date(banner.end_at);

            return now >= start && now <= end;
        });
    }, [banners]);
    return { sidebarBanners, ...rest };
};
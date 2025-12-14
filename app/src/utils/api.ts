import {ENDPOINTS} from "@/app/src/utils/endpoints";

class ApiService {

    private static instance: ApiService;
    private constructor() {}

    public static getInstance() {
        if (!ApiService.instance) ApiService.instance = new ApiService();
        return ApiService.instance;
    }

    async fetchBanner()
    {
        const url = ENDPOINTS.BANNER;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }

    async fetchNews()
    {
        const url = ENDPOINTS.NEWS;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }
    async fetchHighlight()
    {
        const url = ENDPOINTS.HIGHLIGHT;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }
    async fetchHighlightBySlug(slug: string)
    {
        const url = `${ENDPOINTS.HIGHLIGHT}/${slug}`;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }
    async fetchNewsBySlug(slug: string)
    {
        const url = `${ENDPOINTS.NEWS}/${slug}`;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }
    async fetchCategory()
    {
        const url = ENDPOINTS.CATEGORY;
        try {
            const response = await fetch(url,{
                next:{revalidate:60}
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }
}
export default ApiService;
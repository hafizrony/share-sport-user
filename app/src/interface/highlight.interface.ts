export interface Highlight {
    id: string | number;
    slug: string;
    video_url: string;
    category: { slug : string,name:string };
    title: string;
    thumbnail_url: string;
    views_count: number;
    published_at: string;
    summary: string;
}
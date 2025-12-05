export interface News{
    id: string|number;
    title: string;
    summary: string;
    content: string;
    slug: string;
    thumbnail_url: string;
    category: { slug : string,name:string };
    views_count: number;
    published_at: string;
    image_url: string;
    author:{name:string};
}
"use client"
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {useParams} from "next/navigation";
import {useNewsBySlug} from "@/app/src/hook/useNewsBySlug";
import React, {useEffect} from "react";
import {ENDPOINTS} from "@/app/src/utils/endpoints";
import Link from "next/link";
import Loader from "@/app/src/components/loader";
import {Eye, Calendar} from "lucide-react";
import {Banner} from "@/app/src/interface/banner.interface";
import AdBanner from "@/app/src/components/adsBanner";
import {useSidebarBanners} from "@/app/src/hook/useBanner";


export default function NewsDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const { data, isLoading, isError } = useNewsBySlug(slug);
    const {sidebarBanners:sidebarBanners,isLoading:isBannerLoading,isError:isBannerError}=useSidebarBanners();

    useEffect(() => {
        if (data?.id) {
            const countView = async () => {
                try {
                    const url = `${ENDPOINTS.NEWS}/${data.id}`;
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.error("Error counting view:", error);
                }
            };

            countView().then();
        }
    }, [data]);

    const formatViews = (num: number) => {
        if (!num) return "0";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toString();
    };


    if (isLoading||isBannerLoading) {
        return <Loader/>;
    }

    if (isError || !data||isBannerError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900">News not found</h2>
                    <Link href="/news" className="text-blue-500 hover:underline mt-2 block">
                        Back to News
                    </Link>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(data.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const displayImage = data?.image_url ? (data.image_url.startsWith('http') ? data.image_url : `${ENDPOINTS.IMAGES}${data.image_url}`) : '/placeholder.png';
    const showRightSidebar = sidebarBanners.length > 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
                <div className={showRightSidebar?"lg:col-span-9  overflow-hidden":"lg:col-span-12  overflow-hidden"}>
                    <h1 className="text-3xl md:text-4xl pb-4 leading-9 font-extrabold">{data.title}</h1>
                    <p className=" text-gray-500 pb-8">{data.summary}</p>
                    <div className="relative w-full h-[300px] md:h-[450px]">
                        <Image
                        src={displayImage}
                        alt={data.title}
                        fill
                        priority
                        className="object-cover"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-[#483D67] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                                {data.category.name}
                            </span>
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500 border-b pb-4 mb-6">
                            <span className="flex items-center gap-2 text-gray-500">
                                <Eye className="w-5 h-5" />
                                {formatViews(data.views_count)} views
                            </span>
                            <span className="flex items-center gap-2 text-gray-500">
                                <Calendar className="w-5 h-5" />
                                {formattedDate}
                            </span>
                        </div>
                        <article className="prose max-w-none
                                            text-[18px]
                                            text-gray-800
                                            leading-7
                                            tracking-normal
                                            prose-headings:text-[#111]
                                            prose-headings:font-bold
                                            prose-h1:text-4xl
                                            prose-h2:text-3xl
                                            prose-h3:text-2xl
                                            prose-p:my-4
                                            prose-strong:text-[#000]
                                            prose-a:text-blue-600
                                            prose-a:no-underline
                                            prose-a:hover:underline
                                           ">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}

                            >
                                {data.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
                {showRightSidebar && (
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-4 space-y-6">
                            <div className="space-y-4">
                                {sidebarBanners.map((item: Banner) => (
                                    <div key={item.id}>
                                        <AdBanner
                                            image_url={item.image_url}
                                            title={item.title}
                                            link_url={item.link_url}
                                            id={item.id}
                                            position={item.position}
                                            start_at={item.start_at}
                                            end_at={item.end_at}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

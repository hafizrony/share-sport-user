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


export default function NewsDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const { data, isLoading, isError } = useNewsBySlug(slug);

    useEffect(() => {
        if (data?.id) {
            const countView = async () => {
                try {
                    const url = `${ENDPOINTS.NEWS}/${data.id}`;
                    console.log("video", url);
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

    if (isLoading) {
        return <Loader/>;
    }

    if (isError || !data) {
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

    const displayImage =
        data?.image_url
            ? (data.image_url.startsWith('http')
                ? data.image_url
                : `https://pub-64a1f52f8ce34898ad37705d90a1d23b.r2.dev/${data.image_url}`)
            : '/placeholder.png';
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8  overflow-hidden">
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

                    <div className="p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-black mb-4">{data.title}</h1>
                        <div className="flex gap-3 text-sm text-gray-500 border-b pb-4 mb-6">
                            <span>{data.author.name}</span>
                            <span>• {formattedDate}</span>
                            <span>• {data.views_count} views</span>
                        </div>
                        <article className="prose prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {data.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}

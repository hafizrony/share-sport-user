import {News} from "@/app/src/interface/news.interface"
import Link from "next/link"
import { Calendar,Eye } from "lucide-react";
import {AgoTime} from "@/app/src/utils/agoTime";
import {ENDPOINTS} from "@/app/src/utils/endpoints";
export default function NewsStandardCard({
                                             title,
                                             thumbnail_url,
                                             slug,
                                             category,
                                             views_count,
                                             published_at,
                                             summary,
                                         }: News) {

    const formatViews = (num: number) => {
        if (!num) return "0";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "k";
        return num.toString();
    };

    return (
        <Link
            href={`/news/${slug}`}
            className="group block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full"
        >
            <div className="flex flex-col sm:flex-row h-full">

                <div className="relative w-full sm:w-48 md:w-56 shrink-0 aspect-video sm:aspect-auto">
                    <img
                        src={`${ENDPOINTS.IMAGES}${thumbnail_url}` || "/placeholder.jpg"}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge (Mobile only - hidden on desktop list view to keep it clean) */}
                    {category && (
                        <span className="absolute top-2 left-2 bg-[#4c3b71] text-white text-[10px] font-bold px-2 py-1 rounded sm:hidden">
              {category.name}
            </span>
                    )}
                </div>

                {/* CONTENT SECTION */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                        {/* Metadata Top */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            {category && (
                                <span className="text-[#4c3b71] font-bold hidden sm:block">
                  {category.name.toUpperCase()}
                </span>
                            )}
                            <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{AgoTime(published_at)}</span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-[#4c3b71] transition-colors line-clamp-2">
                            {title}
                        </h3>

                        {/* Summary */}
                        <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3">
                            {summary || "No summary available for this article."}
                        </p>
                    </div>

                    {/* Footer Metadata */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Eye size={12} />
                            <span>{formatViews(views_count)} views</span>
                        </div>
                        <span className="text-xs font-medium text-[#4c3b71] group-hover:underline">
                Read Article
             </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
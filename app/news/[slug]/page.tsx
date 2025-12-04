
import Image from "next/image";
import Link from "next/link";
import SidebarRight from "../../src/components/sidebarRight";
import ReactMarkdown from "react-markdown";

interface NewsData {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    image_url: string;
    thumbnail_url: string;
    published_at: string;
    views_count: number;
    category: { name: string };
    author: { name: string };
    tags: Array<{ id: number; name: string; slug: string }>;
}

// ---------------- FETCH API ----------------
async function getNews(slug: string): Promise<NewsData> {
    const res = await fetch(`http://localhost:8000/api/${slug}`, {
        next: { revalidate: 60 }, // ISR caching
    });
    if (!res.ok) throw new Error("Failed to fetch news");
    return res.json();
}

// ---------------- PAGE COMPONENT ----------------
export default async function NewsDetailPage({params}: {
    params: { slug: string };
}) {
    const data = await getNews(params.slug);

    const formattedDate = new Date(data.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const displayImage =
        data.image_url.startsWith("http") ?
            data.image_url :
            `${process.env.IMAGE_URL}/${data.image_url}`;

    return (
        <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT MAIN CONTENT */}
            <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Cover image */}
        <div className="relative w-full h-[300px] md:h-[450px]">
    <Image
        src={displayImage}
    alt={data.title}
    fill
    priority
    className="object-cover"
    />
    <div className="absolute top-4 left-4">
    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
        {data.category.name}
        </span>
        </div>
        </div>

    {/* Content Area */}
    <div className="p-6 md:p-8">
    <h1 className="text-3xl md:text-4xl font-black mb-4">{data.title}</h1>

        <div className="flex gap-3 text-sm text-gray-500 border-b pb-4 mb-6">
        <span>{data.author.name}</span>
        <span>• {formattedDate}</span>
    <span>• {data.views_count} views</span>
    </div>

    <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{data.content}</ReactMarkdown>
        </article>

    {/* Tags */}
    <div className="mt-8 pt-6 border-t">
    <h3 className="text-sm font-bold text-gray-400 mb-2 uppercase">Tags</h3>
        <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
                <Link
                    key={tag.id}
            href={`/tag/${tag.slug}`}
    className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition"
        >
#{tag.name}
    </Link>
))}
    </div>
    </div>
    </div>
    </div>

    {/* RIGHT SIDEBAR */}
    <aside className="lg:col-span-4 space-y-8">
        <SidebarRight />
        </aside>
        </div>
        </div>
);
}

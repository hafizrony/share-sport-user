import SidebarLeft from "../src/components/sidebarLeft";
import SidebarRight from "../src/components/sidebarRight";
import Image from "next/image";

export default function NewsPage() {
    const categories = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1", "Cambodia League"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* LEFT: Categories */}
            <aside className="hidden lg:block lg:col-span-3">
                <SidebarLeft title="News Categories" items={categories} />
            </aside>

            {/* CENTER: News Content */}
            <main className="col-span-1 lg:col-span-6">
                <h1 className="text-3xl font-black mb-6 text-gray-900">Sports News</h1>

                {/* 1. Big First News Card */}
                <div className="mb-8 bg-white rounded-xl overflow-hidden shadow-md group cursor-pointer">
                    <div className="relative h-64 w-full">
                        <Image src="https://placehold.co/800x400?text=Breaking+News" alt="Main News" fill className="object-cover group-hover:scale-105 transition duration-500"/>
                    </div>
                    <div className="p-6">
                        <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Transfer Market</span>
                        <h2 className="text-2xl font-bold mt-2 text-gray-900 group-hover:text-blue-600 transition">
                            Mbappe agrees to massive deal with Real Madrid starting next season
                        </h2>
                        <p className="text-gray-600 mt-3 line-clamp-2">
                            The French superstar has finally made his decision after months of speculation...
                        </p>
                    </div>
                </div>

                {/* 2. List Small News Underneath */}
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image src={`https://placehold.co/400x300?text=News+${item}`} alt="news" fill className="object-cover hover:scale-110 transition"/>
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2">
                                    Liverpool Klopp announces shock departure at end of season
                                </h3>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                    The German manager stated he is running out of energy and needs a break from football.
                                </p>
                                <span className="text-xs text-gray-400 mt-2">Nov 27, 2025</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* RIGHT: Ads & Socials */}
            <aside className="hidden lg:block lg:col-span-3">
                <SidebarRight />
            </aside>
        </div>
    );
}
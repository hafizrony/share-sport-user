export default function MatchListSkeleton() {
    return <div className="w-full mb-6 animate-pulse">
        {/* League Header Skeleton (The Purple Bar area) */}
        <div className="bg-gray-200 rounded-t-xl h-[60px] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-32" />
                    <div className="h-2 bg-gray-300 rounded w-20" />
                </div>
            </div>
            <div className="h-3 bg-gray-300 rounded w-16" />
        </div>

        {/* Matches Container */}
        <div className="bg-white rounded-b-xl border border-t-0 border-gray-100 overflow-hidden">
            {[1, 2, 3,4,5].map((i) => (
                <div key={i} className="flex items-center p-4 min-h-20">
                    {/* Status (FT/Time) */}
                    <div className="w-12">
                        <div className="h-3 bg-gray-200 rounded w-6" />
                    </div>

                    {/* Team Info Group */}
                    <div className="flex-1 flex flex-col gap-4 border-l border-gray-100 pl-4">
                        {/* Team 1 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-gray-100 rounded" /> {/* Team Logo */}
                                <div className="h-4 bg-gray-200 rounded w-40" /> {/* Team Name */}
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-4" /> {/* Score */}
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-gray-100 rounded" /> {/* Team Logo */}
                                <div className="h-4 bg-gray-200 rounded w-36" /> {/* Team Name */}
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-4" /> {/* Score */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default function NewsHeroSkeleton() {
    return (
        <section className="w-full my-8 animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
                <div className="relative w-full h-64 lg:h-full bg-gray-200 rounded-xl overflow-hidden">
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="h-5 w-20 bg-gray-300 rounded mb-3"></div>
                        <div className="h-8 w-3/4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-8 w-1/2 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-300 rounded mt-1"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 h-full">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-xl border border-gray-100 h-full items-center">
                            <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
                            <div className="flex flex-col flex-grow py-2 justify-between h-24">
                                <div className="h-3 w-16 bg-gray-200 rounded-full mb-1"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                                    <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
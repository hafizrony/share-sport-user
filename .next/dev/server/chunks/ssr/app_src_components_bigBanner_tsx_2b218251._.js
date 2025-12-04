module.exports = [
"[project]/app/src/components/bigBanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BigBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const useBanner = ()=>{
    return {
        data: [
            {
                id: 1,
                link_url: "https://example.com/promo1",
                image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1774&q=80" // Placeholder image
            },
            {
                id: 2,
                link_url: "https://example.com/promo2",
                image_url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" // Placeholder image
            },
            {
                id: 3,
                link_url: "https://example.com/promo3",
                image_url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" // Placeholder image
            }
        ],
        isLoading: false,
        isError: false
    };
};
function BigBanner() {
    const [current, setCurrent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const { data: ads, isLoading, isError } = useBanner();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Only start the interval if we have ads
        if (!ads || ads.length === 0) return;
        const timer = setInterval(()=>{
            setCurrent((prev)=>(prev + 1) % ads.length);
        }, 5000);
        return ()=>clearInterval(timer);
    }, [
        ads
    ]);
    if (isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-[200px] md:h-[400px] bg-gray-100 animate-pulse rounded-xl my-6 flex items-center justify-center text-gray-400",
        children: "Loading..."
    }, void 0, false, {
        fileName: "[project]/app/src/components/bigBanner.tsx",
        lineNumber: 43,
        columnNumber: 27
    }, this);
    if (isError) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden"
    }, void 0, false, {
        fileName: "[project]/app/src/components/bigBanner.tsx",
        lineNumber: 45,
        columnNumber: 25
    }, this);
    if (!ads || ads.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-xl shadow-lg my-6 group bg-gray-50",
        children: [
            ads.map((ad, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: ad.link_url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: `absolute inset-0 transition-opacity duration-1000 ease-in-out block ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: ad.image_url,
                        alt: "Advertisement",
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/app/src/components/bigBanner.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this)
                }, ad.id || index, false, {
                    fileName: "[project]/app/src/components/bigBanner.tsx",
                    lineNumber: 52,
                    columnNumber: 17
                }, this)),
            ads.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20",
                children: ads.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCurrent(idx),
                        className: `w-3 h-3 rounded-full transition-colors duration-300 ${current === idx ? "bg-white scale-110 shadow-md" : "bg-white/50 hover:bg-white/80"}`,
                        "aria-label": `Go to slide ${idx + 1}`
                    }, idx, false, {
                        fileName: "[project]/app/src/components/bigBanner.tsx",
                        lineNumber: 74,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/src/components/bigBanner.tsx",
                lineNumber: 72,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/src/components/bigBanner.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=app_src_components_bigBanner_tsx_2b218251._.js.map
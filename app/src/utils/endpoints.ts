const BASE_URL = 'http://localhost:8000/api';
export const ENDPOINTS = {
    NEWS: `${BASE_URL}/news`,
    HIGHLIGHT: `${BASE_URL}/highlights`,
    VIEW_HIGHLIGHT: `${BASE_URL}/highlight`,
    BANNER: `${BASE_URL}/banners`,
    CATEGORY: `${BASE_URL}/categories`,
    LIVE_MATCH:`https://livescore6.p.rapidapi.com/matches/v2/list-live`,
}
// Route::get('/news', [NewsController::class, 'index']);
// Route::get('/news/{slug}', [NewsController::class, 'showBySlug']);
// Route::get('/highlights', [HighlightController::class, 'index']);
// Route::get('/highlights/{slug}', [HighlightController::class, 'showBySlug']);
// Route::get('/categories', [CategoryController::class, 'index']);
// Route::get('/tags', [TagController::class, 'index']);
// Route::get('/banners', [BannerController::class, 'index']);
// Route::post('/news/{news}', [LikeViewController::class, 'storeViewForNews']);
// Route::post('/highlight/{highlight}', [LikeViewController::class, 'storeViewForHighlight']);
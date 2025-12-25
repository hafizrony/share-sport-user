
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL;
export const ENDPOINTS = {
    NEWS: `${BASE_URL}/news`,
    HIGHLIGHT: `${BASE_URL}/highlights`,
    VIEW_HIGHLIGHT: `${BASE_URL}/highlight`,
    BANNER: `${BASE_URL}/banners`,
    CATEGORY: `${BASE_URL}/categories`,
    IMAGES:process.env.NEXT_PUBLIC_IMAGE_URL,
}
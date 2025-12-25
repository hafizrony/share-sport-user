# Frontend – Next.js (React + TypeScript)

This is the **frontend application** built with **Next.js**, **React**, and **TypeScript**, designed to consume the Laravel backend API and work seamlessly with the admin and storage system.

---

## 🚀 Tech Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Axios / Fetch API**
* **Environment-based configuration**

---

## 📌 Backend Integration

This frontend connects to the Laravel backend:

| Service      | URL                            |
| ------------ | ------------------------------ |
| API Base URL | `http://localhost:8000/api/`   |
| Admin Panel  | `http://localhost:8000/admin/` |

---

## 📂 Project Structure

```bash
src/
 ├── app/            # Next.js App Router
 ├── components/     # Reusable UI components
 ├── services/       # API services
 ├── hooks/          # Custom React hooks
 ├── types/          # TypeScript types & interfaces
 └── utils/          # Helper functions
```

---

## ⚙️ Requirements

Make sure you have:

* Node.js >= 18
* npm or yarn or pnpm

---

## 🛠️ Installation

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

---

## 🔐 Environment Configuration

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_BASE_URL="http://localhost:8000/api"
NEXT_PUBLIC_IMAGE_URL="https://pub-64a1f52f8ce34898ad37705d90a1d23b.r2.dev/"

# LiveScore RapidAPI
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key
NEXT_PUBLIC_RAPIDAPI_HOST=livescore6.p.rapidapi.com
NEXT_PUBLIC_API_URL=https://livescore6.p.rapidapi.com

# LiveScore Image Proxy
NEXT_PUBLIC_LIVESCORE_IMAGE_URL="https://getimage.membertsd.workers.dev/?url=https://storage.livescore.com/images/"
```
---

## 🌐 API & Data Fetching Architecture

This project uses **React Query (`useQuery`)**, **custom hooks**, and a centralized **`apiServices`** layer for clean and scalable data fetching.

### 📁 Structure

```bash
src/
 ├── services/apiServices.ts   # Axios / fetch configuration
 ├── hooks/useMatches.ts       # Custom hooks using useQuery
```

---

## 🔌 API Service (`apiServices`)

```ts

async fetchBanner()
    {
        const url = ENDPOINTS.BANNER;
        try {
            const response = await fetch(url,{
                next: { revalidate: 60 }
            });
            return await response.json();
        }catch (e) {
            console.log("API Service",e)
        }
    }

```

---

## 🪝 Custom Hook with `useQuery`

```ts
export const useBanner = () => {
    return useQuery({
        queryKey: ['banner'],
        queryFn: () => ApiService.getInstance().fetchBanner(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
```

---

## 🧩 Usage in Component

```tsx
"use client";

import { useMatches } from "@/hooks/useMatches";

export default function MatchList() {
  const { data, isLoading, error } = useMatches();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul>
      {data?.map((item: any) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

---


## ▶️ Running the Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## 🔒 Authentication Notes

* Authentication is handled via Laravel API
* Token-based auth (Sanctum / JWT supported)
* Tokens should be stored securely (HTTP-only cookies recommended)

---

## 🎨 Styling

* Tailwind CSS configured via `tailwind.config.ts`
* Global styles in `globals.css`

---

## 🧑‍💻 Author

Frontend built with **Next.js + React + TypeScript** to integrate with a Laravel backend.


"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const sideAds = [
    "https://placehold.co/300x250/22c55e/FFF?text=Side+Ad+1",
    "https://placehold.co/300x250/eab308/000?text=Side+Ad+2",
];

export default function SmallBanner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % sideAds.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full rounded-lg overflow-hidden shadow-md my-4">
            <a href="#" target="_blank">
                <Image
                    src={sideAds[index]}
                    width={300}
                    height={250}
                    alt="Side Ad"
                    className="w-full h-auto object-cover"
                />
            </a>
        </div>
    );
}
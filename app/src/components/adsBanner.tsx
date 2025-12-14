import Link from "next/link";
import React from "react";
import {Banner} from "../interface/banner.interface"
import {ENDPOINTS} from "@/app/src/utils/endpoints";

const AdBanner = ({image_url, title,link_url}:Banner) => (
    <Link href={link_url}
          target="_blank"
    >
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-[#4c3b71] mb-6 sticky top-6 shadow-sm">
            <span className="text-[10px] uppercase tracking-widest mb-3 text-[#4c3b71]">{title}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${ENDPOINTS.IMAGES}${image_url}`}
                alt={title}
                loading="eager"
                width={800}
                height={400}
                className="rounded-xl"
            />
        </div>
    </Link>
);
export default AdBanner;
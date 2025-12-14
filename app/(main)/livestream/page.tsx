"use client";

import Link from 'next/link';
import { Hammer, ArrowLeft, Construction } from 'lucide-react';
export default function LivestreamPage () {
    return <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 font-sans">
      
      <div className="max-w-md w-full text-center">
        
        {/* Animated Icon Container */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-[#6f4b98]/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-4 border-[#6f4b98]/20 rounded-full"></div>
            
            {/* Icon */}
            <div className="bg-white p-4 rounded-full shadow-sm z-10 relative">
                <Construction className="w-10 h-10 text-[#6f4b98]" />
            </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2f2151] mb-3 tracking-tight">
          Work in Progress
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-8 text-sm md:text-base leading-relaxed">
          We are currently developing this page to bring you a better experience. 
          Please check back soon!
        </p>

        {/* Action Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#2f2151] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#6f4b98] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Footer Note */}
        <div className="mt-12 text-xs text-gray-400 font-medium uppercase tracking-widest">
          Share Sport Dev Team
        </div>

      </div>
    </div>;
}
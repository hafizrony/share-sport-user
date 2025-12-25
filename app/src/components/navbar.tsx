"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
    Home, 
    Trophy, 
    Tv, 
    Newspaper, 
    Clapperboard 
} from "lucide-react";

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => {
            setIsSticky(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const headerClass = `site-header-m ${isSticky ? "is-sticky" : ""}`;

    const navLinks = [
        { href: "/", label: "HOME", icon: Home },
        { href: "/livescore", label: "LIVESCORE", icon: Trophy },
        // { href: "/livestream", label: "LIVESTREAM", icon: Tv },
        { href: "/news", label: "NEWS", icon: Newspaper },
        { href: "/highlight", label: "HIGHLIGHT", icon: Clapperboard },
    ];

    return (
        <>
            {/* --- DESKTOP HEADER --- */}
            <header className={headerClass}>
                <div className="header-container header-container--rounded header-container--large relative z-20">
                    <div className="header-filter"></div>
                    <div className="header-overlay"></div>
                    <div className="header-specular"></div>
                    <div className="header-content relative">
                        <Link href="/" className="header__logo">
                            <Image
                                src="/icons/1675071036-logo.jpg"
                                alt="Share Sports Logo"
                                width={45}
                                height={45}
                            />
                            <span>Share Sport</span>
                        </Link>
                        
                        <div className="header__nav-wrapper">
                            <nav className="header__nav hidden lg:flex">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`header__nav-link ${
                                            pathname === link.href ? "is-active" : ""
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* --- MOBILE BOTTOM NAVBAR --- */}
            <div className={`fixed bottom-1 inset-x-0 mx-auto w-[94%] z-50 lg:hidden header-container--rounded header-container-m`}>
                <nav className="relative py-2 header-container--rounded header-specular-m header-overlay header-filter header-content-m px-3 border border-white/30 bg-white/10 backdrop-blur">
                    <ul className="flex justify-between items-center px-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`flex flex-col items-center justify-center w-22 h-14 rounded-full transition-all duration-300 ${
                                            isActive 
                                                ? "text-[#4c3b71] shadow-lg shadow-m is-active" 
                                                : "text-gray-400 hover:text-[#4c3b71]"
                                        }`}
                                    >
                                        <Icon 
                                            size={isActive ? 22 : 24} 
                                            strokeWidth={isActive ? 2.5 : 2} 
                                        />
                                            <span className="text-[9px] font-semibold mt-0.5 tracking-wide uppercase">
                                                {link.label === "HOME" ? "HOME" : link.label}
                                            </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </>
    );
}
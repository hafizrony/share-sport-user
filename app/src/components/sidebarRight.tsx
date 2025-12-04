import SmallBanner from "./smallBanner";
import { FaTelegram, FaFacebook, FaYoutube } from "react-icons/fa";

export default function SidebarRight() {
    return (
        <div className="sticky top-24 space-y-6">
            {/* Social Media Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="grid grid-cols-3 gap-2">
                    <a href="#" className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                        <FaFacebook size={24} />
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-400 transition">
                        <FaTelegram size={24} />
                    </a>
                    <a href="#" className="flex flex-col items-center justify-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 text-red-600 transition">
                        <FaYoutube size={24} />
                    </a>
                </div>
            </div>

            {/* Ads */}
            <SmallBanner />
            <SmallBanner />
        </div>
    );
}
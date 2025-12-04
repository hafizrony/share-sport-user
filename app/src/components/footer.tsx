export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Share Sport</h3>
                        <p className="text-gray-400 text-sm">
                            This website make for post news and highlight
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/about" className="hover:text-white">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mt-4">
                            &copy; {new Date().getFullYear()} Share Sport. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
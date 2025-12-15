export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Share Sport</h3>
                        <p className="text-gray-400 text-sm">
                            <a href="/livescore">Live scores, </a>
                            <a href="/livestream">Streaming, </a>
                            <a href="/news">News, </a>
                            and
                            <a href="/highlight"> Highlights </a>
                            all in one place.
                        </p>
                    </div>
                    <div className="mt-6 border-t border-gray-700 flex justify-center">
                    </div>
                    <div className="items-center">
                        <p className="text-sm text-gray-500 justify-center flex mt-4 mb-16 md:mb-0">
                            &copy; {new Date().getFullYear()} Share Sport. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
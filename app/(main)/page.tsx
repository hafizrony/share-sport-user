import BigBanner from "../src/components/hero/bigBanner";
import LiveStreamScrollCardForHome from "../src/components/hero/liveStreamScrollCardForHome";
import NewsHero from "@/app/src/components/hero/newsHero";
import HighlightHero from "@/app/src/components/hero/highlightHero";

export default async function Home() {
    return (
        <div className="space-y-4 container">
            <BigBanner />
            <LiveStreamScrollCardForHome />
            <NewsHero is_featured={true} is_breaking={false}/>
            <HighlightHero/>
        </div>
    );
}
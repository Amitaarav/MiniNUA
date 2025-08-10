import { HomeCarousel } from "./HomeCarousel";
import data  from "@/lib/data";
import FeaturedProducts from "./FeaturedProducts";
import TrendingNow from "./TrendingNow";
import RecentlyViewed from "./RecentlyViewed";

export default function Home() {
    return (
        <div className="w-full mt-28">
            <HomeCarousel items={data.carousel} />
            <div className="container mx-auto px-4">
              <FeaturedProducts />  
              <TrendingNow />
              <RecentlyViewed />
            </div>
        </div>
    );
}
import { HomeCarousel } from "./HomeCarousel";
import data  from "@/lib/data";
import ValueProps from "./ValueProps";
import FeaturedProducts from "./FeaturedProducts";
import TrendingNow from "./TrendingNow";
import RecentlyViewed from "./RecentlyViewed";

export default function Home() {
    return (
        <div className="w-full">
            <HomeCarousel items={data.carousel} />
            <ValueProps />
            <div className="container mx-auto px-4">
              <FeaturedProducts />  
              <TrendingNow />
              <RecentlyViewed />
            </div>
        </div>
    );
}
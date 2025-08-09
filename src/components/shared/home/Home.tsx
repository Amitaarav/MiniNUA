import { HomeCarousel } from "./HomeCarousel";
import data  from "@/lib/data";
import FeaturedProducts from "./FeaturedProducts";
export default function Home() {
    return (
        <div className="w-full">
            <HomeCarousel items={data.carousel} />
            <h1 className="text-2xl font-bold">Products</h1>
            <FeaturedProducts />
        </div>
    );
}
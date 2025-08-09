import { HomeCarousel } from "./HomeCarousel";
import data  from "@/lib/data";
export default function Home() {
    return (
        <div className="w-full">
            <HomeCarousel items={data.carousel} />
            <h2 className="h1-bold my-4">Products</h2>
        </div>
    );
}
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

interface CarouselItemData {
  title: string;
  url: string;
  image: string;
  buttonCaption: string;
  isPublished: boolean;
}

export const HomeCarousel = ({ items }: { items: CarouselItemData[] }) => {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  return (
    <Carousel
      dir="ltr"
      plugins={[plugin.current]}
      className="w-full mx-auto relative"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items?.map((item, idx) =>
          item.isPublished ? (
            <CarouselItem key={item.title}>
              <Link to={item.url} className="block relative group">
                <img
                  src={item.image}
                  alt={`Banner: ${item.title}`}
                  decoding="async"
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className="object-cover w-full h-72 md:h-[32rem]"
                />

                <div className="absolute w-2/3 md:w-1/3 left-6 md:left-32 top-1/2 -translate-y-1/2 transition-opacity duration-500 opacity-90 group-hover:opacity-100">
                  <h2 className="text-lg md:text-6xl font-bold mb-4 text-yellow-300  drop-shadow-lg">
                    {item.title}
                  </h2>
                  <Button className="hidden md:inline-block">{item.buttonCaption}</Button>
                </div>
              </Link>
            </CarouselItem>
          ) : null
        )}
      </CarouselContent>

      <CarouselPrevious className="left-0 md:left-12" />
      <CarouselNext className="right-0 md:right-12" />
    </Carousel>
  );
};

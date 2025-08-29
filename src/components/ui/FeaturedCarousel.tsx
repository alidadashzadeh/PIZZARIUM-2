"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Autoplay from "embla-carousel-autoplay";
import PizzaCarouselCard from "./PizzaCarouselCard";
import { useGetFeaturedPizzas } from "@/hooks/signature-pizzas/useGetFeaturedPizzas";

export default function FeaturedCarousel() {
  const { data: pizzas } = useGetFeaturedPizzas();

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full "
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: 1,
      }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {pizzas?.map((pizza) => (
          <CarouselItem key={pizza.id} className="basis-1/4">
            <PizzaCarouselCard pizza={pizza} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

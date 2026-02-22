// "use client";

// import React from "react";

// import {
// 	Carousel,
// 	CarouselContent,
// 	CarouselItem,
// 	CarouselNext,
// 	CarouselPrevious,
// } from "./carousel";
// import Autoplay from "embla-carousel-autoplay";
// import PizzaCarouselCard from "./PizzaCarouselCard";
// import { SignaturePizza } from "@/types/siganaturPizzaType";

// interface PizzaListProps {
// 	pizzas: SignaturePizza[];
// }

// export default function FeaturedCarousel({ pizzas }: PizzaListProps) {
// 	const plugin = React.useRef(
// 		Autoplay({ delay: 2000, stopOnInteraction: true }),
// 	);

// 	return (
// 		<Carousel
// 			plugins={[plugin.current]}
// 			className="w-full "
// 			opts={{
// 				align: "start",
// 				loop: true,
// 				slidesToScroll: 1,
// 			}}
// 			onMouseEnter={plugin.current.stop}
// 			onMouseLeave={() => plugin.current.play()}
// 		>
// 			<CarouselContent>
// 				{pizzas?.map((pizza) => (
// 					<CarouselItem
// 						key={pizza?.id}
// 						className="
// 							basis-full
// 							sm:basis-1/2
// 							md:basis-1/3
// 							lg:basis-1/4
// 							xl:basis-1/5
// 						"
// 					>
// 						<PizzaCarouselCard pizza={pizza} />
// 					</CarouselItem>
// 				))}
// 			</CarouselContent>
// 			<CarouselPrevious />
// 			<CarouselNext />
// 		</Carousel>
// 	);
// }

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
import { SignaturePizza } from "@/types/siganaturPizzaType";

interface PizzaListProps {
	pizzas: SignaturePizza[];
}

export default function FeaturedCarousel({ pizzas }: PizzaListProps) {
	const plugin = React.useRef(
		Autoplay({ delay: 2500, stopOnInteraction: true }),
	);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full"
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
					<CarouselItem
						key={pizza?.id}
						className="
							basis-full 
							md:basis-1/2 
							lg:basis-1/3 
							xl:basis-1/4 
						
						"
					>
						<PizzaCarouselCard pizza={pizza} />
					</CarouselItem>
				))}
			</CarouselContent>

			{/* Hide arrows on mobile */}
			<CarouselPrevious className="hidden sm:flex" />
			<CarouselNext className="hidden sm:flex" />
		</Carousel>
	);
}

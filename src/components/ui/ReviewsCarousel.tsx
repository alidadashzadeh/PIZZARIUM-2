"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import { useGetFeaturedReviews } from "@/hooks/reviews/useGetFeaturedReviews";
import React from "react";
import ReviewCarouselCard from "./ReviewCarouselCard";
import { Spinner } from "./spinner";

export default function ReviewsCarousel() {
	const { data: reviews, isLoading } = useGetFeaturedReviews();
	console.log(reviews);
	const plugin = React.useRef(
		Autoplay({ delay: 2000, stopOnInteraction: true }),
	);

	if (isLoading) {
		return <Spinner />;
	}

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
				{reviews?.map((review) => (
					<CarouselItem key={review.id} className="basis-1/4">
						<ReviewCarouselCard review={review} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}

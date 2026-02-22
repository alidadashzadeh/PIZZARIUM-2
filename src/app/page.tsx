import Hero from "@/components/landing/Hero";
import { getFeaturedReviews } from "@/lib/queries/reviews";
import { fetchFeaturedPizzas } from "@/lib/queries/signaturePizza";
import FeaturedPizzas from "@/components/landing/FeaturedPizzas";
import Reviews from "@/components/landing/Reviews";
import WhyUs from "@/components/landing/WhyUs";
import Locations from "@/components/landing/Locations";

export default async function Home() {
	const reviews = await getFeaturedReviews();
	const pizzas = await fetchFeaturedPizzas();

	return (
		<div className="flex flex-col pt-8">
			<div className="sm:px-16">
				<Hero />
				<WhyUs />
				<FeaturedPizzas pizzas={pizzas} />
				<Reviews reviews={reviews} />
				<Locations />
			</div>
		</div>
	);
}

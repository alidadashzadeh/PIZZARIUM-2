import FeaturedCarousel from "@/components/ui/FeaturedCarousel";
import Hero from "@/components/landing/Hero";

export default async function Home() {
	return (
		<div className="flex flex-col pt-8">
			{/* <PizzaLoader /> */}
			<div className="px-16">
				<Hero />
				<FeaturedCarousel />
			</div>
		</div>
	);
}

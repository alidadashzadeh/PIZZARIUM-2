import FeaturedCarousel from "@/components/ui/FeaturedCarousel";
import Hero from "@/components/landing/Hero";
import { H1, H3, H4, P } from "@/components/ui/Typography";
import ReviewsCarousel from "@/components/ui/ReviewsCarousel";

export default async function Home() {
	return (
		<div className="flex flex-col pt-8">
			<div className="px-16">
				<Hero />

				<div>
					<H4 className="text-center">Explore our</H4>
					<H1 className="text-primary text-center"> Signature Pizzas</H1>
					<P className="mt-4 text-center max-w-6xl mx-auto">
						At PIZZARIUM house, each pizza is a masterpiece of flavor and
						craftsmanship. Our signature pizzas are a testament to our
						commitment to quality and creativity. From the classic Margherita to
						our bold and innovative creations, every pizza is made with the
						finest ingredients and a passion for perfection. Whether you're a
						fan of traditional flavors or crave something unique, our signature
						pizzas are sure to satisfy your cravings and leave you wanting more.
					</P>
					<FeaturedCarousel />
				</div>

				<div>
					<H3 className="text-center">Some of our customer's reviews</H3>
					<ReviewsCarousel />
				</div>
			</div>
		</div>
	);
}

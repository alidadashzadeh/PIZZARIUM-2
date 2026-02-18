import FeaturedCarousel from "@/components/ui/FeaturedCarousel";
import { H1, H4, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { SignaturePizza } from "@/types/siganaturPizzaType";
import Link from "next/link";

interface PizzaListProps {
	pizzas: SignaturePizza[];
}

export default function FeaturedPizzas({ pizzas }: PizzaListProps) {
	return (
		<div className="mt-32 flex flex-col items-center text-center">
			<div className="space-y-3">
				<H4>Explore our</H4>

				<H1 className="text-primary text-5xl md:text-6xl">Signature Pizzas</H1>
			</div>

			<P className="mt-6 max-w-2xl">
				At PIZZARIUM house, each pizza is a masterpiece of flavor and
				craftsmanship. Our signature pizzas are a testament to our commitment to
				quality and creativity. From the classic Margherita to our bold and
				innovative creations, every pizza is made with the finest ingredients
				and a passion for perfection.
			</P>

			<div className="w-full mt-14">
				<FeaturedCarousel pizzas={pizzas} />
			</div>

			<Link href={"/signature-pizzas"} className="mt-16">
				<Button variant="default" className=" px-10 py-6 text-lg font-semibold">
					View Full Menu
				</Button>
			</Link>
		</div>
	);
}

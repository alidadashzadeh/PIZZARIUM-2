import { H1 } from "@/components/ui/Typography";

import FeaturedCarousel from "@/components/ui/FeaturedCarousel";

export default async function Home() {
	return (
		<div className="flex flex-col pt-8">
			<H1>Welcome TO PIZZARIUM</H1>

			{/* <PizzaLoader /> */}
			<div className="px-16">
				<FeaturedCarousel />
			</div>
		</div>
	);
}

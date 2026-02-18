import { H1, H4, P } from "../ui/Typography";
import { Pizza, Flame, Leaf, Timer } from "lucide-react";

const features = [
	{
		icon: Flame,
		title: "Wood-Fired Perfection",
		desc: "Every pizza baked in high-heat ovens for authentic flavor and crispy texture.",
	},
	{
		icon: Leaf,
		title: "Fresh Ingredients",
		desc: "We use locally sourced, farm-fresh ingredients prepared daily.",
	},
	{
		icon: Pizza,
		title: "Handcrafted Recipes",
		desc: "Unique signature recipes designed for bold and unforgettable taste.",
	},
	{
		icon: Timer,
		title: "Fast Delivery",
		desc: "Hot and fresh pizza delivered quickly without compromising quality.",
	},
];

export default function WhyUs() {
	return (
		<section className="mt-32 py-24 flex flex-col items-center text-center">
			{/* Header */}
			<div className="space-y-4 max-w-2xl">
				<H4>Why choose us</H4>

				<H1 className="text-primary text-5xl md:text-6xl">
					Crafted With Passion
				</H1>

				<P>
					At PIZZARIUM house, we believe great pizza starts with quality
					ingredients, expert craftsmanship, and a love for authentic flavor.
				</P>
			</div>

			{/* Feature Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 w-full max-w-6xl">
				{features.map((feature, i) => {
					const Icon = feature.icon;

					return (
						<div
							key={i}
							className="p-6 rounded-xl bg-primary/5 hover:bg-primary/10 transition text-left"
						>
							<div className="mb-4">
								<Icon className="w-8 h-8 text-primary" />
							</div>

							<h3 className="font-semibold text-lg mb-2">{feature.title}</h3>

							<p className="text-sm text-muted-foreground">{feature.desc}</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}

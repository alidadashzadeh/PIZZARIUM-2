import Link from "next/link";
import { Button } from "../ui/button";
import { Large, Muted } from "../ui/Typography";
import FloatingIngredients from "./FloatingIngredients";
import HeroImage from "./HeroImage";
import RollingWord from "./RollingWord";

export default function Hero() {
	return (
		<section className="w-full min-h-screen flex pt-32 justify-between px-24">
			{/* Left Content */}
			<FloatingIngredients />
			<div className="max-w-xl space-y-8">
				<span className="inline-block text-primary px-4 py-1 rounded-full text-sm font-semibold">
					Fresh & Fast Delivery
				</span>

				<Large className="text-6xl font-extrabold leading-tight tracking-tight  ">
					Delicious Pizza <br />
					Made <RollingWord />
				</Large>

				<Muted>
					Handcrafted pizzas made with farm-fresh ingredients, baked to
					perfection, and delivered hot to your door in minutes.
				</Muted>

				<div className="flex items-center gap-6">
					<Link href="/signature-pizzas">
						<Button
							variant="default"
							className="hover:bg-primary-hover transition text-white p-8  font-semibold text-lg shadow-lg shadow-orange-500/30"
						>
							View Menu
						</Button>
					</Link>

					<Link href="/custom-pizzas">
						<Button
							variant="ghost"
							className="font-semibold hover:text-primary transition p-8"
						>
							Build Your Pizza →
						</Button>
					</Link>
				</div>

				{/* Social proof */}
				<div className="flex items-center gap-6 pt-4">
					<div>
						<p className="text-2xl font-bold">30k+</p>
						<p className="text-gray-500 text-sm">Happy Customers</p>
					</div>
					<div className="w-px h-10 bg-gray-300" />
					<div>
						<p className="text-2xl font-bold">120+</p>
						<p className="text-gray-500 text-sm">Pizza Varieties</p>
					</div>
					<div className="w-px h-10 bg-gray-300" />
					<div>
						<p className="text-2xl font-bold">15 min</p>
						<p className="text-gray-500 text-sm">Fast Delivery</p>
					</div>
				</div>
			</div>

			{/* Right Image */}
			<div className="relative pr-36">
				<HeroImage />
			</div>
		</section>
	);
}

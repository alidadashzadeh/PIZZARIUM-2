import Image from "next/image";
import { H2, H4, Large, Muted, P, Small } from "@/components/ui/Typography";
import {
	SignaturePizzaInfoProps,
	SignaturePizzaIngredientsType,
} from "@/types/siganaturPizzaType";
import RatingStars from "../ui/RatingStars";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignaturePizzaReviews } from "./SignaturePizzaReviews";

export default function SignaturePizzaInfo({ pizza }: SignaturePizzaInfoProps) {
	return (
		<>
			{/* Image */}
			<div className="relative w-[500px] h-[500px] aspecst-square ">
				<Image
					src={pizza.image}
					width={500}
					height={500}
					alt={pizza.name}
					className="object-cover"
				/>
				<Button
					asChild
					className="absolute top-2 left-2 "
					variant="outline"
					size="sm"
				>
					<Link href={"/signature-pizzas"}>
						<ArrowLeft />
						Back
					</Link>
				</Button>
			</div>
			{/* Info */}

			<div className="flex flex-col gap-4">
				<div className="flex justify-between items-start">
					<H2>{pizza.name}</H2>

					<div className="flex gap-2 items-center text-muted-foreground">
						<Clock />
						<Small>{pizza.prep_time_minutes} mins</Small>
					</div>
				</div>
				<div className="flex gap-4 items-center">
					<RatingStars rating={pizza.avg_rating} size={6} />
					<Muted>({pizza.rating_count} Reviews)</Muted>
				</div>
				<Muted>{pizza.description}</Muted>{" "}
				<div>
					<Large>Recipe</Large>

					<Muted>
						{pizza.dough} dough with {pizza.crust} crust and {pizza.sauce}
						sauce on {pizza.cheese} cheese
					</Muted>
				</div>
				<div>
					<Large>Toppings</Large>
					<div className="flex gap-2">
						{pizza.ingredients.map((ing: SignaturePizzaIngredientsType) => (
							<div
								key={ing.id}
								className="flex gap-2 px-2 rounded text-black"
								style={{ backgroundColor: `#${ing.background_color}` }}
							>
								<span>{ing.name}</span>
								<span>{ing.emoji}</span>
							</div>
						))}
					</div>
				</div>
				<div>
					<Large>Nutrition</Large>
					<P>
						{pizza.calorie.small} – {pizza.calorie.large} Calories
					</P>
				</div>
				<div className="flex flex-col gap-2">
					<H4>Reviews</H4>
					<SignaturePizzaReviews pizzaId={pizza.id} />
				</div>
			</div>
		</>
	);
}

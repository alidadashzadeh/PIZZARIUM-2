import { H2, H4, Large, Muted, P, Small } from "@/components/ui/Typography";
import RatingStars from "../ui/RatingStars";
import { Clock } from "lucide-react";

import { SignaturePizzaReviews } from "./SignaturePizzaReviews";

import {
	SignaturePizzaInfoProps,
	SignaturePizzaIngredientsType,
} from "@/types/siganaturPizzaType";

export default function SignaturePizzaInfo({ pizza }: SignaturePizzaInfoProps) {
	return (
		<div className="flex-1 flex flex-col gap-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
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

			<Muted>{pizza.description}</Muted>

			<div>
				<Large>Recipe</Large>
				<Muted>
					{pizza.dough} dough with {pizza.crust} crust and {pizza.sauce} sauce
					on {pizza.cheese} cheese
				</Muted>
			</div>

			<div>
				<Large>Toppings</Large>
				<div className="flex flex-wrap gap-2">
					{pizza.ingredients.map((ing: SignaturePizzaIngredientsType) => (
						<div
							key={ing.id}
							className="flex gap-2 px-2 py-1 rounded text-black"
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
	);
}

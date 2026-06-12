import DrinkCard from "./DrinkCard";
import { Drink, DrinkListProps } from "@/types/DrinkType";

export default function DrinkList({ drinks }: DrinkListProps) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
			{drinks?.map((drink: Drink) => (
				<DrinkCard key={drink.id} drink={drink} />
			))}
		</div>
	);
}

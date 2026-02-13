import DrinkCard from "./DrinkCard";
import { Drink, DrinkListProps } from "@/types/DrinkType";

export default function DrinkList({ drinks }: DrinkListProps) {
	return (
		<div className="grid grid-cols-5 gap-8 ">
			{drinks?.map((drink: Drink) => {
				return <DrinkCard key={drink.id} drink={drink} />;
			})}
		</div>
	);
}

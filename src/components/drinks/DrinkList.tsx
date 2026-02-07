import DrinkCard from "./DrinkCard";
import { Drink } from "@/types/DrinkType";

type DrinkListProps = {
	drinks: Drink[];
};

export default function DrinkList({ drinks }: DrinkListProps) {
	return (
		<div className="grid grid-cols-5 gap-8 ">
			{drinks?.map((drink: Drink) => {
				return <DrinkCard key={drink.id} drink={drink} />;
			})}
		</div>
	);
}

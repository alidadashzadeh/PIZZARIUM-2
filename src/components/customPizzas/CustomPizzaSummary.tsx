"use client";

import { Large } from "../ui/Typography";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import CustomPizzaImage from "./CustomPizzaImage";
import CustomPizzaaRecipe from "./CustomPizzaaRecipe";
import CustomPizzaToppings from "./CustomPizzaToppings";
import CustomPizzaSizeSelector from "./CustomPizzaSizeSelector";

import { usePizzaStore } from "@/store/usePizzaStore";

type Props = {
	onAddToCart: () => void;
};

export default function CustomPizzaSummary({ onAddToCart }: Props) {
	const customPizza = usePizzaStore((state) => state.customPizza);
	const resetCustomPizza = usePizzaStore((state) => state.resetCustomPizza);

	return (
		<div className="w-100 sticky top-4 self-start flex flex-col gap-2">
			<Button
				variant="outline"
				className="absolute top-0 right-0 cursor-pointer z-100"
				onClick={resetCustomPizza}
			>
				<div>Clear</div>
				<RefreshCw />
			</Button>

			<div className="relative h-76 aspect-square mx-auto ">
				<CustomPizzaImage />
			</div>

			<CustomPizzaaRecipe />

			<CustomPizzaToppings />

			<CustomPizzaSizeSelector />

			<div>
				<Button className="cursor-pointer w-full" onClick={onAddToCart}>
					<Large>
						${(customPizza?.price?.[customPizza?.size] ?? 0).toFixed(2)} -
						Confirm & Add to Cart
					</Large>
				</Button>
			</div>
		</div>
	);
}

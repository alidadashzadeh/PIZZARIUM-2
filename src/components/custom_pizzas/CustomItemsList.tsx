import { usePizzaStore } from "@/store/usePizzaStore";

import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { items } from "@/app/custom-pizzas/CustomPizzaClient";

type CustomItemsListProps = {
	list: items[];
	category: string;
};

export default function CustomItemsList({
	list,
	category,
}: CustomItemsListProps) {
	const setCustomPizzaItem = usePizzaStore((state) => state.setCustomPizzaItem);
	const customPizza = usePizzaStore((state) => state.customPizza);

	console.log(customPizza);

	return (
		<div className="h-[800px] w-full overflow-y-auto p-2 no-scrollbar">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{list?.map((li) => (
					<div
						key={li.id}
						className="flex flex-col items-center gap-2 p-3"
						onClick={() => setCustomPizzaItem(category, li?.name)}
					>
						<div className="relative w-44 aspect-square rounded-md overflow-hidden filter drop-shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
							<Image
								src={li.image}
								alt={li.name}
								fill
								className="object-cover"
							/>
						</div>
						<p className="mt-2 text-sm text-muted-foreground">
							${li.price.toFixed(2)}
						</p>
						<p className="font-medium">{li.name}</p>
						<Button size="icon">
							{customPizza[category] !== li.name ? (
								<Plus className="w-6 h-6" />
							) : (
								<Minus className="w-6 h-6" />
							)}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

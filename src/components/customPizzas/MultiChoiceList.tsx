"use client";

import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCheckIcon, Minus, Plus } from "lucide-react";
import { MultiSelectKeys, usePizzaStore } from "@/store/usePizzaStore";

import { fullToppingsType } from "@/types/customPizzaType";

type MultuChoiceListProps = {
	name: string;
	options: fullToppingsType[];
};

export default function MultiChoiceList({
	name,
	options,
}: MultuChoiceListProps) {
	const manageMulti = usePizzaStore((state) => state.manageMulti);
	const customPizza = usePizzaStore((state) => state.customPizza);

	const toppingExist = (item: fullToppingsType) => {
		return customPizza?.toppings?.some((t) => t.id === item.id);
	};
	return (
		<div className="grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{options?.map((item) => (
				<Card
					key={item.id}
					className={`relative cursor-pointer border transition-all hover:shadow-lg ${
						toppingExist(item) && "bg-background-selected"
					}`}
					onClick={() => {
						manageMulti(name as MultiSelectKeys, item);
					}}
				>
					{toppingExist(item) ? (
						<CheckCheckIcon
							className="absolute top-4 right-4 text-primary"
							size={36}
						/>
					) : (
						<></>
					)}

					<CardContent className="flex flex-col items-center gap-2 p-3 relative">
						<div className="relative w-32 lg:w-44 aspect-square rounded-md overflow-hidden filter drop-shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
							<Image
								src={item.image}
								alt={item.name}
								fill
								className="object-cover"
							/>
						</div>

						<p className="mt-2 text-sm text-muted-foreground">
							${item.price.toFixed(2)}
						</p>
						<p className="font-medium text-center">{item.name}</p>

						<Button className="h-10 w-10">
							{toppingExist(item) ? (
								<Minus className="w-6 h-6" />
							) : (
								<Plus className="w-6 h-6" />
							)}
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

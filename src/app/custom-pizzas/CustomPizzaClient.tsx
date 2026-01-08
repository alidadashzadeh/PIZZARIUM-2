"use client";

import { useState } from "react";

import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import CustomItemsList from "@/components/custom_pizzas/CustomItemsList";
import CustomPizzaSummary from "@/components/custom_pizzas/CustomPizzaSummary";

const categories = [
	{ name: "Dough", value: "dough" },
	{ name: "Crust", value: "crust" },
	{ name: "Sauce", value: "sauce" },
	{ name: "Cook", value: "cook" },
	{ name: "Cheese", value: "cheese" },
	{ name: "Toppings", value: "toppings" },
];

export type items = {
	id: number;
	name: string;
	image: string;
	price: number;
};
type CustomPizzaClientProps = {
	doughs: items[];
	cooks: items[];
	crusts: items[];
	sauces: items[];
	cheeses: items[];
	toppings: items[];
};

export default function CustomPizzaClient({
	doughs,
	cooks,
	crusts,
	sauces,
	cheeses,
	toppings,
}: CustomPizzaClientProps) {
	const [selected, setSelected] = useState("dough");

	return (
		<div className="pt-8 flex flex-col gap-4">
			<H2>Create your Pizza</H2>
			<div className="grid grid-cols-[200px_1fr_320px] gap-4">
				<div className="flex flex-row gap-2 sm:flex-col">
					{categories.map((cat) => {
						return (
							<Button
								variant={selected === cat.value ? "default" : "outline"}
								key={cat.name}
								onClick={() => setSelected(cat.value)}
							>
								{cat.name}
							</Button>
						);
					})}
				</div>
				<div className="">
					{selected === "dough" && (
						<CustomItemsList list={doughs} category="dough" />
					)}
					{selected === "cook" && (
						<CustomItemsList list={cooks} category="cook" />
					)}
					{selected === "crust" && (
						<CustomItemsList list={crusts} category="crust" />
					)}
					{selected === "sauce" && (
						<CustomItemsList list={sauces} category="sauce" />
					)}
					{selected === "cheese" && (
						<CustomItemsList list={cheeses} category="cheese" />
					)}
					{selected === "toppings" && (
						<CustomItemsList list={toppings} category="toppings" />
					)}
				</div>
				<div className="">
					<CustomPizzaSummary />
				</div>
			</div>
		</div>
	);
}

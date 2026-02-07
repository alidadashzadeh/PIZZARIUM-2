"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomPizzaTabsTriggers from "./CustomPizzaTabsTriggers";
import MultiChoiceList from "./MultiChoiceList";
import SingleChoiceList from "./SingleChoiceList";
import CustomPizzaSummary from "./CustomPizzaSummary";
import ConfirmPizzaModal from "./ConfirmPizzaModal";
import { useState } from "react";
import {
	Category,
	CustomPizzaClientProps,
	fullToppingsType,
	optionsType,
} from "@/types/customPizzaType";
type DataMap = {
	dough: optionsType[];
	crust: optionsType[];
	sauce: optionsType[];
	cook: optionsType[];
	cheese: optionsType[];
	toppings: fullToppingsType[];
};
const categories: Category[] = [
	{ name: "Dough", value: "dough", type: "single" },
	{ name: "Crust", value: "crust", type: "single" },
	{ name: "Sauce", value: "sauce", type: "single" },
	{ name: "Cook", value: "cook", type: "single" },
	{ name: "Cheese", value: "cheese", type: "single" },
	{ name: "Toppings", value: "toppings", type: "multi" },
];

export default function CustomPizzaList({
	doughs,
	cooks,
	crusts,
	sauces,
	cheeses,
	toppings,
}: CustomPizzaClientProps) {
	const [confirmCustomOpen, setConfirmCustomOpen] = useState(false);

	const dataMap: DataMap = {
		dough: doughs,
		crust: crusts,
		sauce: sauces,
		cook: cooks,
		cheese: cheeses,
		toppings: toppings,
	};

	return (
		<div className="flex justify-between gap-4 relative">
			<Tabs
				defaultValue={categories?.at(-1)?.value}
				className="flex flex-col gap-4 flex-1"
			>
				<div className="pt-4">
					<CustomPizzaTabsTriggers categories={categories} />
				</div>

				{categories.map((cat) => (
					<TabsContent key={cat.value} value={cat.value}>
						{cat.type === "single" && (
							<SingleChoiceList name={cat.value} options={dataMap[cat.value]} />
						)}

						{cat.type === "multi" && (
							<MultiChoiceList name={cat.value} options={dataMap[cat.value]} />
						)}
					</TabsContent>
				))}
			</Tabs>
			<CustomPizzaSummary onAddToCart={() => setConfirmCustomOpen(true)} />
			<ConfirmPizzaModal
				open={confirmCustomOpen}
				onOpenChange={setConfirmCustomOpen}
			/>
		</div>
	);
}

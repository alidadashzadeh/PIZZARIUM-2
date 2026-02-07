"use client";

import SignaturePizzasCard from "./SignaturePizzaCard";
import SignaturePizzaFilters from "./SignaturePizzaFilters";
import { applyFiltersAndSort } from "@/lib/utils";
import { SignaturePizzaCard } from "@/types/customPizzaType";
import { useSearchParams } from "next/navigation";

export type Category = "all" | "meat" | "veggie";
export type SortField = "" | "price" | "prep_time" | "popularity";
export type SortOrder = "" | "asc" | "desc";
export interface FiltersState {
	category: Category;
	sortBy: SortField;
	sortOrder: SortOrder;
}
type SignaturePizzasListProps = { pizzas: SignaturePizzaCard[] };

export default function SignaturePizzasList({
	pizzas,
}: SignaturePizzasListProps) {
	const searchParams = useSearchParams();

	// filters derived directly from URL
	const filters: FiltersState = {
		category: (searchParams.get("category") as Category) ?? "all",
		sortBy: (searchParams.get("sortBy") as SortField) ?? "",
		sortOrder: (searchParams.get("sortOrder") as SortOrder) ?? "",
	};

	// do not mutate original data
	let list = [...pizzas];
	// helper function to filter, sort and return final list
	list = applyFiltersAndSort(list, filters);

	return (
		<div className="flex flex-col gap-2">
			<SignaturePizzaFilters filters={filters} />
			<div className="grid grid-cols-4 gap-8  mx-auto">
				{list?.map((pizza) => (
					<SignaturePizzasCard key={pizza.id} pizza={pizza} />
				))}
			</div>
		</div>
	);
}

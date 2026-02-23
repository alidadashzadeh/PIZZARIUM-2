"use client";

import { useSearchParams } from "next/navigation";

import SignaturePizzasCard from "./SignaturePizzaCard";
import SignaturePizzaFilters from "./SignaturePizzaFilters";
import { applyFiltersAndSort } from "@/lib/utils";

import {
	Category,
	FiltersState,
	SignaturePizzasListProps,
	SortField,
	SortOrder,
} from "@/types/siganaturPizzaType";
import { useEffect, useState } from "react";
import SignatureListLoader from "../ui/SignatureListLoader";

export default function SignaturePizzasList({
	pizzas,
}: SignaturePizzasListProps) {
	const searchParams = useSearchParams();

	const filters: FiltersState = {
		category: (searchParams.get("category") as Category) ?? "all",
		sortBy: (searchParams.get("sortBy") as SortField) ?? "",
		sortOrder: (searchParams.get("sortOrder") as SortOrder) ?? "",
	};

	let list = [...pizzas];
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let loadedCount = 0;
		pizzas.forEach((pizza) => {
			const img = new Image();
			img.src = pizza.image;
			img.onload = () => {
				loadedCount++;
				if (loadedCount === pizzas.length) setLoaded(true);
			};
		});
	}, [pizzas]);
	list = applyFiltersAndSort(list, filters);

	if (!loaded) return <SignatureListLoader />;

	return (
		<div className="flex flex-col gap-2">
			<SignaturePizzaFilters filters={filters} />
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-auto">
				{list?.map((pizza) => (
					<SignaturePizzasCard key={pizza.id} pizza={pizza} />
				))}
			</div>
		</div>
	);
}

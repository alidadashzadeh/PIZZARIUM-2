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

export default function SignaturePizzasList({
	pizzas,
	searchParams,
}: SignaturePizzasListProps) {
	const filters: FiltersState = {
		category: (searchParams?.category as Category) ?? "all",
		sortBy: (searchParams?.sortBy as SortField) ?? "",
		sortOrder: (searchParams?.sortOrder as SortOrder) ?? "",
	};

	const list = applyFiltersAndSort([...pizzas], filters);

	return (
		<div className="flex flex-col gap-2">
			<SignaturePizzaFilters filters={filters} />

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-auto">
				{list.map((pizza) => (
					<SignaturePizzasCard key={pizza.id} pizza={pizza} />
				))}
			</div>
		</div>
	);
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignaturePizzaCard } from "@/types/pizzaType";
import {
	Category,
	SortField,
	SortOrder,
} from "./../components/signature_pizzas/SignaturePizzasList";

interface FiltersState {
	category: Category;
	sortBy: SortField;
	sortOrder: SortOrder;
}
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function applyFiltersAndSort(
	list: SignaturePizzaCard[],
	filters: FiltersState
): SignaturePizzaCard[] {
	let result = [...list];

	// Filter
	if (filters.category !== "all") {
		result = result.filter((pizza) => pizza.category === filters.category);
	}

	// Sort
	if (filters.sortBy !== "") {
		result.sort((a, b) => {
			let aVal = 0;
			let bVal = 0;

			switch (filters.sortBy) {
				case "price":
					aVal = a.prices.small;
					bVal = b.prices.small;
					break;
				case "prep_time":
					aVal = a.prep_time_minutes ?? 0;
					bVal = b.prep_time_minutes ?? 0;
					break;
				case "popularity":
					aVal = a.avg_rating;
					bVal = b.avg_rating;
					break;
				default:
					return 0;
			}

			return filters.sortOrder === "asc" ? aVal - bVal : bVal - aVal;
		});
	}

	return result;
}

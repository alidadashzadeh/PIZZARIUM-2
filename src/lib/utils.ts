import { CartItem } from "@/types/pizzaType";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	CustomPizzaOption,
	CustomPizzaType,
	SignaturePizzaCard,
} from "@/types/pizzaType";
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
	filters: FiltersState,
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
					aVal = a.price.small;
					bVal = b.price.small;
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

export const estimateCustomPizzaCost = (
	customPizza: CustomPizzaType,
): number => {
	let total = 11; // ✅ base cost

	(Object.keys(customPizza) as (keyof CustomPizzaType)[]).forEach((key) => {
		if (key === "price" || key === "size") return;

		const value = customPizza[key];

		// toppings
		if (Array.isArray(value)) {
			total += value.reduce((sum, item) => sum + item.price, 0);
		}
		// single options
		else if (value && typeof value === "object" && "price" in value) {
			total += (value as CustomPizzaOption).price;
		}
	});

	return Number(total.toFixed(2));
};

export function getCartItemImage(item: CartItem): string {
	if (item?.image) return item?.image;

	switch (item.type) {
		case "custom":
			return "/customPizzaImage.png";

		default:
			return "/placeholder.png";
	}
}

export function sortCartItems(items: CartItem[]) {
	return [...items].sort((a, b) => {
		if (a.type === "signature" && b.type !== "signature") return -1;
		if (a.type === "custom" && b.type === "drink") return -1;
		return 0;
	});
}

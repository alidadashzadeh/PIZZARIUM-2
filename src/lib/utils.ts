import { CartItem } from "@/types/CartType";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	CustomPizzaOptionsType,
	CustomPizzaType,
} from "@/types/customPizzaType";

import {
	Category,
	SignaturePizzaCard,
	SortField,
	SortOrder,
} from "@/types/siganaturPizzaType";

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
	let total = 11; // base cost

	(Object.keys(customPizza) as (keyof CustomPizzaType)[]).forEach((key) => {
		if (key === "price" || key === "size") return;

		const value = customPizza[key];

		// toppings
		if (Array.isArray(value)) {
			total += value.reduce((sum, item) => sum + item.price, 0);
		}
		// single options
		else if (value && typeof value === "object" && "price" in value) {
			total += (value as CustomPizzaOptionsType).price;
		}
	});

	return Number(total.toFixed(2));
};

export function sortCartItems(items: CartItem[]) {
	if (!items) return;
	return [...items].sort((a, b) => {
		if (a.type === "signature" && b.type !== "signature") return -1;
		if (a.type === "custom" && b.type === "drink") return -1;
		return 0;
	});
}

export function flyToCart(sourceEl: HTMLElement) {
	const target = document.querySelector("[data-cart-target]");
	if (!target) return;

	const sourceRect = sourceEl.getBoundingClientRect();
	const targetRect = target.getBoundingClientRect();

	const clone = sourceEl.cloneNode(true) as HTMLElement;

	Object.assign(clone.style, {
		position: "fixed",
		top: `${sourceRect.top}px`,
		left: `${sourceRect.left}px`,
		width: `${sourceRect.width}px`,
		height: `${sourceRect.height}px`,
		zIndex: 9999,
		pointerEvents: "none",
		transition:
			"transform 700ms cubic-bezier(.22,1,.36,1), opacity 5000ms ease",
	});

	document.body.appendChild(clone);

	const dx =
		targetRect.left +
		targetRect.width / 2 -
		(sourceRect.left + sourceRect.width / 2);
	const dy =
		targetRect.top +
		targetRect.height / 2 -
		(sourceRect.top + sourceRect.height / 2);

	requestAnimationFrame(() => {
		clone.style.transform = `
      translate(${dx}px, ${dy}px)
      scale(0.2)
    `;
		clone.style.opacity = "0";
	});

	clone.addEventListener("transitionend", () => {
		clone.remove();
	});
}

export const calculateTotal = (items: CartItem[]) =>
	Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

const estimateCustomPizza = (pizza: CustomPizzaType) => {
	let price = 10.31;

	price += pizza.cheese.price;
	price += pizza.sauce.price;
	price += pizza.dough.price;
	price += pizza.crust.price;
	price += pizza.cook.price;

	for (const topping of pizza.toppings) {
		price += topping.price;
	}

	return Number(price.toFixed(2));
};

export const recalcPizza = (pizza: CustomPizzaType) => {
	const base = estimateCustomPizza(pizza);

	return {
		...pizza,
		price: {
			small: base,
			medium: Number((base * 1.2).toFixed(2)),
			large: Number((base * 1.3).toFixed(2)),
		},
	};
};

export const updateCartState = (items: CartItem[]) => ({
	items,
	total: calculateTotal(items),
});

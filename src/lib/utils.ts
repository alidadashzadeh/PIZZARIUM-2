import { CartItem } from "@/types/CartType";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CustomPizzaType } from "@/types/customPizzaType";

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

export async function resizeAndConvertToWebp(
	file: File,
	maxSize = 512,
	quality = 0.75,
): Promise<File> {
	const bitmap = await createImageBitmap(file);

	const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1);

	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d")!;
	ctx.drawImage(bitmap, 0, 0, width, height);

	const blob = await new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(b) => (b ? resolve(b) : reject(new Error("WebP conversion failed"))),
			"image/webp",
			quality,
		);
	});

	const newName = file.name.replace(/\.\w+$/, ".webp");

	return new File([blob], newName, { type: "image/webp" });
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
	let price = basePriceForSize("small");

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
			medium: base + 2.0,
			large: base + 3.0,
		},
	};
};

export function basePriceForSize(size: "small" | "medium" | "large") {
	if (size === "small") return 10;
	if (size === "medium") return 12;
	return 13;
}

export const updateCartState = (items: CartItem[]) => ({
	items,
	total: calculateTotal(items),
});

export function assertQty(qty: number) {
	return Number.isFinite(qty) && qty >= 1 && qty <= 50;
}

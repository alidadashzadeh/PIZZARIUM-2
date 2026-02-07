import { recalcPizza } from "@/lib/utils";
import { CartItem } from "@/types/CartType";
import {
	CustomPizzaType,
	fullToppingsType,
	optionsType,
} from "@/types/customPizzaType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MultiSelectKeys = {
	[K in keyof CustomPizzaType]: CustomPizzaType[K] extends unknown[]
		? K
		: never;
}[keyof CustomPizzaType];

type PizzaStore = {
	customPizza: CustomPizzaType;
	cartItems: CartItem[];

	// actions
	resetCustomPizza: () => void;
	manageSingle: (category: string, value: optionsType) => void;
	manageMulti: (category: MultiSelectKeys, value: fullToppingsType) => void;
	selectSize: (size: CustomPizzaType["size"]) => void;
};
export const usePizzaStore = create<PizzaStore>()(
	persist(
		(set) => ({
			// STATE
			customPizza: {
				size: "small",
				dough: { name: "regular", id: 2, price: 0 },
				crust: { name: "regular", id: 1, price: 0 },
				cheese: { name: "Dairy Free", id: 1, price: 0.99 },
				sauce: { name: "creamy garlic", id: 4, price: 0.99 },
				cook: { name: "regular", id: 2, price: 0 },
				toppings: [],
				price: {
					small: 12.98,
					medium: 15.58,
					large: 16.87,
				},
			},

			cartItems: [],

			// ACTIONS

			manageSingle: (category, value) =>
				set((state) => {
					const updated = {
						...state.customPizza,
						[category]: {
							id: value.id,
							name: value.name,
							price: value.price,
						},
					};

					return {
						customPizza: recalcPizza(updated),
					};
				}),

			manageMulti: (category, item) =>
				set((state) => {
					const array = state.customPizza[category];

					const cleanItem = {
						id: item.id,
						name: item.name,
						price: item.price,
						image_raw: item.image_raw,
					};

					const exists = array.some((i) => i.id === item.id);

					const updated = {
						...state.customPizza,
						[category]: exists
							? array.filter((i) => i.id !== item.id)
							: [...array, cleanItem],
					};

					return {
						customPizza: recalcPizza(updated),
					};
				}),

			selectSize: (size) =>
				set((state) => {
					const updated = {
						...state.customPizza,
						size,
					};

					return {
						customPizza: recalcPizza(updated),
					};
				}),

			resetCustomPizza: () =>
				set({
					customPizza: {
						size: "small",
						dough: { name: "regular", id: 2, price: 0 },
						crust: { name: "regular", id: 1, price: 0 },
						cheese: { name: "Dairy Free", id: 1, price: 0.99 },
						sauce: { name: "creamy garlic", id: 4, price: 0.99 },
						cook: { name: "regular", id: 2, price: 0 },
						toppings: [],
						price: { small: 12.98, medium: 15.58, large: 16.87 },
					},
				}),
		}),
		{
			name: "pizza-store",
		},
	),
);

import { CustomPizzaState, SignaturePizza } from "@/types/pizzaType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PizzaStore = {
	customPizza: CustomPizzaState;
	// signaturePizza: SignaturePizza;

	// actions
	setCustomPizzaItem: (
		category: keyof CustomPizzaState,
		value: string | string[]
	) => void;
};

export const usePizzaStore = create<PizzaStore>()(
	persist(
		(set) => ({
			cart: [],

			customPizza: {
				size: "small",
				dough: "regular",
				crust: "regular",
				cheese: "Diary Free",
				sauce: "creamy garlic",
				cook: "regular",
				toppings: [],
				price: 0,
			},

			// signaturePizza: {
			// 	signatureId: null,
			// 	size: null,
			// 	extraToppings: [],
			// 	price: 0,
			// },

			// action
			setCustomPizzaItem: (category, value) =>
				set((state) => ({
					customPizza: {
						...state.customPizza,
						[category]: value,
					},
				})),
			setCustomField: (field, value) =>
				set((state) => ({
					customPizza: {
						...state.customPizza,
						[field]: value,
					},
				})),

			toggleTopping: (topping) =>
				set((state) => {
					const exists = state.customPizza.toppings.includes(topping);

					return {
						customPizza: {
							...state.customPizza,
							toppings: exists
								? state.customPizza.toppings.filter((t) => t !== topping)
								: [...state.customPizza.toppings, topping],
						},
					};
				}),
		}),
		{
			name: "pizza-store", // localStorage key
		}
	)
);

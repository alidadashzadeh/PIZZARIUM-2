import {
	CustomPizzaOptionsType,
	CustomPizzaToppingsType,
} from "./customPizzaType";

type priceType = { small: number; medium: number; large: number } | number;

export interface CartItem {
	cartItemId: string;
	type: "signature" | "custom" | "drink";
	id?: string;

	dough?: CustomPizzaOptionsType;
	crust?: CustomPizzaOptionsType;
	sauce?: CustomPizzaOptionsType;
	cheese?: CustomPizzaOptionsType;
	cook?: CustomPizzaOptionsType;
	toppings?: CustomPizzaToppingsType[];

	description?: string;
	size?: "small" | "medium" | "large";
	quantity: number;
	name: string;
	image?: string;
	price: priceType;
	lineTotal: number;
	addedAt: number;
}

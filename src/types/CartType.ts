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

export type ConfirmPizzaModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export type Delivery = {
	full_name: string;
	address: string;
	phone_number: string;
	delivery_instructions?: string;
};

export type IngredientsLineItem = {
	id: string;
	name: string;
	price: number;
};

export type PizzaSize = "small" | "medium" | "large";

export type PriceBySize = {
	small: number;
	medium: number;
	large: number;
};

export type SignatureLineItem = {
	id: string;
	name: string;
	price: PriceBySize;
};

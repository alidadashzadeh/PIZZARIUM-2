import { CartItem } from "./CartType";

export type OrderCartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	size: "small" | "medium" | "large";
	type: "signature" | "custom";
};

export type OrderInsert = {
	user_id?: string;
	items: CartItem[];
	total: number;
	notes?: string;
	stripe_session_id?: string;
	customer_name: string;
	delivery_address: string;
	delivery_phone: string;
	delivery_instructions?: string;
};

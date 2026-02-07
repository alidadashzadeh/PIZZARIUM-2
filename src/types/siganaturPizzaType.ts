export type SignaturePizza = {
	id: string;
	name: string;
	description: string;
	image: string;
	price: {
		small: number;
		medium: number;
		large: number;
	};
	is_available: boolean;
	is_featured: boolean;
	slug: string;
	avg_rating: number;
	rating_count: number;
	category: "all" | "meat" | "veggie";
	prep_time_minutes: number;
	calorie: {
		small: number;
		medium: number;
		large: number;
	};
	sort_order: number;
	dough: string;
	crust: string;
	sauce: string;
	cheese: string;
};
export type SignaturePizzaCard = Pick<
	SignaturePizza,
	| "id"
	| "name"
	| "image"
	| "avg_rating"
	| "rating_count"
	| "description"
	| "price"
	| "prep_time_minutes"
	| "category"
	| "calorie"
>;
export type SignaturePizzaIngredientsType = {
	background_color: string;
	emoji: string;
	id: string;
	name: string;
};

export type signaturePizzaReviewType = {
	created_at: string;
	id: string;
	rating: number;
	text: string;
	user: { avatar: string; username: string };
};

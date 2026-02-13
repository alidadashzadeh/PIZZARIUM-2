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
	ingredients: SignaturePizzaIngredientsType[];
	reviews: signaturePizzaReviewType[];
};

export interface SignaturePizzaInfoProps {
	pizza: SignaturePizza;
}

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
	| "is_available"
	| "is_featured"
	| "slug"
	| "sort_order"
	| "dough"
	| "crust"
	| "sauce"
	| "cheese"
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

export type Category = "all" | "meat" | "veggie";
export type SortField = "" | "price" | "prep_time" | "popularity";
export type SortOrder = "" | "asc" | "desc";
export interface FiltersState {
	category: Category;
	sortBy: SortField;
	sortOrder: SortOrder;
}
export type SignaturePizzasListProps = { pizzas: SignaturePizzaCard[] };
export interface SignaturePizzaFiltersProps {
	filters: FiltersState;
}

export type SignatureCartItem = SignaturePizza & {
	size: "small" | "medium" | "large";
	quantity: number;
	type: "signature";
	cartItemId?: string;
	lineTotal?: number;
	addedAt?: string;
};

export type SignaturePizzaCardProps = {
	pizza: SignaturePizzaCard;
};

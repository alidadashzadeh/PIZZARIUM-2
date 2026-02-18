// cooks, crusts, sauces, cheeses, dough
export type CustomPizzaOptionsType = {
	id: string | number;
	name: string;
	price: number;
};
export type optionsType = {
	id: number;
	name: string;
	image: string;
	price: number;
};

// toppings
export type CustomPizzaToppingsType = {
	id: string | number;
	name: string;
	price: number;
	image_raw: string;
};

export type fullToppingsType = {
	id: number;
	name: string;
	image: string;
	price: number;
	image_raw: string;
};

export type CustomPizzaClientProps = {
	doughs: optionsType[];
	cooks: optionsType[];
	crusts: optionsType[];
	sauces: optionsType[];
	cheeses: optionsType[];
	toppings: fullToppingsType[];
};

export type CustomPizzaType = {
	size: "small" | "medium" | "large";
	dough: CustomPizzaOptionsType;
	crust: CustomPizzaOptionsType;
	sauce: CustomPizzaOptionsType;
	cheese: CustomPizzaOptionsType;
	cook: CustomPizzaOptionsType;
	toppings: CustomPizzaToppingsType[];
	price: { small: number; medium: number; large: number } | null;
};

export type SingleCategoryValue =
	| "dough"
	| "crust"
	| "sauce"
	| "cook"
	| "cheese";

export type Category =
	| {
			name: string;
			value: SingleCategoryValue;
			type: "single";
	  }
	| {
			name: string;
			value: "toppings";
			type: "multi";
	  };

export type SingleChoiceListProps = {
	name: "dough" | "crust" | "sauce" | "cook" | "cheese";
	options: optionsType[];
};

export type DataMap = {
	dough: optionsType[];
	crust: optionsType[];
	sauce: optionsType[];
	cook: optionsType[];
	cheese: optionsType[];
	toppings: fullToppingsType[];
};

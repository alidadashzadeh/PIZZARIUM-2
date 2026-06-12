export type Drink = {
	id: string;
	name: string;
	image: string;
	price: number;
	isAvailable: boolean;
};

export type DrinkCardProps = {
	drink: Drink;
};

export type DrinkListProps = {
	drinks: Drink[];
};

export type SignaturePizza = {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
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
  | "prices"
  | "prep_time_minutes"
  | "category"
  | "calorie"
>;

export type CartItem = {
  id: string; // unique id for this cart item
  type: "signature" | "custom" | "drink";
  name: string;
  size: string;
  toppings: string[];
  price: number;
};

export type CustomPizzaOption = {
  id: string | number;
  name: string;
  price: number;
};
export type CustomPizzaToppingOption = CustomPizzaOption & {
  image_raw: string;
};
export type CustomPizzaType = {
  size: "small" | "medium" | "large";
  dough: CustomPizzaOption;
  crust: CustomPizzaOption;
  sauce: CustomPizzaOption;
  cheese: CustomPizzaOption;
  cook: CustomPizzaOption;
  toppings: CustomPizzaToppingOption[];
  price: { small: number; medium: number; large: number } | null;
  quantity: number;
};

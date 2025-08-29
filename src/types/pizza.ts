export type Pizza = {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: {
    small: number;
    medium?: number;
    large?: number;
  };
  is_available: boolean;
  is_featured: boolean;
  slug: string;
  avg_rating: number;
  rating_count: number;
  category: "all" | "meat" | "veggie";
  prep_time_minutes?: number;
  calorie?: number;
  sort_order: number;
  dough: string;
  crust: string;
  sauce: string;
  cheese: string;
};

// lib/queries.ts
import { supabase } from "../supabase";

export const fetchSignaturePizzas = async () => {
	const { data, error } = await supabase
		.from("signature_pizzas")
		.select(
			"id,name,image,avg_rating,rating_count,description,prices,prep_time_minutes,category,calorie"
		);

	if (error) throw error;

	return data;
};

export const fetchFeaturedPizzas = async () => {
	const { data, error } = await supabase
		.from("signature_pizzas")
		.select("*")
		.eq("is_featured", true);

	if (error) throw error;
	return data;
};

export async function fetchSignaturePizza(id: string) {
	const { data, error } = await supabase
		.from("pizza_with_last_two_reviews")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;

	return data;
}

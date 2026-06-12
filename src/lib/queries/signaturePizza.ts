import { supabase } from "../supabase";

export const fetchSignaturePizzas = async () => {
	const { data, error } = await supabase
		.from("signature_pizzas")
		.select("*")
		.order("sort_order", { ascending: true });

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

export async function fetchSignaturePizzaDetails(id: string) {
	const { data, error } = await supabase
		.from("signature_pizza_details")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;

	return { data, error };
}

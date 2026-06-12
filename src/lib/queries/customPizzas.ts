import { supabase } from "../supabase";

export const fetchCheeses = async () => {
	const { data, error } = await supabase.from("cheeses").select("*");

	if (error) throw error;
	return data;
};
export const fetchCooks = async () => {
	const { data, error } = await supabase.from("cooks").select("*");

	if (error) throw error;
	return data;
};
export const fetchCrusts = async () => {
	const { data, error } = await supabase.from("crusts").select("*");

	if (error) throw error;
	return data;
};
export const fetchDoughs = async () => {
	const { data, error } = await supabase.from("doughs").select("*");

	if (error) throw error;
	return data;
};
export const fetchToppings = async () => {
	const { data, error } = await supabase
		.from("toppings")
		.select("*")
		.order("sort_order", { ascending: true });

	if (error) throw error;
	return data;
};
export const fetchSauces = async () => {
	const { data, error } = await supabase.from("sauces").select("*");

	if (error) throw error;
	return data;
};

export async function getCustomPizzaData() {
	const [cheeses, cooks, crusts, doughs, sauces, toppings] = await Promise.all([
		fetchCheeses(),
		fetchCooks(),
		fetchCrusts(),
		fetchDoughs(),
		fetchSauces(),
		fetchToppings(),
	]);

	return {
		cheeses,
		cooks,
		crusts,
		doughs,
		sauces,
		toppings,
	};
}

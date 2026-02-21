import { supabase } from "../supabase";

export const fetchDrinks = async () => {
	const { data, error } = await supabase
		.from("drinks")
		.select("*")
		.order("sort_order", { ascending: true });

	if (error) throw error;
	return data;
};

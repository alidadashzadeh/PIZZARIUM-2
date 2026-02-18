import { supabase } from "../supabase/client";

export const getReviews = async (pizzaId: string) => {
	const { data, error } = await supabase
		.from("reviews")
		.select(
			`
      *,
      profiles (
        username,
        avatar
      )
    `,
		)
		.eq("pizza_id", pizzaId)
		.order("created_at", { ascending: false });

	if (error) throw error;

	return data;
};

export const getFeaturedReviews = async () => {
	const { data, error } = await supabase
		.from("reviews")
		.select(`*, profiles (username, avatar)`)
		.eq("rating", 5)
		.order("created_at", { ascending: false })
		.limit(5);

	if (error) throw error;

	return data;
};

import { supabase } from "../supabase";

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

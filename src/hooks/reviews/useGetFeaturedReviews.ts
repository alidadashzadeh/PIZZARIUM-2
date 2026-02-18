import { getFeaturedReviews } from "@/lib/queries/reviews";
import { useQuery } from "@tanstack/react-query";

export function useGetFeaturedReviews() {
	return useQuery({
		queryKey: ["featured-reviews"],
		queryFn: () => getFeaturedReviews(),
	});
}

import { getReviews } from "@/lib/queries/reviews";
import { useQuery } from "@tanstack/react-query";

export function useGetReviews(pizzaid?: string) {
	return useQuery({
		queryKey: ["reviews", pizzaid],
		queryFn: () => getReviews(pizzaid!),
		enabled: !!pizzaid,
	});
}

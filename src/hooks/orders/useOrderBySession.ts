import { useQuery } from "@tanstack/react-query";
import { fetchOrderBySession } from "@/lib/queries/orders";

export function useOrderBySession(sessionId: string | null, userId?: string) {
	return useQuery({
		queryKey: ["currentOrder", sessionId, userId],

		enabled: !!sessionId && !!userId,

		queryFn: () => fetchOrderBySession(sessionId!, userId!),

		// Stripe webhook delay protection
		retry: 5,
		retryDelay: 1000,
	});
}

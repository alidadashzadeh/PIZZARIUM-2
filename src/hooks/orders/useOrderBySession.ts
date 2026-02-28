import { useQuery } from "@tanstack/react-query";
import { fetchOrderBySession } from "@/lib/queries/orders";

export function useOrderBySession(sessionId: string | null, userId?: string) {
	return useQuery({
		queryKey: ["currentOrder", sessionId, userId],
		enabled: !!sessionId && !!userId,
		queryFn: () => fetchOrderBySession(sessionId!, userId!),

		// Poll every 2s until webhook marks paid=true, then stop
		refetchInterval: (query) => {
			const order = query.state.data;
			if (!order) return 2000;
			if (!order.paid) return 2000;
			return false;
		},

		staleTime: 0,
	});
}

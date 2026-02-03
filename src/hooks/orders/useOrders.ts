import { useQuery } from "@tanstack/react-query";
import { getOrdersByUser } from "@/lib/queries/orders";

export function useOrders(userId?: string) {
	return useQuery({
		queryKey: ["orders", userId],
		queryFn: () => getOrdersByUser(userId!),
		enabled: !!userId, // only run when user exists
	});
}

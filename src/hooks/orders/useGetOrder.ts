import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/lib/queries/orders";

export function useGetOrder(orderId?: string) {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: () => getOrderById(orderId!),
		enabled: !!orderId,
	});
}

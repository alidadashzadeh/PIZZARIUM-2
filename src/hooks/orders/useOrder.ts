import { useState } from "react";
import { insertOrder } from "@/lib/queries/orders";
import { OrderInsert } from "@/types/order";

export function useOrder() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const createOrder = async (order: OrderInsert) => {
		setLoading(true);
		setError(null);

		try {
			const data = await insertOrder(order);
			setLoading(false);
			return data;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to create order";

			setError(message);
			setLoading(false);
			return null;
		}
	};

	return { createOrder, loading, error };
}

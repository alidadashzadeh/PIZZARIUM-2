"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getOrderStatusClient } from "@/lib/queries/orders";

export function CartSyncClient() {
	const pendingOrderId = useCartStore((s) => s.pendingOrderId);
	const clearCart = useCartStore((s) => s.clearCart);
	const clearPendingOrderId = useCartStore((s) => s.clearPendingOrderId);

	useEffect(() => {
		async function syncPendingOrder() {
			if (!pendingOrderId) return;

			try {
				const order = await getOrderStatusClient(pendingOrderId);

				if (order?.paid === true) {
					clearCart();
					clearPendingOrderId();
				}
			} catch (err) {
				console.error("Failed to sync pending order", err);
			}
		}

		syncPendingOrder();
	}, [pendingOrderId, clearCart, clearPendingOrderId]);

	return null;
}

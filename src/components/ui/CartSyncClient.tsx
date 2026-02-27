"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getOrderStatusClient } from "@/lib/queries/orders";

export function CartSyncClient() {
	const pendingOrderId = useCartStore((s) => s.pendingOrderId);
	const clearCart = useCartStore((s) => s.clearCart);
	const clearPendingOrderId = useCartStore((s) => s.clearPendingOrderId);

	useEffect(() => {
		if (!pendingOrderId) return;

		let cancelled = false;
		let attempts = 0;
		const maxAttempts = 10; // 10 * 2s = 20 seconds

		const interval = setInterval(async () => {
			if (cancelled) return;

			attempts++;

			try {
				const order = await getOrderStatusClient(pendingOrderId);

				if (order?.paid === true) {
					clearCart();
					clearPendingOrderId();
					clearInterval(interval);
				}

				if (attempts >= maxAttempts) {
					clearInterval(interval);
				}
			} catch (err) {
				console.error("Failed to sync pending order", err);
				clearInterval(interval);
			}
		}, 2000);

		return () => {
			cancelled = true;
			clearInterval(interval);
		};
	}, [pendingOrderId, clearCart, clearPendingOrderId]);

	return null;
}

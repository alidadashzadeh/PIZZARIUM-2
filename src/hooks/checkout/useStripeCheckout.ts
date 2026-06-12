"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { CartItem, Delivery } from "@/types/CartType";
import { useState } from "react";

export function useStripeCheckout() {
	const user = useAuthStore((s) => s.user);
	const setPendingOrderId = useCartStore((s) => s.setPendingOrderId);
	const [stripeLoading, setStripeLoading] = useState(false);
	const [stripeError, setStripeError] = useState<string | null>(null);

	const checkout = async (items: CartItem[], delivery: Delivery) => {
		if (!items.length) return;
		if (!user) return;

		try {
			setStripeLoading(true);
			setStripeError(null);

			// Send line_items to backend
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items, delivery }),
			});

			const data = await res.json();
			setPendingOrderId(data.orderId);
			if (!res.ok) throw new Error(data?.error || "Checkout failed");
			if (!data?.url || !data?.orderId)
				throw new Error("Missing checkout data");

			// Redirect user to Stripe
			window.location.href = data.url;
		} catch (err: unknown) {
			let message = "Stripe checkout failed";

			if (err instanceof Error) {
				message = err.message;
			}

			console.error("Stripe Checkout Error:", message);

			setStripeError(message);
			setStripeLoading(false);
		}
	};

	return {
		checkout,
		stripeLoading,
		stripeError,
	};
}

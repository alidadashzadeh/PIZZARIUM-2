"use client";

import { useEffect, useRef } from "react";

import { useCartStore } from "@/store/useCartStore";
import { useDeliveryStore } from "@/store/useDeliveryStore";
import { useStripeCheckout } from "@/hooks/checkout/useStripeCheckout";

import { Spinner } from "@/components/ui/spinner";

export default function PayPage() {
	const cartItems = useCartStore((s) => s.items);
	const delivery = useDeliveryStore((s) => s.delivery);
	const { checkout, stripeLoading, stripeError } = useStripeCheckout();

	const hasCheckedOut = useRef(false); // prevents multiple calls

	useEffect(() => {
		if (hasCheckedOut.current) return; // already checked out
		if (!cartItems.length) return;

		hasCheckedOut.current = true;
		checkout(cartItems, delivery);
	}, [cartItems, delivery, checkout]);

	return (
		<div className="max-w-xl mx-auto py-20 text-center">
			<h1 className="text-2xl font-bold">Redirecting to Stripe...</h1>

			{stripeLoading && (
				<div className="flex gap-4">
					<Spinner className="mx-auto mt-6" />
					<div>Processing payment...</div>
				</div>
			)}

			{stripeError && <p className="text-red-500 mt-4">{stripeError}</p>}
		</div>
	);
}

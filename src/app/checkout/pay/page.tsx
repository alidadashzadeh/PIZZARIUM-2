"use client";

import { useEffect, useRef } from "react";

import { useCartStore } from "@/store/useCartStore";
import { useDeliveryStore } from "@/store/useDeliveryStore";
import { useStripeCheckout } from "@/hooks/checkout/useStripeCheckout";

import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function PayPage() {
	const cartItems = useCartStore((s) => s.items);
	const delivery = useDeliveryStore((s) => s.delivery);
	const { checkout, stripeLoading, stripeError } = useStripeCheckout();
	const router = useRouter();

	const hasCheckedOut = useRef(false);

	const okToProceed =
		delivery.full_name &&
		delivery.address &&
		delivery.phone_number &&
		cartItems.length > 0;

	useEffect(() => {
		if (hasCheckedOut.current) return;
		if (!okToProceed) {
			router.replace("/checkout");
			return;
		}

		hasCheckedOut.current = true;
		checkout(cartItems, delivery);
	}, [okToProceed, delivery, checkout, router, cartItems]);

	return (
		<div className="fixed inset-0 bg-black/10 flex flex-col items-center justify-center z-50 pointer-events-auto">
			<div className="text-center  max-w-xl mx-auto py-20">
				<h1 className="text-2xl font-bold mb-6">Redirecting to Stripe...</h1>

				{stripeLoading && (
					<div className="flex gap-4 items-center justify-center">
						<Spinner className="z-20" />
						<div>Processing payment...</div>
					</div>
				)}

				{stripeError && <p className="text-red-500 mt-4">{stripeError}</p>}
			</div>
		</div>
	);
}

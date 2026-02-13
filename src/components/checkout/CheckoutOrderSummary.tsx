"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import ItemsSummaryList from "../ui/ItemsSummaryList";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

import { useDeliveryStore } from "@/store/useDeliveryStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function CheckoutOrderSummary() {
	const router = useRouter();

	const cartItems = useCartStore((s) => s.items);
	const total = useCartStore((s) => s.total);
	const delivery = useDeliveryStore((s) => s.delivery);
	const user = useAuthStore((s) => s.user);

	const [loading, setLoading] = useState(false);

	const handlePayNow = () => {
		if (
			!delivery?.address?.trim() ||
			!delivery?.phone_number?.trim() ||
			!delivery?.full_name?.trim()
		) {
			toast.error("Delivery Info required");
			return;
		}

		if (!user) {
			toast.error("You must be logged in to proceed");
			return;
		}

		setLoading(true);
		router.push("/checkout/pay");
	};
	return (
		<Card className="p-6">
			<h2 className="text-xl font-semibold">Your Order</h2>

			<ItemsSummaryList items={cartItems} />
			<div className="border-t pt-4 flex justify-between font-bold">
				<span>Total</span>
				<span>${total}</span>
			</div>

			{/* Pay Button */}
			<Button
				size="lg"
				className="w-full mt-auto"
				disabled={loading || !cartItems.length}
				onClick={handlePayNow}
			>
				{loading ? (
					<>
						<Spinner className="w-5 h-5 mr-2" />
						Processing...
					</>
				) : (
					"Continue to Payment"
				)}
			</Button>
		</Card>
	);
}

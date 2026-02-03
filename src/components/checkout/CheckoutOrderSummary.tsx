"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { sortCartItems, totalPay } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "../ui/button";
import { useDeliveryStore } from "@/store/useDeliveryStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import ItemsSummaryList from "../ui/ItemsSummaryList";

export default function CheckoutOrderSummary() {
	const router = useRouter();

	const cartItems = sortCartItems(useCartStore((s) => s.items));
	const delivery = useDeliveryStore((s) => s.delivery);

	const total = totalPay(cartItems);

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

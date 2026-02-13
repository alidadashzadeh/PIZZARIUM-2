import CheckoutDeliveryInfo from "@/components/checkout/checkoutDeliveryInfo";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";

export default function CheckoutPage() {
	return (
		<div className="max-w-5xl mx-auto py-12 space-y-8">
			<h1 className="text-3xl font-bold">Checkout</h1>

			{/* Column Layout */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* delivery info */}
				<CheckoutDeliveryInfo />

				{/* Order Summary */}
				<CheckoutOrderSummary />
			</div>
		</div>
	);
}

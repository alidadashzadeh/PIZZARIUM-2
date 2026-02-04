import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { markOrderPaid, deleteOrder } from "@/lib/server/orders";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = req.headers.get("stripe-signature");

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.error("Stripe webhook signature verification failed:", err);
		return NextResponse.json(
			{ error: "Webhook signature verification failed" },
			{ status: 400 },
		);
	}

	console.log("Stripe Event Received:", event.type);

	// Checkout Session Completed
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as any;

		const orderId = session.metadata?.orderId;
		const paymentStatus = session.payment_status;

		console.log("Order ID:", orderId);
		console.log("Payment Status:", paymentStatus);

		if (orderId && paymentStatus === "paid") {
			// Retrieve PaymentIntent to get card details
			const paymentIntent = await stripe.paymentIntents.retrieve(
				session.payment_intent,
				{
					expand: ["payment_method"],
				},
			);

			const paymentMethod = paymentIntent.payment_method as any;

			const cardBrand = paymentMethod?.card?.brand; // visa, mastercard
			const cardLast4 = paymentMethod?.card?.last4; // 4242

			console.log("Card Brand:", cardBrand);
			console.log("Card Last4:", cardLast4);
			await markOrderPaid(orderId, session.id, cardBrand, cardLast4);
		}
	}

	// Checkout Session Expired
	if (event.type === "checkout.session.expired") {
		const session = event.data.object as any;
		const orderId = session.metadata?.orderId;

		console.log(
			"⚠️ Checkout expired or cancelled, deleting pending order:",
			orderId,
		);

		if (orderId) {
			await deleteOrder(orderId);
		}
	}

	// Payment Failed (Card Declined)
	if (event.type === "payment_intent.payment_failed") {
		const intent = event.data.object as any;

		const orderId = intent.metadata?.orderId;

		console.log("❌ Payment failed, deleting order:", orderId);

		if (orderId) {
			await deleteOrder(orderId);
		}
	}

	return NextResponse.json({ received: true });
}

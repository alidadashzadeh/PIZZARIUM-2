import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import {
	markOrderPaid,
	markOrderExpired,
	markOrderFailed,
} from "@/lib/server/orders";

export async function POST(req: Request) {
	const body = await req.text();
	const signature = req.headers.get("stripe-signature");

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature!,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.error("Stripe webhook signature verification failed:", err);
		return NextResponse.json({ error: "Bad signature" }, { status: 400 });
	}

	try {
		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;
			const orderId = session.metadata?.orderId;

			if (orderId && session.payment_status === "paid") {
				// best-effort card info (never block paid on it)
				let cardBrand: string | null = null;
				let cardLast4: string | null = null;

				if (
					session.payment_intent &&
					typeof session.payment_intent === "string"
				) {
					const pi = await stripe.paymentIntents.retrieve(
						session.payment_intent,
						{
							expand: ["payment_method"],
						},
					);

					const pm = pi.payment_method as Stripe.PaymentMethod | null;
					if (pm?.type === "card" && pm.card) {
						cardBrand = pm.card.brand ?? null;
						cardLast4 = pm.card.last4 ?? null;
					}
				}

				await markOrderPaid({
					orderId,
					stripeSessionId: session.id,
					cardBrand,
					cardLast4,
				});
			}
		}

		if (event.type === "checkout.session.expired") {
			const session = event.data.object as Stripe.Checkout.Session;
			const orderId = session.metadata?.orderId;
			if (orderId) await markOrderExpired(orderId);
		}

		if (event.type === "payment_intent.payment_failed") {
			const intent = event.data.object as Stripe.PaymentIntent;
			const orderId = intent.metadata?.orderId; // now set by payment_intent_data.metadata
			if (orderId) await markOrderFailed(orderId);
		}

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error("Webhook handler error:", err);
		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}
}

// import { NextResponse } from "next/server";
// import { stripe } from "@/lib/stripe";
// import { markOrderPaid, deleteOrder } from "@/lib/server/orders";
// import Stripe from "stripe";

// export async function POST(req: Request) {
// 	const body = await req.text();
// 	const signature = req.headers.get("stripe-signature");

// 	let event: Stripe.Event;

// 	try {
// 		event = stripe.webhooks.constructEvent(
// 			body,
// 			signature!,
// 			process.env.STRIPE_WEBHOOK_SECRET!,
// 		);
// 	} catch (err) {
// 		console.error("Stripe webhook signature verification failed:", err);
// 		return NextResponse.json(
// 			{ error: "Webhook signature verification failed" },
// 			{ status: 400 },
// 		);
// 	}

// 	if (event.type === "checkout.session.completed") {
// 		const session = event.data.object as Stripe.Checkout.Session;

// 		const orderId = session.metadata?.orderId;
// 		const paymentStatus = session.payment_status;

// 		if (orderId && paymentStatus === "paid") {
// 			if (
// 				!session.payment_intent ||
// 				typeof session.payment_intent !== "string"
// 			) {
// 				console.error("No payment_intent in session");
// 				return NextResponse.json(
// 					{ error: "No payment_intent found" },
// 					{ status: 400 },
// 				);
// 			}

// 			const paymentIntent = await stripe.paymentIntents.retrieve(
// 				session.payment_intent,
// 				{
// 					expand: ["payment_method"],
// 				},
// 			);

// 			const paymentMethod =
// 				paymentIntent.payment_method as Stripe.PaymentMethod | null;

// 			let cardBrand: string | null = null;
// 			let cardLast4: string | null = null;

// 			if (
// 				paymentMethod &&
// 				paymentMethod.type === "card" &&
// 				paymentMethod.card
// 			) {
// 				cardBrand = paymentMethod.card.brand;
// 				cardLast4 = paymentMethod.card.last4;
// 			}

// 			if (cardBrand && cardLast4) {
// 				await markOrderPaid(orderId, session.id, cardBrand, cardLast4);
// 			} else {
// 				console.warn("Card info missing, cannot mark order paid");
// 			}
// 		}
// 	}

// 	if (event.type === "checkout.session.expired") {
// 		const session = event.data.object as Stripe.Checkout.Session;
// 		const orderId = session.metadata?.orderId;

// 		if (orderId) {
// 			await deleteOrder(orderId);
// 		}
// 	}

// 	if (event.type === "payment_intent.payment_failed") {
// 		const intent = event.data.object as Stripe.PaymentIntent;
// 		const orderId = intent.metadata?.orderId;

// 		if (orderId) {
// 			await deleteOrder(orderId);
// 		}
// 	}

// 	return NextResponse.json({ received: true });
// }

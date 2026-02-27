import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
	markOrderPaid,
	markOrderExpired,
	markOrderFailed,
} from "@/lib/server/orders";

export async function POST(req: Request) {
	const signature = req.headers.get("stripe-signature");
	if (!signature) {
		return NextResponse.json(
			{ error: "Missing stripe-signature" },
			{ status: 400 },
		);
	}

	const body = await req.text();

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.error("Stripe webhook signature verification failed:", err);
		return NextResponse.json({ error: "Bad signature" }, { status: 400 });
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				const orderId = session.metadata?.orderId;

				if (!orderId) break;

				if (session.payment_status !== "paid") break;

				// 1) Mark paid FIRST (idempotent in DB!)
				await markOrderPaid({
					orderId,
					stripeSessionId: session.id,
					cardBrand: null,
					cardLast4: null,
				});

				// 2) Best-effort enrichment AFTER (never block paid)
				try {
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
							await markOrderPaid({
								orderId,
								stripeSessionId: session.id,
								cardBrand: pm.card.brand ?? null,
								cardLast4: pm.card.last4 ?? null,
							});
						}
					}
				} catch (e) {
					console.warn("Card enrichment failed (ignored):", e);
				}

				break;
			}

			case "checkout.session.expired": {
				const session = event.data.object as Stripe.Checkout.Session;
				const orderId = session.metadata?.orderId;
				if (orderId) await markOrderExpired(orderId);
				break;
			}

			case "payment_intent.payment_failed": {
				const intent = event.data.object as Stripe.PaymentIntent;
				const orderId = intent.metadata?.orderId;
				if (orderId) await markOrderFailed(orderId);
				break;
			}

			default:
				break;
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

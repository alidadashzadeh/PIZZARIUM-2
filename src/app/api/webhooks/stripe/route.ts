import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
	markOrderPaid,
	markOrderExpired,
	markOrderFailed,
} from "@/lib/server/orders";

function webhookStamp() {
	return {
		env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
		deployment:
			process.env.VERCEL_DEPLOYMENT_ID ??
			process.env.VERCEL_BUILD_ID ??
			"no-deploy-id",
	};
}

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
		console.error("[stripe-webhook] signature verification failed", err);
		return NextResponse.json({ error: "Bad signature" }, { status: 400 });
	}

	const stamp = webhookStamp();

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;

				const orderId = session.metadata?.orderId;
				if (!orderId || session.payment_status !== "paid") break;

				let cardBrand: string | null = null;
				let cardLast4: string | null = null;

				try {
					if (typeof session.payment_intent === "string") {
						const pi = await stripe.paymentIntents.retrieve(
							session.payment_intent,
							{ expand: ["payment_method"] },
						);

						const pm = pi.payment_method as Stripe.PaymentMethod | null;
						if (pm?.type === "card" && pm.card) {
							cardBrand = pm.card.brand ?? null;
							cardLast4 = pm.card.last4 ?? null;
						}
					}
				} catch {
					// enrichment is optional — silently ignore
				}

				await markOrderPaid({
					orderId,
					stripeSessionId: session.id,
					cardBrand,
					cardLast4,
				});

				console.info("[stripe-webhook] order paid", {
					orderId,
					sessionId: session.id,
					livemode: event.livemode,
				});

				break;
			}

			case "checkout.session.expired": {
				const session = event.data.object as Stripe.Checkout.Session;
				const orderId = session.metadata?.orderId;

				if (orderId) {
					await markOrderExpired(orderId);
					console.info("[stripe-webhook] order expired", { orderId });
				}

				break;
			}

			case "payment_intent.payment_failed": {
				const intent = event.data.object as Stripe.PaymentIntent;
				const orderId = intent.metadata?.orderId;

				if (orderId) {
					await markOrderFailed(orderId);
					console.info("[stripe-webhook] payment failed", { orderId });
				}

				break;
			}

			default:
				// silently ignore unrelated events
				break;
		}

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error("[stripe-webhook] handler failed", {
			error: err,
			stamp,
			eventId: event.id,
			type: event.type,
		});

		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}
}

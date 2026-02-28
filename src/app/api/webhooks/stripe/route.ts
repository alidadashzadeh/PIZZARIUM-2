// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";
// import {
// 	markOrderPaid,
// 	markOrderExpired,
// 	markOrderFailed,
// } from "@/lib/server/orders";

// export async function POST(req: Request) {
// 	const signature = req.headers.get("stripe-signature");
// 	if (!signature) {
// 		return NextResponse.json(
// 			{ error: "Missing stripe-signature" },
// 			{ status: 400 },
// 		);
// 	}

// 	const body = await req.text();

// 	let event: Stripe.Event;
// 	try {
// 		event = stripe.webhooks.constructEvent(
// 			body,
// 			signature,
// 			process.env.STRIPE_WEBHOOK_SECRET!,
// 		);
// 	} catch (err) {
// 		console.error("Stripe webhook signature verification failed:", err);
// 		return NextResponse.json({ error: "Bad signature" }, { status: 400 });
// 	}

// 	try {
// 		switch (event.type) {
// 			case "checkout.session.completed": {
// 				const session = event.data.object as Stripe.Checkout.Session;

// 				const orderId = session.metadata?.orderId;
// 				if (!orderId) break;
// 				if (session.payment_status !== "paid") break;

// 				let cardBrand: string | null = null;
// 				let cardLast4: string | null = null;

// 				// best-effort enrichment (never required)
// 				try {
// 					if (typeof session.payment_intent === "string") {
// 						const pi = await stripe.paymentIntents.retrieve(
// 							session.payment_intent,
// 							{
// 								expand: ["payment_method"],
// 							},
// 						);

// 						const pm = pi.payment_method as Stripe.PaymentMethod | null;
// 						if (pm?.type === "card" && pm.card) {
// 							cardBrand = pm.card.brand ?? null;
// 							cardLast4 = pm.card.last4 ?? null;
// 						}
// 					}
// 				} catch (e) {
// 					console.warn("Card enrichment failed (ignored):", e);
// 				}

// 				await markOrderPaid({
// 					orderId,
// 					stripeSessionId: session.id,
// 					cardBrand,
// 					cardLast4,
// 				});

// 				break;
// 			}

// 			case "checkout.session.expired": {
// 				const session = event.data.object as Stripe.Checkout.Session;
// 				const orderId = session.metadata?.orderId;
// 				if (orderId) await markOrderExpired(orderId);
// 				break;
// 			}

// 			case "payment_intent.payment_failed": {
// 				const intent = event.data.object as Stripe.PaymentIntent;
// 				const orderId = intent.metadata?.orderId;
// 				if (orderId) await markOrderFailed(orderId);
// 				break;
// 			}

// 			default:
// 				break;
// 		}

// 		return NextResponse.json({ received: true });
// 	} catch (err) {
// 		console.error("Webhook handler error:", err);
// 		return NextResponse.json(
// 			{ error: "Webhook handler failed" },
// 			{ status: 500 },
// 		);
// 	}
// }

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
		commit:
			process.env.VERCEL_GIT_COMMIT_SHA ??
			process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
			"no-commit",
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

	console.log("[stripe-webhook] request meta", {
		host: req.headers.get("host"),
		origin: req.headers.get("origin"),
		forwardedFor: req.headers.get("x-forwarded-for"),
		forwardedProto: req.headers.get("x-forwarded-proto"),
		forwardedHost: req.headers.get("x-forwarded-host"),
		userAgent: req.headers.get("user-agent"),
		hasSignature: !!signature,
	});

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

	const stamp = webhookStamp();
	console.log("[stripe-webhook] received", {
		stamp,
		eventId: event.id,
		type: event.type,
		livemode: event.livemode,
		created: event.created,
	});

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;

				const orderId = session.metadata?.orderId;
				if (!orderId) break;
				if (session.payment_status !== "paid") break;

				let cardBrand: string | null = null;
				let cardLast4: string | null = null;

				// best-effort enrichment (never required)
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
				} catch (e) {
					console.warn("Card enrichment failed (ignored):", e);
				}

				console.log("[stripe-webhook] marking paid", {
					stamp,
					eventId: event.id,
					orderId,
					sessionId: session.id,
				});

				await markOrderPaid({
					orderId,
					stripeSessionId: session.id,
					cardBrand,
					cardLast4,
				});

				break;
			}

			case "checkout.session.expired": {
				const session = event.data.object as Stripe.Checkout.Session;
				const orderId = session.metadata?.orderId;

				console.log("[stripe-webhook] session expired", {
					stamp,
					eventId: event.id,
					orderId,
					sessionId: session.id,
				});

				if (orderId) await markOrderExpired(orderId);
				break;
			}

			case "payment_intent.payment_failed": {
				const intent = event.data.object as Stripe.PaymentIntent;
				const orderId = intent.metadata?.orderId;

				console.log("[stripe-webhook] payment failed", {
					stamp,
					eventId: event.id,
					orderId,
					paymentIntentId: intent.id,
				});

				if (orderId) await markOrderFailed(orderId);
				break;
			}

			default:
				console.log("[stripe-webhook] ignored event", {
					stamp,
					eventId: event.id,
					type: event.type,
				});
				break;
		}

		return NextResponse.json({ received: true, stamp });
	} catch (err) {
		console.error("Webhook handler error:", err);
		return NextResponse.json(
			{ error: "Webhook handler failed", stamp },
			{ status: 500 },
		);
	}
}

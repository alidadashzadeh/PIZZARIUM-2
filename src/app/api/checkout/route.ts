import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
	try {
		const { line_items, orderId } = await req.json();

		if (!line_items?.length) {
			return NextResponse.json(
				{ error: "No line items provided" },
				{ status: 400 },
			);
		}

		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items,

			// success_url: `${siteUrl}/success`,
			success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}/cancel`,

			metadata: {
				orderId,
			},
			expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
		});

		return NextResponse.json({ url: session.url });
	} catch (err: unknown) {
		let message = "Something went wrong";

		if (err instanceof Error) {
			message = err.message;
		}

		console.error("Stripe Checkout Error:", message);

		return NextResponse.json({ error: message }, { status: 500 });
	}
}

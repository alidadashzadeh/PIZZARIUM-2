import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { line_items, orderId } = await req.json();

    if (!line_items?.length) {
      return NextResponse.json(
        { error: "No line items provided" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,

      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/cancel`,

      metadata: {
        orderId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err.message);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

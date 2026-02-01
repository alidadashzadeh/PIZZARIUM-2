import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { markOrderPaid } from "@/lib/server/orders";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  console.log("✅ Stripe Event Received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata?.orderId;
    const paymentStatus = session.payment_status;

    console.log("Order ID:", orderId);
    console.log("Payment Status:", paymentStatus);

    if (orderId && paymentStatus === "paid") {
      await markOrderPaid(orderId, session.id);
    }
  }

  return NextResponse.json({ received: true });
}

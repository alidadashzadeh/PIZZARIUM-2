import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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
    console.error("Stripe webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle checkout session completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const orderId = session.metadata?.orderId;
    const paymentStatus = session.payment_status;

    if (orderId && paymentStatus === "paid") {
      // Update the order in Supabase
      const { error } = await supabaseAdmin
        .from("orders")
        .update({
          paid: true,
          status: "preparing",
          stripe_session_id: session.id,
        })
        .eq("id", orderId);

      if (error) console.error("Supabase order update failed:", error);
      else console.log(`✅ Order ${orderId} marked as paid`);
    }
  }

  return NextResponse.json({ received: true });
}

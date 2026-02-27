import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function markOrderPaid(
	orderId: string,
	stripeSessionId: string,
	cardBrand: string,
	cardLast4: string,
) {
	const { error } = await supabaseAdmin
		.from("orders")
		.update({
			paid: true,
			status: "preparing",
			stripe_session_id: stripeSessionId,
			card_brand: cardBrand,
			card_last4: cardLast4,
		})
		.eq("id", orderId);

	if (error) {
		console.error("Supabase order update failed:", error);
		throw new Error("Failed to mark order as paid");
	}
}

export async function deleteOrder(orderId: string) {
	const { error } = await supabaseAdmin
		.from("orders")
		.delete()
		.eq("id", orderId);

	if (error) {
		console.error("Failed to delete order:", error);
		throw error;
	}
}

// export async function markOrderPaid(args: {
// 	orderId: string;
// 	stripeSessionId: string;
// 	cardBrand: string | null;
// 	cardLast4: string | null;
// }) {
// 	const { orderId, stripeSessionId, cardBrand, cardLast4 } = args;

// 	// paid wins over any other status
// 	const { error } = await supabaseAdmin
// 		.from("orders")
// 		.update({
// 			status: "paid",
// 			stripe_session_id: stripeSessionId,
// 			paid_at: new Date().toISOString(),
// 			card_brand: cardBrand,
// 			card_last4: cardLast4,
// 		})
// 		.eq("id", orderId)
// 		.neq("status", "paid"); // idempotent

// 	if (error) throw error;
// }

export async function markOrderExpired(orderId: string) {
	// don't override paid
	const { error } = await supabaseAdmin
		.from("orders")
		.update({ status: "expired" })
		.eq("id", orderId)
		.neq("status", "paid");

	if (error) throw error;
}

export async function markOrderFailed(orderId: string) {
	// don't override paid
	const { error } = await supabaseAdmin
		.from("orders")
		.update({ status: "failed" })
		.eq("id", orderId)
		.neq("status", "paid");

	if (error) throw error;
}

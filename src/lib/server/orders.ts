import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { MarkOrderPaidArgs } from "@/types/CartType";

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
export async function markOrderPaid({
	orderId,
	stripeSessionId,
	cardBrand,
	cardLast4,
}: MarkOrderPaidArgs) {
	const { error: payError } = await supabaseAdmin
		.from("orders")
		.update({
			status: "preparing",
			paid: true,
			card_brand: cardBrand,
			card_last4: cardLast4,
			paid_at: new Date().toISOString(),
		})
		.eq("id", orderId)
		.eq("stripe_session_id", stripeSessionId);

	if (payError) throw payError;
}
export async function markOrderExpired(orderId: string) {
	// don't override paid
	const { error } = await supabaseAdmin
		.from("orders")
		.update({ status: "expired" })
		.eq("id", orderId)
		.neq("paid", true);

	if (error) throw error;
}

export async function markOrderFailed(orderId: string) {
	// don't override paid
	const { error } = await supabaseAdmin
		.from("orders")
		.update({ status: "failed" })
		.eq("id", orderId)
		.neq("paid", true);

	if (error) throw error;
}

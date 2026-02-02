import "server-only";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function markOrderPaid(orderId: string, stripeSessionId: string) {
	const { error } = await supabaseAdmin
		.from("orders")
		.update({
			paid: true,
			status: "preparing",
			stripe_session_id: stripeSessionId,
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

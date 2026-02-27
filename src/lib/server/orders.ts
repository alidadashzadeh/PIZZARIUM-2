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
	// 1️⃣ Attach session id if missing
	const { error: claimError } = await supabaseAdmin
		.from("orders")
		.update({ stripe_session_id: stripeSessionId })
		.eq("id", orderId)
		.is("stripe_session_id", null);

	if (claimError) throw claimError;

	// 2️⃣ Build strictly typed update object
	const updateData: {
		status: "preparing";
		paid: true;
		paid_at: string;
		card_brand?: string;
		card_last4?: string;
	} = {
		status: "preparing",
		paid: true,
		paid_at: new Date().toISOString(),
	};

	if (cardBrand !== null) {
		updateData.card_brand = cardBrand;
	}

	if (cardLast4 !== null) {
		updateData.card_last4 = cardLast4;
	}

	// 3️⃣ Mark paid only if unpaid and session matches
	const { error: payError } = await supabaseAdmin
		.from("orders")
		.update(updateData)
		.eq("id", orderId)
		.eq("stripe_session_id", stripeSessionId)
		.eq("paid", false);

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
		.neq("status", "paid");

	if (error) throw error;
}

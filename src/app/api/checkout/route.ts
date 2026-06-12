import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
	CartItem,
	Delivery,
	DrinkLineItem,
	IngredientsLineItem,
	SignatureLineItem,
} from "@/types/CartType";
import { assertQty, basePriceForSize, buildMap } from "@/lib/utils";
import { fetchByIds } from "@/lib/queries/orders";

export async function POST(req: Request) {
	try {
		const supabase = await createSupabaseServerClient();

		//  auth check
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		//  parse body
		const body = (await req.json()) as {
			items: CartItem[];
			delivery: Delivery;
		};
		const items = body?.items ?? [];
		const delivery = body?.delivery;

		if (!items.length) {
			return NextResponse.json({ error: "No items provided" }, { status: 400 });
		}
		if (!delivery?.full_name || !delivery?.address || !delivery?.phone_number) {
			return NextResponse.json(
				{ error: "Missing delivery fields" },
				{ status: 400 },
			);
		}

		// basic validation
		for (const item of items) {
			if (!assertQty(item.quantity)) {
				return NextResponse.json(
					{ error: "Invalid quantity" },
					{ status: 400 },
				);
			}
			if (item.type === "signature") {
				if (!item.id || !item.size)
					return NextResponse.json(
						{ error: "Invalid signature pizza item" },
						{ status: 400 },
					);
			}
			if (item.type === "drink") {
				if (!item.id)
					return NextResponse.json(
						{ error: "Invalid drink item" },
						{ status: 400 },
					);
			}
			if (item.type === "custom") {
				if (
					!item.size ||
					!item.dough?.id ||
					!item.crust?.id ||
					!item.sauce?.id ||
					!item.cheese?.id ||
					!item.cook?.id
				) {
					return NextResponse.json(
						{ error: "Invalid custom pizza item" },
						{ status: 400 },
					);
				}
			}
		}

		//  make set to deduplicate
		const signatureIds = new Set<string>();
		const drinkIds = new Set<string>();

		const doughIds = new Set<string>();
		const crustIds = new Set<string>();
		const sauceIds = new Set<string>();
		const cheeseIds = new Set<string>();
		const cookIds = new Set<string>();
		const toppingIds = new Set<string>();

		for (const item of items) {
			if (item.type === "signature") signatureIds.add(item?.id ?? "");
			if (item.type === "drink") drinkIds.add(item.id ?? "");

			if (item.type === "custom") {
				if (item.dough?.id) {
					doughIds.add(String(item.dough.id));
				}
				if (item.crust?.id) {
					crustIds.add(String(item.crust.id));
				}
				if (item.sauce?.id) {
					sauceIds.add(String(item.sauce.id));
				}
				if (item.cheese?.id) {
					cheeseIds.add(String(item.cheese.id));
				}
				if (item.cook?.id) {
					cookIds.add(String(item.cook.id));
				}

				item.toppings?.forEach((t) => {
					toppingIds.add(String(t.id));
				});
			}
		}

		// fetch all items and ingredients data (just id, name, price) from DB (server truth)
		const [
			sigRes,
			drinkRes,
			doughRes,
			crustRes,
			cookRes,
			sauceRes,
			cheeseRes,
			toppingRes,
		] = await Promise.all([
			fetchByIds<SignatureLineItem>("signature_pizzas", signatureIds),

			fetchByIds<DrinkLineItem>("drinks", drinkIds),
			fetchByIds<IngredientsLineItem>("doughs", doughIds),
			fetchByIds<IngredientsLineItem>("crusts", crustIds),
			fetchByIds<IngredientsLineItem>("cooks", cookIds),
			fetchByIds<IngredientsLineItem>("sauces", sauceIds),
			fetchByIds<IngredientsLineItem>("cheeses", cheeseIds),
			fetchByIds<IngredientsLineItem>("toppings", toppingIds),
		]);

		// check for err on promise.all
		const all = [
			sigRes,
			drinkRes,
			doughRes,
			crustRes,
			cookRes,
			sauceRes,
			cheeseRes,
			toppingRes,
		];
		for (const r of all) {
			if (r.error) throw r.error;
		}

		// turn data into map for faster lookup
		const signatureMap = new Map<string, SignatureLineItem>(
			(sigRes.data ?? []).map((x) => [x.id, x]),
		);
		const drinkMap = new Map<string, DrinkLineItem>(
			(drinkRes.data ?? []).map((x) => [x.id, x]),
		);
		const doughMap = buildMap(doughRes.data);
		const crustMap = buildMap(crustRes.data);
		const cookMap = buildMap(cookRes.data);
		const sauceMap = buildMap(sauceRes.data);
		const cheeseMap = buildMap(cheeseRes.data);
		const toppingMap = buildMap(toppingRes.data);

		//  build Stripe line_items + compute total server-side
		let total = 0;

		const line_items = items.map((item) => {
			let name = "";
			let unitPrice = 0;

			if (item.type === "signature") {
				const signature = signatureMap.get(item.id ?? "");
				if (!signature)
					throw new Error(`Signature pizza not found: ${item.id}`);

				const size = item.size;
				if (!size) throw new Error("Pizza size is required");

				const p = signature.price?.[size];
				if (typeof p !== "number") {
					throw new Error(`Missing price for ${signature.name} (${size})`);
				}

				unitPrice = p;
				name = `${signature.name} (${size})`;
			}

			if (item.type === "drink") {
				const drink = drinkMap.get(item.id ?? "");
				if (!drink) throw new Error(`Drink not found: ${item.id}`);

				unitPrice = drink.price;
				if (typeof unitPrice !== "number")
					throw new Error(`Invalid drink price: ${drink.name}`);

				name = drink.name;
			}

			if (item.type === "custom") {
				const crust = crustMap.get(item.crust?.id ?? "");
				const cook = cookMap.get(item.cook?.id ?? "");
				const sauce = sauceMap.get(item.sauce?.id ?? "");
				const dough = doughMap.get(item.dough?.id ?? "");
				const cheese = cheeseMap.get(item.cheese?.id ?? "");

				if (!crust) throw new Error(`Crust not found: ${item.crust?.id}`);
				if (!cook) throw new Error(`Cook not found: ${item.cook?.id}`);
				if (!sauce) throw new Error(`Sauce not found: ${item.sauce?.id}`);
				if (!cheese) throw new Error(`Cheese not found: ${item.cheese?.id}`);
				if (!dough) throw new Error(`dough not found: ${item.dough?.id}`);

				if (!item?.size) {
					throw new Error("Pizza size is required");
				}
				const base = basePriceForSize(item.size);

				const toppingsSum = (item.toppings ?? []).reduce((sum, topping) => {
					const tid = String(topping?.id);
					const t = toppingMap.get(tid);

					if (!t) throw new Error(`Topping not found: ${tid}`);
					if (typeof t.price !== "number")
						throw new Error(`Invalid topping price: ${t.name}`);

					return sum + t.price;
				}, 0);

				unitPrice =
					base +
					crust.price +
					dough.price +
					cook.price +
					sauce.price +
					cheese.price +
					toppingsSum;

				name = `Custom Pizza (${item.size})`;
			}

			total += unitPrice * item.quantity;

			return {
				quantity: item.quantity,
				price_data: {
					currency: "usd",
					product_data: { name },
					unit_amount: Math.round(unitPrice * 100),
				},
			};
		});

		//  create order in DB (pending_payment)
		// Store the exact items from request (or enrich them) — but do not trust price coming from client.

		const { data: order, error: orderErr } = await supabase
			.from("orders")
			.insert({
				user_id: user.id,
				status: "pending_payment",
				items,
				total: total.toFixed(2),
				customer_name: delivery.full_name,
				delivery_address: delivery.address,
				delivery_phone: delivery.phone_number,
				delivery_instructions: delivery.delivery_instructions ?? "",
			})
			.select("id")
			.single();

		if (orderErr || !order) {
			console.error("Order insert error:", orderErr);
			return NextResponse.json(
				{ error: "Order creation failed" },
				{ status: 500 },
			);
		}

		//  create stripe session
		const orderId = order.id as string;
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			payment_method_types: ["card"],
			line_items,
			success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}/cancel`,
			client_reference_id: orderId,
			metadata: { orderId },
			// This makes payment_intent events also have orderId:
			payment_intent_data: {
				metadata: { orderId },
			},
			expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
		});

		//  store stripe session id on the order (useful for lookup/idempotency)
		const { error: updErr } = await supabase
			.from("orders")
			.update({ stripe_session_id: session.id })
			.eq("id", orderId);

		if (updErr) {
			console.warn("Failed to store stripe_session_id:", updErr);
		}

		return NextResponse.json({ url: session.url, orderId });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Something went wrong";
		console.error("Checkout route error:", message);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

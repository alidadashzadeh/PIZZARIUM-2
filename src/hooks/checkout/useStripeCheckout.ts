"use client";

import { useState } from "react";
import { useOrder } from "@/hooks/orders/useOrder";
import { useAuthStore } from "@/store/useAuthStore";
import { CartItem } from "@/types/pizzaType";
import { totalPay } from "@/lib/utils";

export function useStripeCheckout() {
  const { createOrder } = useOrder();
  const user = useAuthStore((s) => s.user);

  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const checkout = async (
    items: CartItem[],
    shipping: { address: string; phone_number: string }
  ) => {
    if (!items.length) return;

    try {
      setStripeLoading(true);
      setStripeError(null);

      const total = totalPay(items);

      // 1️⃣ Create order in Supabase
      const order = await createOrder({
        user_id: user?.id,
        items,
        total,
        shipping_address: shipping.address,
        shipping_phone: shipping.phone_number,
      });

      if (!order) throw new Error("Order creation failed");

      // 2️⃣ Build Stripe line_items directly
      const line_items = items.map((item) => {
        let finalPrice: number;

        // Drinks already have numeric price
        if (typeof item.price === "number") {
          finalPrice = item.price;
        }

        // Pizzas have object prices by size
        else if (typeof item.price === "object" && item.size) {
          finalPrice = item.price[item.size];
        }

        // Invalid case
        else {
          throw new Error(`Invalid price for item: ${item.name}`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.size
                ? `${item.name} (${item.size})`
                : item.name || "Product",
            },

            // ✅ Stripe requires integer cents
            unit_amount: Math.round(finalPrice * 100),
          },
          quantity: item.quantity || 1,
        };
      });

      // 3️⃣ Send line_items to backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items,
          orderId: order.id,
        }),
      });

      const data = await res.json();

      if (!data.url) throw new Error("Stripe session URL missing");

      // ✅ Redirect user to Stripe
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Stripe Checkout Error:", err.message || err);

      setStripeError(err.message);
      setStripeLoading(false);
    }
  };

  return {
    checkout,
    stripeLoading,
    stripeError,
  };
}

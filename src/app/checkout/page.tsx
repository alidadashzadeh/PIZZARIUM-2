"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useDeliveryStore } from "@/store/useDeliveryStore";
import { useCartStore } from "@/store/useCartStore";

import { useProfile } from "@/hooks/profile/useProfile";
import { totalPay, sortCartItems } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import CheckoutDeliveryInfo from "@/components/checkout/checkoutDeliveryInfo";

export default function CheckoutPage() {
  const router = useRouter();

  const cartItems = sortCartItems(useCartStore((s) => s.items));
  const total = totalPay(cartItems);
  const shipping = useDeliveryStore((s) => s.shipping);
  // const { data: profile } = useProfile();
  const [loading, setLoading] = useState(false);

  const handlePayNow = () => {
    if (!shipping?.address?.trim() || !shipping?.phone_number?.trim()) {
      toast.error("Delivery Info required");
      return;
    }

    setLoading(true);
    // ✅ Go to pay page
    router.push("/checkout/pay");
  };

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {/* Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* delivery info */}
        <CheckoutDeliveryInfo />

        {/* Order Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Your Order</h2>

          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="flex justify-between text-sm "
            >
              <span>
                {item.name} {item.size && `(${item.size})`} × {item.quantity}
              </span>
              <span>${item.lineTotal.toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Pay Button */}
          <Button
            size="lg"
            className="w-full"
            disabled={loading}
            onClick={handlePayNow}
          >
            {loading ? (
              <>
                <Spinner className="w-5 h-5 mr-2" />
                Processing...
              </>
            ) : (
              "Pay Now"
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
}

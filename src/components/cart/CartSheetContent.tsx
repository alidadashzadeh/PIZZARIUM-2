"use client";

import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Large, Muted } from "../ui/Typography";

import CartItemList from "./CartItemList";

import { useCartStore } from "@/store/useCartStore";

import { sortCartItems, totalPay } from "@/lib/utils";
import { useStripeCheckout } from "@/hooks/checkout/useStripeCheckout";
import Link from "next/link";

export default function CartSheetContent() {
  const items = sortCartItems(useCartStore((s) => s.items));
  const total = totalPay(items);

  const { checkout, stripeLoading, stripeError } = useStripeCheckout();

  return (
    <SheetContent
      side="right"
      className="w-[600px] sm:max-w-[600px] flex flex-col min-h-screen"
    >
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
        <SheetDescription>
          Make changes to your Cart here. Click Checkout when you&apos;re done.
        </SheetDescription>
      </SheetHeader>

      <div className="flex justify-between px-4 border-b">
        <Muted>Items</Muted>
        <Muted>Price</Muted>
      </div>

      <div className="overflow-y-auto scrollbar-hide">
        <CartItemList />
      </div>

      <SheetFooter className="mt-auto border-t pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Muted>Total:</Muted>
            <Large>${total.toFixed(2)}</Large>
          </div>

          <Link href={"/checkout"}>
            <Button
              size="lg"
              className="px-8 flex items-center justify-center gap-2"
              disabled={!items.length || stripeLoading}
              // onClick={() => checkout(items)}
            >
              {stripeLoading ? (
                <>
                  <Spinner className="w-5 h-5 animate-spin text-white" />
                  Processing
                </>
              ) : (
                "Checkout"
              )}
            </Button>
          </Link>
        </div>

        {stripeError && <p className="text-red-500 mt-2">{stripeError}</p>}
      </SheetFooter>
    </SheetContent>
  );
}

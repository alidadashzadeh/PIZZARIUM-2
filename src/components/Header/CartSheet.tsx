"use client";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CartSheet() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            className="cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6 cursor-pointer" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[400px] sm:w-[450px]">
          {/* <CartContent /> */}
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Make changes to your Cart here. Click Checkout when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div>test</div>
          <SheetFooter>
            <Button type="submit">Checkout</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

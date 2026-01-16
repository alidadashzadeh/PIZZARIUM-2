import { Button } from "../ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import CartItemList from "./CartItemList";

export default function CartSheetContent() {
  return (
    <SheetContent
      side="right"
      className="w-[600px] sm:max-w-[600px] flex flex-col"
    >
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Make changes to your Cart here. Click Checkout when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <div className=" overflow-y-auto scrollbar-hide">
        <CartItemList />
      </div>
      <SheetFooter>
        <Button type="submit">Checkout</Button>
      </SheetFooter>
    </SheetContent>
  );
}

import { Button } from "./button";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import CartItemList from "./CartItemList";

export default function ItemCartSheetContent() {
  return (
    <SheetContent side="right" className="w-[400px] sm:w-[450px]">
      {/* <CartContent /> */}
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Make changes to your Cart here. Click Checkout when you&apos;re done.
        </SheetDescription>
      </SheetHeader>
      <CartItemList />
      <SheetFooter>
        <Button type="submit">Checkout</Button>
      </SheetFooter>
    </SheetContent>
  );
}

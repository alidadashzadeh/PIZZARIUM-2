import { Button } from "../ui/button";
import {
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";
import { Muted } from "../ui/Typography";
import CartItemList from "./CartItemList";

export default function CartSheetContent() {
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
			<div className=" overflow-y-auto scrollbar-hide">
				<CartItemList />
			</div>
			<SheetFooter className="mt-auto">
				<Button type="submit">Checkout</Button>
			</SheetFooter>
		</SheetContent>
	);
}

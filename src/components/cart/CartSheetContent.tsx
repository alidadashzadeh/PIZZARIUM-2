"use client";

import { Button } from "../ui/button";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../ui/sheet";
import { Large, Muted } from "../ui/Typography";

import CartItemList from "./CartItemList";

import { useCartStore } from "@/store/useCartStore";

import Link from "next/link";

export default function CartSheetContent() {
	const items = useCartStore((s) => s.items);
	const total = useCartStore((s) => s.total);

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

					<SheetClose asChild>
						{items.length ? (
							<Link href="/checkout">
								<Button
									size="lg"
									className="px-16 flex items-center justify-center gap-2"
								>
									Checkout
								</Button>
							</Link>
						) : (
							<Button
								size="lg"
								className="px-16 flex items-center justify-center gap-2"
								disabled
							>
								Checkout
							</Button>
						)}
					</SheetClose>
				</div>
			</SheetFooter>
		</SheetContent>
	);
}

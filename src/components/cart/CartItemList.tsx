"use client";

import CartItemCard from "./CartItemCard";

import { useCartStore } from "@/store/useCartStore";

export default function CartItemList() {
	const items = useCartStore((s) => s.items);

	return (
		<div>
			{items.map((item) => (
				<CartItemCard key={item.cartItemId} item={item} />
			))}
		</div>
	);
}

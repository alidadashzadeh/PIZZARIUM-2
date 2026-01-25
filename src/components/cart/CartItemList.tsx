"use client";

import { useCartStore } from "@/store/useCartStore";
import React from "react";
import CartItemCard from "./CartItemCard";
import { sortCartItems } from "@/lib/utils";

export default function CartItemList() {
	const items = useCartStore((s) => s.items);

	const sortedItems = sortCartItems(items);
	return (
		<div>
			{sortedItems.map((item) => (
				<CartItemCard key={item.cartItemId} item={item} />
			))}
		</div>
	);
}

"use client";

import { useEffect, useState } from "react";

import { SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";

export default function CartSheetTrigger() {
	const items = useCartStore((s) => s.items);
	const [bump, setBump] = useState(false);

	useEffect(() => {
		if (!items.length) return;

		setBump(false);
		requestAnimationFrame(() => setBump(true));
	}, [items.length]);

	return (
		<div className="relative" data-cart-target>
			{items.length > 0 && (
				<span
					className={`
            pointer-events-none
            absolute -right-2 -bottom-2
            min-w-[18px] h-[18px]
            px-1
            flex items-center justify-center
            rounded-full
            bg-primary text-primary-foreground
            text-[11px] font-medium
            leading-none
            ${bump ? "cart-badge-bump" : ""}
          `}
				>
					{items.length}
				</span>
			)}
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					aria-label="Open cart"
					className="cursor-pointer"
				>
					<ShoppingCart
						className={`h-6 w-6 cursor-pointer ${bump ? "cart-bump" : ""}`}
						onAnimationEnd={() => setBump(false)}
					/>
				</Button>
			</SheetTrigger>
		</div>
	);
}

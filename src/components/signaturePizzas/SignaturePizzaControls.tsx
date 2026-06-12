"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Quantity from "../ui/Quantity";
import Size from "../ui/Size";
import { Large, P } from "../ui/Typography";

import { useCartStore } from "@/store/useCartStore";

import { SignaturePizzaInfoProps } from "@/types/siganaturPizzaType";

type PizzaSize = "small" | "medium" | "large";

export default function SignaturePizzaControls({
	pizza,
}: SignaturePizzaInfoProps) {
	const addItem = useCartStore((s) => s.addItem);
	const [size, setSize] = useState<PizzaSize>("small");
	const [quantity, setQuantity] = useState(1);

	const pricePerPizza = useMemo(
		() => pizza?.price[size] ?? 0,
		[pizza?.price, size],
	);

	const totalPrice = useMemo(
		() => (pricePerPizza * quantity).toFixed(2),
		[pricePerPizza, quantity],
	);

	const cartItem = useMemo(
		() => ({
			id: pizza.id,
			name: pizza.name,
			image: pizza.image,
			price: pizza.price,
			size,
			quantity,
			type: "signature" as const,
		}),
		[pizza, size, quantity],
	);

	const handleAddToCart = useCallback(() => {
		addItem(cartItem);
	}, [cartItem, addItem]);

	return (
		<Card className="w-full p-2 h-fit lg:sticky lg:top-4">
			<CardContent className="flex flex-col gap-6">
				<div>
					<P>Size</P>
					<Size pizza={pizza} size={size} setSize={setSize} />
				</div>

				<div className="flex  items-center gap-8">
					<P>Quantity</P>
					<Quantity quantity={quantity} setQuantity={setQuantity} />
				</div>

				{/* Footer */}
				<div className="mt-2 flex items-center gap-8">
					<div className="flex items-center gap-2">
						<P>Total:</P>
						<Large>${totalPrice}</Large>
					</div>

					<div>
						<Button
							size="lg"
							className="w-full sm:w-auto cursor-pointer"
							onClick={handleAddToCart}
						>
							Add to Cart
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

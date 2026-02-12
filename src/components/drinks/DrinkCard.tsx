"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { H4, Large } from "../ui/Typography";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { flyToCart } from "@/lib/utils";
import { Drink } from "@/types/DrinkType";

type DrinkCardProps = {
	drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
	const addItem = useCartStore((s) => s.addItem);

	return (
		<Card className="relative items-center">
			<CardContent>
				<div className="relative w-44 aspect-square rounded-md overflow-hidden filter drop-shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
					<Image src={drink?.image} alt="Pizza" width={196} height={196} />
				</div>

				<div className="flex flex-col gap-2 items-center">
					<H4>{drink.name}</H4>
					<div className="flex gap-2">{drink?.price} $</div>
					<Button
						className="cursor-pointer"
						onClick={(e) => {
							e.preventDefault();
							const added = addItem({ ...drink, type: "drink", quantity: 1 });

							if (!added) return;

							const card =
								(e.currentTarget.closest(
									"[data-product-card]",
								) as HTMLElement) ?? e.currentTarget;
							flyToCart(card);
						}}
						variant="default"
						size="sm"
					>
						<Large> Add to cart</Large>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

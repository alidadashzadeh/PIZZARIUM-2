import React from "react";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { CartItemCardProps } from "./CartItemCard";
import { Trash } from "lucide-react";

export default function CartItemCardRemoveBtn({ item }: CartItemCardProps) {
	const removeItem = useCartStore((s) => s.removeItem);

	return (
		<Button
			variant="outline"
			size={"sm"}
			className="cursor-pointer"
			onClick={() => {
				removeItem(item?.cartItemId);
			}}
		>
			<Trash />
		</Button>
	);
}

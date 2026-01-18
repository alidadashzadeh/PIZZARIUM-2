import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";
import { CartItemCardProps } from "./CartItemCard";
import { Muted } from "../ui/Typography";

export default function CartItemCardQuantity({ item }: CartItemCardProps) {
	const decreaseQty = useCartStore((s) => s.decreaseCartItemQty);
	const increaseQty = useCartStore((s) => s.increaseCartItemQty);
	return (
		<div className="flex items-center gap-1">
			<Muted className="w-8">Qty</Muted>
			<Button
				className="cursor-pointer"
				variant="outline"
				size="sm"
				onClick={() => {
					decreaseQty(item?.cartItemId);
				}}
			>
				-
			</Button>
			<span className="w-8 text-center">{item?.quantity}</span>
			<Button
				className="cursor-pointer"
				variant="outline"
				size="sm"
				onClick={() => {
					increaseQty(item?.cartItemId);
				}}
			>
				+
			</Button>
		</div>
	);
}

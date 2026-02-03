import { sortCartItems } from "@/lib/utils";
import { CartItem } from "@/types/pizzaType";

type Props = {
	items: CartItem[];
};

export default function ItemsSummaryList({ items }: Props) {
	const sortedItems = sortCartItems(items);
	return (
		<div className="space-y-2">
			{sortedItems?.map((item) => (
				<div key={item.cartItemId} className="flex justify-between text-sm">
					<span>
						{item.name} {item.size && `(${item.size})`} × {item.quantity}
					</span>

					<span>${item.lineTotal.toFixed(2)}</span>
				</div>
			))}
		</div>
	);
}

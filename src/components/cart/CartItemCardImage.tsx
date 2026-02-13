import Image from "next/image";
import { CartItemCardProps } from "./CartItemCard";

export default function CartItemCardImage({ item }: CartItemCardProps) {
	return (
		<div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
			{item?.type === "custom" &&
				item?.toppings &&
				item?.toppings?.length > 0 && (
					<div className="relative w-full h-full">
						{/* base pizza */}
						<Image
							src="/base-pizza.png"
							alt="Pizza base"
							fill
							className="object-contain"
						/>
						{/* toppings */}
						{item.toppings.map((topping) =>
							topping.image_raw ? (
								<Image
									key={topping.id}
									src={topping.image_raw}
									alt={topping.name}
									fill
									className="object-contain"
								/>
							) : null,
						)}
					</div>
				)}

			{item.type !== "custom" && item.image && (
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			)}
		</div>
	);
}

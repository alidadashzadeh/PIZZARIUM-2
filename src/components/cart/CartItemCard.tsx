import { CartItem } from "@/types/CartType";
import CartItemCardQuantity from "./CartItemCardQuantity";
import CartItemCardImage from "./CartItemCardImage";
import CartItemCardRemoveBtn from "./CartItemCardRemoveBtn";
import CartItemCardSize from "./CartItemCardSize";
import { Separator } from "../ui/separator";
import { Large, Muted, Small } from "../ui/Typography";

export interface CartItemCardProps {
	item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
	return (
		<div className="flex relative group  items-start gap-4 p-4 border-b last:border-b-0 hover:bg-muted/40 transition">
			{/* image */}
			<CartItemCardImage item={item} />

			{/* details */}
			<div className="flex flex-1 flex-col gap-2">
				<div className="flex items-start justify-between gap-4">
					<div className="flex flex-col gap-2">
						{/* name */}
						<Large>{item.name}</Large>
						{/* custom pizza - recipe */}
						{item.type === "custom" && (
							<div>
								<Small>Recipe</Small>
								<div className="flex flex-wrap gap-1 text-sm items-center">
									<Muted>{item.dough?.name} Dough</Muted>
									<Separator orientation="vertical" className="h-4" />
									<Muted>{item.sauce?.name} Sauce</Muted>
									<Separator orientation="vertical" className="h-4" />
									<Muted>{item.crust?.name} Crust</Muted>
									<Separator orientation="vertical" className="h-4" />
									<Muted>{item.cook?.name} Cook</Muted>
									<Separator orientation="vertical" className="h-4" />
									<Muted>{item.cheese?.name} cheese</Muted>
								</div>
							</div>
						)}
						{/* custom pizza - toppings list */}
						{item?.type === "custom" &&
							item?.toppings &&
							item?.toppings?.length > 0 && (
								<div>
									<Small>Toppings</Small>
									<div className="flex flex-wrap gap-1">
										{item.toppings?.map((topping) => (
											<div
												key={topping.id}
												className="flex flex-wrap gap-1 items-center"
											>
												<Muted>{topping?.name}</Muted>
												<Separator orientation="vertical" className="h-4" />
											</div>
										))}
									</div>
								</div>
							)}
					</div>

					{/* line total */}
					<span className="text-sm font-semibold whitespace-nowrap">
						${item.lineTotal.toFixed(2)}
					</span>
				</div>
				{/* signature pizza - description */}
				{item.description && item.type === "signature" && (
					<div>
						<Muted>{item.description}</Muted>
					</div>
				)}
				{/* size selctor */}
				<div className="flex flex-wrap items-center gap-3 ">
					{item.size && <CartItemCardSize item={item} />}
				</div>

				{/* QTY selector */}
				<CartItemCardQuantity item={item} />
			</div>

			{/* remove btn */}
			<div
				className="absolute bottom-4 right-4
				opacity-0
				group-hover:opacity-100
				transition-opacity"
			>
				<CartItemCardRemoveBtn item={item} />
			</div>
		</div>
	);
}

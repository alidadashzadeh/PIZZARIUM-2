import Image from "next/image";
import Link from "next/link";

import { Clock } from "lucide-react";
import { Button } from "../ui/button";
import RatingStars from "../ui/RatingStars";
import { Card, CardContent } from "@/components/ui/card";
import { H3, Muted, P, Small } from "../ui/Typography";
import { SignaturePizzaCardProps } from "@/types/siganaturPizzaType";
import { flyToCart } from "@/lib/utils";

import { useCartStore } from "@/store/useCartStore";

export default function SignaturePizzasCard({
	pizza,
}: SignaturePizzaCardProps) {
	const addItem = useCartStore((s) => s.addItem);

	return (
		<>
			<Card>
				<CardContent className="relative flex flex-col gap-2 sm:gap-3 p-3 sm:p-4">
					<div className="relative w-full aspect-square">
						<Image
							src={pizza?.image}
							alt={pizza.name}
							fill
							sizes="(max-width: 500px) 100vw, (max-width: 500px) 50vw, 25vw"
							className="object-cover rounded-md"
							priority={false}
						/>
					</div>
					<H3 className="text-base sm:text-lg line-clamp-1">{pizza.name}</H3>{" "}
					<div className="flex gap-4 items-center">
						<RatingStars rating={pizza?.avg_rating} size={4} />
						<Muted className="text-xs sm:text-sm">
							({pizza?.rating_count} reviews)
						</Muted>
					</div>
					<P className="pr-2 line-clamp-2 text-sm sm:text-base">
						{pizza?.description}
					</P>
					<div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2">
						<Clock className="w-4 h-4 sm:w-5 sm:h-5" />
						<Small className="text-xs sm:text-sm">
							{pizza?.prep_time_minutes} min
						</Small>
					</div>
					<div className="flex justify-between items-center mt-2">
						<div>
							<P className="flex items-center gap-1 text-sm sm:text-base">
								From $
								<span className="text-base sm:text-lg font-medium">
									{pizza?.price?.small}
								</span>
							</P>
						</div>
						<div className="flex gap-2">
							<div>
								<Link
									href={`/signature-pizzas/${pizza.id}/${pizza.slug}`}
									className="flex-1 sm:flex-none"
								>
									<Button
										className="w-full sm:w-auto"
										variant="outline"
										size="sm"
									>
										<Small>Details</Small>
									</Button>
								</Link>
							</div>
							<div>
								<Button
									className="w-full sm:w-auto"
									onClick={(e) => {
										e.preventDefault();
										const added = addItem({
											type: "signature",
											size: "small",
											quantity: 1,
											price: pizza.price,
											id: pizza.id,
											name: pizza.name,
											image: pizza.image,
										});

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
									<Small>Add</Small>
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

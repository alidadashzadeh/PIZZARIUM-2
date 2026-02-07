import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import RatingStars from "../ui/RatingStars";
import { Card, CardContent } from "@/components/ui/card";

import { H3, Muted, P, Small } from "../ui/Typography";
import { SignaturePizza } from "@/types/siganaturPizzaType";
import { useCartStore } from "@/store/useCartStore";
import { flyToCart } from "@/lib/utils";

type SignaturePizzaCardProps = {
	pizza: SignaturePizza;
};

export default function SignaturePizzasCard({
	pizza,
}: SignaturePizzaCardProps) {
	const addItem = useCartStore((s) => s.addItem);

	return (
		<>
			<Card>
				<CardContent className="relative flex flex-col gap-2">
					<Image src={pizza?.image} alt="Pizza" width={240} height={240} />
					<H3>{pizza.name}</H3>
					<div className="flex gap-4 items-center">
						<RatingStars rating={pizza?.avg_rating} size={4} />
						<Muted>({pizza?.rating_count} reviews)</Muted>
					</div>
					<P className="pr-4 line-clamp-1"> {pizza?.description}</P>

					<div className="absolute top-4 right-4 flex items-center gap-2">
						<Clock />
						<Small>{pizza?.prep_time_minutes} min</Small>
					</div>

					<div className="flex justify-between">
						<P className="flex gap-2">
							Starting from
							<span className="text-lg">{pizza?.price?.small} $</span>
						</P>
						<Link href={`/signature-pizzas/${pizza.id}/${pizza.slug}`}>
							<Button className="cursor-pointer" variant="outline" size="sm">
								<Small>Details</Small>
							</Button>
						</Link>
						<Button
							className="cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								const added = addItem({
									...pizza,
									type: "signature",
									size: "small",
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
							<Small>Quick Add</Small>
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}

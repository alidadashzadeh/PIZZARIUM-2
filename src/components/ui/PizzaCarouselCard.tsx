import Image from "next/image";
import RatingStars from "../ui/RatingStars";
import { Button } from "../ui/button";
import Link from "next/link";
import { H4, Muted, P, Small } from "./Typography";
import { Card, CardAction, CardContent } from "./card";

interface SignaturePizzaCardProps {
	pizza: {
		id: string;
		name: string;
		image: string;
		avg_rating: number;
		rating_count: number;
		price: { small: number; medium?: number; large?: number };
		description?: string;
		slug: string;
	};
}

export default function PizzaCarouselCard({ pizza }: SignaturePizzaCardProps) {
	return (
		<Card className="flex flex-col gap-1 items-center m-4">
			<CardContent className="flex flex-col gap-1 items-center ">
				<div className="relative w-48 h-48 rounded-lg overflow-hidden">
					<Image
						src={pizza?.image}
						alt={pizza?.name}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 192px"
						priority
					/>
				</div>

				<H4>{pizza.name}</H4>

				<div className="flex items-center gap-2 mt-1">
					<RatingStars rating={pizza.avg_rating} size={4} />
					<Muted>({pizza.rating_count} Reviews)</Muted>
				</div>

				{pizza.price.small && (
					<Small>Starting from ${pizza.price.small.toFixed(2)} </Small>
				)}

				<div>
					{pizza.description && (
						<P className="line-clamp-1 px-8">{pizza.description}</P>
					)}
				</div>
			</CardContent>

			<CardAction className="mx-auto">
				<Link href={`/signature-pizzas/${pizza?.id}/${pizza?.slug}`}>
					<Button variant="outline" size="sm" className="mt-auto">
						View Details
					</Button>
				</Link>
			</CardAction>
		</Card>
	);
}

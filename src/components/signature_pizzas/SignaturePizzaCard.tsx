import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import RatingStars from "../ui/RatingStars";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { H3, Muted, P, Small } from "../ui/Typography";

type SignaturePizzaCardProps = {
	pizza: Pizza;
};

export default function SignaturePizzasCard({
	pizza,
}: SignaturePizzaCardProps) {
	return (
		<>
			{/* <div className="flex flex-col gap-2 relative justify-center items-center rounded-xl pb-4 border-2 hover:border-primary">
				<Image src={pizza?.image} alt="Pizza" width={240} height={240} />
				<H3>{pizza.name}</H3>
				<div className="flex gap-4 items-center">
					<RatingStars rating={pizza?.avg_rating} size={4} />
					<Muted>({pizza?.rating_count} reviews)</Muted>
				</div>
				<P className="px-4 line-clamp-1"> {pizza?.description}</P>
				<P className="flex gap-2">
					Starting from{" "}
					<span className="text-lg">{pizza?.prices?.small} $</span>
				</P>
				<div className="flex items-center gap-16">
					<div className="flex items-center gap-2">
						<Clock />
						<Small>{pizza?.prep_time_minutes} min</Small>
					</div>

					<Link href={`/signature-pizzas/${pizza.id}`}>
						<Button className="cursor-pointer" variant="default" size="sm">
							<Small>Customize</Small>
						</Button>
					</Link>
					<Button
						className="cursor-pointer"
						onClick={(e) => {
							e.preventDefault();

							// add to cart logic here
							console.log("clicked");
						}}
						variant="default"
						size="sm"
					>
						<Small>Quick Add</Small>
					</Button>
				</div>
			</div> */}
			<Card>
				{/* <CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card Description</CardDescription>
					<CardAction>Card Action</CardAction>
				</CardHeader> */}
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
							<span className="text-lg">{pizza?.prices?.small} $</span>
						</P>
						<Link href={`/signature-pizzas/${pizza.id}`}>
							<Button className="cursor-pointer" variant="outline" size="sm">
								<Small>Customize</Small>
							</Button>
						</Link>
						<Button
							className="cursor-pointer"
							onClick={(e) => {
								e.preventDefault();

								// add to cart logic here
								console.log("clicked");
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

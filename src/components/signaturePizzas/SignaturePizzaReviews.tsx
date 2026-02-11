"use client";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useGetReviews } from "@/hooks/reviews/useGetReviews";
import SignaturePizzaReviewCard from "./SignaturePizzaReviewCard";

export function SignaturePizzaReviews({ pizzaId }: { pizzaId: string }) {
	const { data: reviews } = useGetReviews(pizzaId);
	const firstTwo = reviews?.slice(0, 2) || [];
	const theRest = reviews?.slice(2) || [];

	return (
		<div className="space-y-4">
			{firstTwo?.map((review) => (
				<SignaturePizzaReviewCard key={review.id} {...review} />
			))}

			{theRest?.length > 0 && (
				<Collapsible>
					<CollapsibleContent className="space-y-4">
						{theRest?.map((review) => (
							<SignaturePizzaReviewCard key={review.id} {...review} />
						))}
					</CollapsibleContent>

					<CollapsibleTrigger asChild>
						<Button variant="ghost" className="w-full mt-2">
							View {theRest?.length} more reviews
						</Button>
					</CollapsibleTrigger>
				</Collapsible>
			)}
		</div>
	);
}

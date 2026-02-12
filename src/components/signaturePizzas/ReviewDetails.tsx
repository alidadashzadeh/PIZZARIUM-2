import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RatingStars from "../ui/RatingStars";
import { Muted, Small } from "../ui/Typography";
import { signaturePizzaReviewType } from "@/types/siganaturPizzaType";
type ReviewDetailsProps = {
	reviews: signaturePizzaReviewType[];
};
export default function ReviewDetails({ reviews }: ReviewDetailsProps) {
	return (
		<div className="flex flex-col gap-4">
			{reviews?.map((review: signaturePizzaReviewType) => {
				return (
					<div key={review?.id}>
						<div className="flex gap-2 items-center">
							<Avatar>
								<AvatarImage
									src={review?.user?.avatar}
									className="h-8 w-8 object-cover object-center rounded-full"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<div className="flex gap-8 w-full items-center">
								<Small>{review?.user?.username}</Small>
								<RatingStars rating={review?.rating} size={4} />
							</div>
						</div>
						<Muted>
							{new Date(review.created_at).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</Muted>

						<Small>{review.text}</Small>
					</div>
				);
			})}
		</div>
	);
}

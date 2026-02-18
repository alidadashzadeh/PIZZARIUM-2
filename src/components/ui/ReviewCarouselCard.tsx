import { ReviewProps } from "@/types/review";
import RatingStars from "./RatingStars";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { UserIcon } from "lucide-react";
import { Muted } from "./Typography";
import { Card } from "./card";

export default function ReviewCarouselCard({
	review,
}: {
	review: ReviewProps;
}) {
	return (
		<Card className="  rounded-lg p-4 flex flex-col gap-1 items-center m-4 max-w-xs">
			<div className="flex justify-between items-center w-full gap-4">
				<div className="flex items-center gap-4">
					<Avatar className="w-8 h-8">
						{review?.profiles?.avatar ? (
							<AvatarImage
								src={review?.profiles?.avatar}
								alt={review?.profiles?.avatar || "User Avatar"}
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<AvatarFallback>
								<UserIcon className="w-4 h-4 text-gray-400" />
							</AvatarFallback>
						)}
					</Avatar>
					<h3 className="font-bold">{review?.profiles?.username}</h3>
				</div>
				<Muted>{new Date(review.created_at).toLocaleDateString()}</Muted>
			</div>
			<p className="text-sm">{review.text}</p>
			<RatingStars rating={review.rating} size={4} />
		</Card>
	);
}

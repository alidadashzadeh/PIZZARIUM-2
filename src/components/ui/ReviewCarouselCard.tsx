import { ReviewProps } from "@/types/review";
import RatingStars from "./RatingStars";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { UserIcon } from "lucide-react";
import { Muted } from "./Typography";

export default function reviewCarouselCard({
	review,
}: {
	review: ReviewProps;
}) {
	return (
		<div className="  rounded-lg shadow-md bg-background p-4 flex flex-col gap-1 items-center m-4">
			<div className="flex justify-between items-center w-full">
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
		</div>
	);
}

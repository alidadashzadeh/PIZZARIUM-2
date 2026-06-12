import ReviewsMotionStack from "./ReviewsMotionStack";
import { H3 } from "../ui/Typography";
import { ReviewProps } from "@/types/review";

export default function Reviews({ reviews }: { reviews: ReviewProps[] }) {
	return (
		<div className="mt-32 py-32 flex flex-col items-center  bg-primary/5 relative overflow-hidden rounded-xl">
			<H3 className="text-center">
				What our happy customer&apos;s say about us
			</H3>
			<div className="absolute text-[320px] -bottom-2/7 font-extrabold">
				SATISFIED
			</div>
			<ReviewsMotionStack reviews={reviews} />
		</div>
	);
}

"use client";

import { ReviewProps } from "@/types/review";
import { motion } from "framer-motion";
import { useState } from "react";
import ReviewCarouselCard from "../ui/ReviewCarouselCard";

export default function ReviewsMotionStack({
	reviews,
}: {
	reviews: ReviewProps[];
}) {
	const extendedReviews = [...reviews, ...reviews];
	const cycleLength = reviews.length;

	const [active, setActive] = useState(0);

	const handleCardClick = (clickedIndex: number) => {
		const diff = clickedIndex - active;

		let steps = diff % cycleLength;
		if (steps > cycleLength / 2) steps -= cycleLength;
		if (steps < -cycleLength / 2) steps += cycleLength;

		setActive((prev) => prev + steps);
	};

	return (
		<div className="relative flex justify-center items-center h-[420px] w-full overflow-hidden">
			{extendedReviews.map((review, index) => {
				const rawOffset = (index - active) % cycleLength;
				const offset =
					rawOffset > cycleLength / 2
						? rawOffset - cycleLength
						: rawOffset > -cycleLength / 2
							? rawOffset
							: rawOffset + cycleLength;

				if (Math.abs(offset) > 3) return null;

				return (
					<motion.div
						key={index}
						onClick={() => handleCardClick(index)}
						animate={{
							x: offset * 280,
							scale: offset === 0 ? 1.12 : 0.88 - Math.abs(offset) * 0.06,
							rotateY: offset * 12,
							rotateZ: offset * 3,
							opacity: 1 - Math.abs(offset) * 0.22,
							zIndex: 10 - Math.abs(offset) * 2,
						}}
						transition={{
							type: "spring",
							stiffness: 180,
							damping: 22,
							mass: 1.1,
						}}
						initial={{ opacity: 0, scale: 0.7, y: 60 }}
						className={`
              absolute cursor-pointer will-change-transform
              ${offset === 0 ? "shadow-2xl" : "shadow-xl"}
            `}
					>
						<ReviewCarouselCard review={review} />
					</motion.div>
				);
			})}
		</div>
	);
}

import { Star } from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./badge";
import { Small } from "./Typography";

export default function RatingStars({
	rating,
	size,
}: {
	rating: number;
	size: number;
}) {
	const whole = Math.floor(rating);
	const percent = Math.round((rating - whole) * 100);
	const greyStars = percent === 0 ? 5 - whole : 5 - whole - 1;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<div className="cursor-pointer flex gap-2 items-center">
					{Array.from({ length: whole }).map((_, i) => (
						<Star
							key={i}
							className={`fill-primary stroke-primary drop-shadow-sm h-${size} w-${size}`}
						/>
					))}
					{percent != 0 && (
						<div
							className={`relative inline-block  `}
							style={{ width: size * 4, height: size * 4 }}
						>
							<Star
								style={{ width: size * 4, height: size * 4 }}
								className={`absolute top-0 left-0 stroke-primary fill-none`}
							/>
							<div
								className={`absolute top-0 left-0 h-${size} w-${size} overflow-hidden`}
								style={{ width: `${percent}%` }}
							>
								<Star
									className={`h-${size} w-${size} fill-primary stroke-primary`}
								/>
							</div>
						</div>
					)}
					{Array.from({ length: greyStars }).map((_, i) => (
						<Star
							key={i}
							className={`stroke-primary drop-shadow-sm h-${size} w-${size}`}
						/>
					))}
				</div>
			</TooltipTrigger>
			<TooltipContent side="bottom" align="start">
				<Badge variant="default">
					<Small> {rating?.toFixed(2)}</Small>
				</Badge>
			</TooltipContent>
		</Tooltip>
	);
}

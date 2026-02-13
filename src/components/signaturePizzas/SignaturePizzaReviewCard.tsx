"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

import { ReviewProps } from "@/types/review";

export default function SignaturePizzaReviewCard({
	text,
	rating,
	created_at,
	profiles: { avatar, username },
}: ReviewProps) {
	return (
		<Card className="bg-muted/30 border-none ">
			<CardHeader className="p-2 ">
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8 border">
							<AvatarImage
								src={avatar}
								alt={username}
								className="w-full h-full object-cover rounded-full"
							/>
							<AvatarFallback className="text-[10px]">
								{username.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col">
							<span className="font-semibold text-sm leading-none">
								{username}
							</span>
							<time className="text-[10px] text-muted-foreground mt-1">
								{new Date(created_at).toLocaleDateString(undefined, {
									month: "short",
									day: "numeric",
									year: "numeric",
								})}
							</time>
						</div>
					</div>

					<div className="flex gap-0.5 text-yellow-500">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								size={12}
								fill={i < rating ? "currentColor" : "none"}
								className={i >= rating ? "text-muted" : ""}
							/>
						))}
					</div>
				</div>
			</CardHeader>

			<CardContent className="px-4">
				<p className="text-sm text-muted-foreground italic leading-relaxed">
					{text}
				</p>
			</CardContent>
		</Card>
	);
}

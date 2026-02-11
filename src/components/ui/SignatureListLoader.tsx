"use client";

import CardLoader from "./CardLoader";
import { Skeleton } from "./skeleton";

export default function SignatureListLoader() {
	const list = Array.from({ length: 20 });

	return (
		<div className="flex flex-col gap-2">
			<div className="flex w-full max-w-sm flex-col gap-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
			</div>
			<div className="w-full grid grid-cols-4 gap-8 mx-auto">
				{list.map((_, index) => (
					<CardLoader key={index} />
				))}
			</div>
		</div>
	);
}

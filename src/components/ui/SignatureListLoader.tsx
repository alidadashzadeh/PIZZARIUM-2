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
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mx-auto w-full">
				{list.map((_, index) => (
					<CardLoader key={index} />
				))}
			</div>
		</div>
	);
}

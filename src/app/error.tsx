"use client";

import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div style={{ padding: 40 }}>
			<h1>Something broke</h1>
			<p>{error.message}</p>
			<Button
				variant="default"
				className="cursor-pointer"
				onClick={() => reset()}
			>
				Try again
			</Button>
		</div>
	);
}

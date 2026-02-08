"use client";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div style={{ padding: 40 }}>
			<h1>Something broke 😵</h1>
			<p>{error.message}</p>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function LoadingSignaturePizzaCard() {
	return (
		<div className="w-full max-w-xs rounded-xl border border-border bg-card p-4 shadow-sm">
			{/* Image placeholder */}
			<div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted animate-pulse" />

			{/* Title placeholder */}
			<div className="mt-4 h-5 w-3/4 rounded bg-muted animate-pulse" />

			{/* Description placeholder */}
			<div className="mt-2 h-3 w-full rounded bg-muted animate-pulse" />
			<div className="mt-1 h-3 w-5/6 rounded bg-muted animate-pulse" />

			{/* Price placeholder */}
			<div className="mt-4 h-4 w-16 rounded bg-muted animate-pulse" />

			{/* Button placeholder */}
			<div className="mt-4 h-9 w-full rounded-md bg-muted animate-pulse" />
		</div>
	);
}

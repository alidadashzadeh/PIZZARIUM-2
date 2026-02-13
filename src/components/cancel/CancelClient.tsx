"use client";

import Link from "next/link";

import { Card, CardContent } from "../ui/card";
import { Large, P } from "../ui/Typography";

import { useAuthStore } from "@/store/useAuthStore";

export default function CancelClient() {
	const user = useAuthStore((s) => s.user);

	if (!user) {
		return (
			<div className="flex justify-center py-20 text-red-500">
				Error: You must be logged in to view this page.
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center  p-4">
			{/* Red banner */}
			<Card className="p-4">
				<div className="w-full max-w-md  border bg-red-500 px-4 py-3 rounded-md mb-6 text-center">
					<Large className="font-bold">Payment Cancelled </Large>
					<P className="mt-1">Your payment was not completed.</P>
				</div>

				{/* Additional information */}
				<CardContent className="w-full max-w-md rounded-md p-6 text-start">
					<Large className="text-lg font-semibold mb-2">
						What you can do next
					</Large>
					<ul className="text-gray-700 list-disc list-inside mb-4">
						<li>Check your payment details and try again.</li>
						<li>Contact support if the issue persists.</li>
						<li>Make sure your payment method is valid.</li>
					</ul>
					<div className="text-center">
						<Link
							href="/checkout"
							className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
						>
							Retry Payment
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

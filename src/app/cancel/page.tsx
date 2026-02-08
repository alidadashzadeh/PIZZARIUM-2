import { Card, CardContent } from "@/components/ui/card";
import { Large, P } from "@/components/ui/Typography";
import Link from "next/link";

export default function CancelPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center  p-4">
			{/* Red banner */}
			<Card className="p-4">
				<div className="w-full max-w-md  border bg-red-500 px-4 py-3 rounded-md mb-6 text-center">
					<Large className="font-bold">Payment Cancelled ❌</Large>
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

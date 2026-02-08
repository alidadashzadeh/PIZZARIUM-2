"use client";

import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderBySession } from "@/hooks/orders/useOrderBySession";
import ItemsSummaryList from "@/components/ui/ItemsSummaryList";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Muted } from "@/components/ui/Typography";
import Image from "next/image";

export default function SuccessPage() {
	const searchParams = useSearchParams();
	const sessionId = searchParams.get("session_id");

	const user = useAuthStore((s) => s.user);

	const {
		data: order,
		isLoading,
		error,
	} = useOrderBySession(sessionId, user?.id);

	if (!user)
		return (
			<div className="flex justify-center py-20 text-red-500">
				Error: You must be logged in to view this page.
			</div>
		);
	if (isLoading || !order)
		return (
			<div className="flex justify-center py-20 text-muted-foreground">
				Loading your order...
			</div>
		);

	if (error)
		return (
			<div className="flex justify-center py-20 text-red-500">
				Error: {error.message}
			</div>
		);

	return (
		<div className="mx-auto max-w-2xl">
			<Card className="rounded-2xl shadow-lg">
				{/* Header */}
				<CardHeader className="space-y-2 text-center">
					<CardTitle className="text-3xl font-bold bg-green-500 p-4">
						Payment Successful!
					</CardTitle>

					<Muted className="text-muted-foreground">
						Thank you for your order. Your payment has been confirmed.
					</Muted>

					<Badge variant="secondary" className="mx-auto">
						Order ID: {order?.id}
					</Badge>
				</CardHeader>

				<CardContent className="space-y-8">
					{/* Items */}
					<div>
						<h2 className="text-lg font-semibold mb-3">Order Items</h2>

						<ItemsSummaryList items={order?.items} />
					</div>

					<Separator />

					<div className="space-y-4">
						{/* Total + Status */}
						<div className="flex items-center justify-between">
							<p className="text-lg font-semibold">Total</p>
							<p className="text-lg font-bold">${order?.total}</p>
						</div>

						<div className="flex items-center justify-between">
							<p className="font-medium">Status</p>
							<Badge variant="outline" className="p-2">
								{order?.status}
							</Badge>
						</div>
						{order?.card_last4 && (
							<div className="flex items-center justify-between">
								<p className="font-medium">Payment Method</p>

								<div className="flex items-center gap-2">
									{/* Card Logo */}
									<Image
										src={
											order?.card_brand === "visa"
												? "/cards/visa_logo.png"
												: "/cards/mastercard_logo.png"
										}
										alt={order?.card_brand || "Card"}
										width={60}
										height={36}
									/>

									{/* Card Brand + Last4 */}
									<span className="text-sm font-semibold capitalize">
										{order?.card_brand} •••• •••• •••• {order?.card_last4}
									</span>
								</div>
							</div>
						)}
					</div>

					<Separator />

					{/* Delivery Info */}
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Delivery Details</h2>

						<div className="grid gap-3 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">Customer</span>
								<span className="font-medium">{order?.customer_name}</span>
							</div>

							<div className="flex justify-between">
								<span className="text-muted-foreground">Phone</span>
								<span className="font-medium">{order?.delivery_phone}</span>
							</div>

							<div className="flex justify-between">
								<span className="text-muted-foreground">Address</span>
								<span className="font-medium text-right max-w-[60%]">
									{order?.delivery_address}
								</span>
							</div>
						</div>
					</div>

					<Separator />

					{/* Footer */}
					<p className="text-center text-sm text-muted-foreground">
						You will receive an email confirmation shortly.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

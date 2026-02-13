"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/CartType";
import { Spinner } from "../ui/spinner";

import { useGetOrder } from "@/hooks/orders/useGetOrder";

export default function OrderDialog({
	orderId,
	open,
	setOpen,
}: {
	orderId: string | null;
	open: boolean;
	setOpen: (v: boolean) => void;
}) {
	const { data: order, isLoading, error } = useGetOrder(orderId || undefined);
	const sortedItems = order?.items;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-lg rounded-2xl">
				<DialogHeader>
					<DialogTitle>Order Details</DialogTitle>
				</DialogHeader>

				{isLoading && (
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Spinner className="size-6" />
						<div>Loading order details...</div>
					</div>
				)}

				{error && <p className="text-sm text-red-500">Failed to load order.</p>}

				{order && (
					<div className="space-y-4">
						{/* Order Info */}
						<div className="flex justify-between items-center">
							<p className="font-medium">Order #{order?.id.slice(0, 8)}</p>

							<Badge className="p-1">{order?.status}</Badge>
						</div>

						<p className="text-sm text-muted-foreground">
							Paid with {order?.card_brand} •••• {order?.card_last4}
						</p>

						<Separator />

						{/* Items */}
						<div>
							<h3 className="font-semibold mb-2">Items</h3>

							<ul className="space-y-2 text-sm">
								{sortedItems?.map((item: CartItem, idx: number) => (
									<li key={idx} className="flex justify-between">
										<span>
											{item.name} × {item.quantity}
										</span>
										<span>
											$
											{
												typeof item.price === "number"
													? item.price.toFixed(2) // drink
													: item.size && item.price[item.size] // pizza
														? Number(item.price[item.size]).toFixed(2)
														: "0.00" // fallback
											}
										</span>
									</li>
								))}
							</ul>
						</div>

						<Separator />

						{/* Delivery */}
						<div className="text-sm space-y-1">
							<h3 className="font-semibold">Delivery</h3>
							<p>{order?.customer_name}</p>
							<p>{order?.delivery_address}</p>
							<p>{order?.delivery_phone}</p>
						</div>

						<Separator />

						{/* Total */}
						<p className="font-bold text-right">Total: ${order?.total}</p>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

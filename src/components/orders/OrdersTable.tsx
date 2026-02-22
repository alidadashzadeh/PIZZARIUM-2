"use client";

import { useState } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderDialog from "./OrderTableDetails";
import { Spinner } from "../ui/spinner";
import { Large } from "../ui/Typography";

import { useOrders } from "@/hooks/orders/useOrders";
import { useAuthStore } from "@/store/useAuthStore";

export default function OrdersTable() {
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const user = useAuthStore((s) => s.user);

	const { data: orders, isLoading, error } = useOrders(user?.id);

	if (!user) {
		return (
			<div className="text-center py-20 text-muted-foreground">
				Please log in to view your orders.
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center  py-20">
				<Spinner className="size-8" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-20 text-red-500">
				Failed to load orders.
			</div>
		);
	}

	if (!orders || orders.length === 0) {
		return (
			<div className="text-center py-20 text-muted-foreground">
				You have no orders yet.
			</div>
		);
	}
	return (
		<div>
			<Large className="pb-4">Orders History</Large>

			<div className="rounded-2xl border shadow-sm overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Payment</TableHead>
							<TableHead className="text-right"></TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{orders?.map((order) => (
							<TableRow key={order.id}>
								<TableCell className="font-medium">
									#{order.id.slice(0, 8)}
								</TableCell>

								<TableCell>
									{new Date(order.created_at).toLocaleDateString()}
								</TableCell>

								<TableCell>${order.total}</TableCell>

								<TableCell>
									<Badge>{order.status}</Badge>
								</TableCell>

								<TableCell className="capitalize text-sm">
									{order.card_brand
										? `${order.card_brand} •••• ${order.card_last4}`
										: "—"}
								</TableCell>

								<TableCell className="text-right">
									<Button
										size="sm"
										variant="outline"
										onClick={() => {
											setSelectedOrderId(order.id);
											setOpen(true);
										}}
									>
										View
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{selectedOrderId && (
				<OrderDialog orderId={selectedOrderId} open={open} setOpen={setOpen} />
			)}
		</div>
	);
}

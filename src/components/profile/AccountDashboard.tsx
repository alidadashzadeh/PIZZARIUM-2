"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import ProfileSettings from "./ProfileSettings";
import OrdersTable from "../orders/OrdersTable";
import { signOut } from "@/lib/queries/auth";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function AccountDashboard() {
	return (
		<div className="max-w-6xl mx-auto">
			<Tabs defaultValue="profile" className="flex gap-6 min-h-[650px]">
				{/* ✅ Sidebar Card */}
				<Card className="w-64 rounded-2xl shadow-sm flex flex-col ">
					<CardHeader>
						<CardTitle className="text-lg">My Account</CardTitle>
					</CardHeader>

					<CardContent className="flex flex-col flex-1 ">
						{/* Tab Navigation */}
						<TabsList className="flex flex-col space-y-2 bg-transparent p-0 h-[650px] justify-start">
							<TabsTrigger value="profile" className="justify-start w-full">
								Profile Info
							</TabsTrigger>

							<TabsTrigger value="orders" className="justify-start w-full">
								Orders
							</TabsTrigger>
						</TabsList>

						{/* Logout Button Bottom */}

						<Button
							variant="destructive"
							className="w-full"
							onClick={async () => {
								await signOut();
								toast("Signed out successfully!");
							}}
						>
							<LogOut className="w-4 h-4" />
							Logout
						</Button>
					</CardContent>
				</Card>

				{/* ✅ Content Card */}
				<Card className="flex-1 rounded-2xl shadow-sm min-h-[650px]">
					<CardContent className="p-6">
						{/* Profile Tab */}
						<TabsContent value="profile" className="m-0">
							<ProfileSettings />
						</TabsContent>

						{/* Orders Tab */}
						<TabsContent value="orders" className="m-0">
							<OrdersTable />
						</TabsContent>
					</CardContent>
				</Card>
			</Tabs>
		</div>
	);
}

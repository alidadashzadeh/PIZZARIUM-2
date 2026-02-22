// "use client";

// import { LogOut } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import ProfileSettings from "./ProfileSettings";
// import OrdersTable from "../orders/OrdersTable";

// import { useSignOut } from "@/hooks/auth/useSignOut";

// export default function AccountDashboard() {
// 	const { mutate: signOut } = useSignOut();
// 	return (
// 		<div className="max-w-6xl mx-auto">
// 			<Tabs defaultValue="profile" className="flex gap-6 min-h-[650px]">
// 				{/* Sidebar Card */}
// 				<Card className="w-64 rounded-2xl shadow-sm flex flex-col ">
// 					<CardHeader>
// 						<CardTitle className="text-lg">My Account</CardTitle>
// 					</CardHeader>

// 					<CardContent className="flex flex-col flex-1 ">
// 						<TabsList className="flex flex-col space-y-2 bg-transparent p-0 h-[650px] justify-start">
// 							<TabsTrigger value="profile" className="justify-start w-full">
// 								Profile Info
// 							</TabsTrigger>

// 							<TabsTrigger value="orders" className="justify-start w-full">
// 								Orders
// 							</TabsTrigger>
// 						</TabsList>

// 						{/* Logout Button Bottom */}
// 						<Button
// 							variant="destructive"
// 							className="w-full"
// 							onClick={() => {
// 								signOut();
// 							}}
// 						>
// 							<LogOut className="w-4 h-4" />
// 							Logout
// 						</Button>
// 					</CardContent>
// 				</Card>

// 				{/* Content Card */}
// 				<Card className="flex-1 rounded-2xl shadow-sm min-h-[650px] ">
// 					<CardContent className="p-6">
// 						{/* Profile Tab */}
// 						<TabsContent value="profile" className="m-0">
// 							<ProfileSettings />
// 						</TabsContent>

// 						{/* Orders Tab */}
// 						<TabsContent value="orders" className="m-0">
// 							<OrdersTable />
// 						</TabsContent>
// 					</CardContent>
// 				</Card>
// 			</Tabs>
// 		</div>
// 	);
// }

"use client";

import { LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProfileSettings from "./ProfileSettings";
import OrdersTable from "../orders/OrdersTable";

import { useSignOut } from "@/hooks/auth/useSignOut";

export default function AccountDashboard() {
	const { mutate: signOut } = useSignOut();

	return (
		<div className="max-w-6xl mx-auto px-3 sm:px-4">
			<Tabs
				defaultValue="profile"
				className="flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-[650px]"
			>
				{/* Sidebar */}
				<Card className="w-full lg:w-64 rounded-2xl shadow-sm flex flex-col">
					<CardHeader className="pb-2">
						<CardTitle className="text-lg text-center lg:text-left">
							My Account
						</CardTitle>
					</CardHeader>

					<CardContent className="flex flex-col flex-1 gap-4">
						<TabsList className="flex flex-row lg:flex-col items-start bg-transparent p-0 h-auto gap-2">
							<TabsTrigger
								value="profile"
								className="flex-1 lg:flex-none justify-center lg:justify-start"
							>
								Profile Info
							</TabsTrigger>

							<TabsTrigger
								value="orders"
								className="flex-1 lg:flex-none justify-center lg:justify-start"
							>
								Orders
							</TabsTrigger>
						</TabsList>

						<Button
							variant="destructive"
							className="w-full mt-auto"
							onClick={() => signOut()}
						>
							<LogOut className="w-4 h-4 mr-2" />
							Logout
						</Button>
					</CardContent>
				</Card>

				{/* Main Content */}
				<Card className="flex-1 rounded-2xl shadow-sm min-h-[500px]">
					<CardContent className="p-4 sm:p-6">
						<TabsContent value="profile" className="m-0">
							<ProfileSettings />
						</TabsContent>

						<TabsContent value="orders" className="m-0">
							<OrdersTable />
						</TabsContent>
					</CardContent>
				</Card>
			</Tabs>
		</div>
	);
}

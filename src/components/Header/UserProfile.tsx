"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import { Small } from "../ui/Typography";
import AuthModal from "../ui/AuthModal";

function UserProfile() {
	const [authOpen, setAuthOpen] = useState(false);

	return (
		<div className="flex gap-4">
			{true && (
				<>
					<Button onClick={() => setAuthOpen(true)}>Sign In / Sign Up</Button>
					<AuthModal open={authOpen} onOpenChange={setAuthOpen} />
				</>
			)}

			{!true && (
				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center gap-2">
						<Avatar className="w-8 h-8">
							{/* <AvatarImage src={user.user_metadata?.avatar_url} /> */}
							<AvatarFallback>
								{/* {user.email?.charAt(0).toUpperCase()} */}
								avatar fallback
							</AvatarFallback>
						</Avatar>
						<Small>username</Small>
					</DropdownMenuTrigger>

					<DropdownMenuContent className="w-48 mt-2">
						<DropdownMenuItem asChild>
							<a href="/profile" className="flex items-center gap-2">
								<UserIcon className="w-4 h-4" />
								Profile
							</a>
						</DropdownMenuItem>

						<DropdownMenuItem className="flex items-center gap-2 text-red-600">
							<LogOut className="w-4 h-4" />
							Sign Out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}

export default UserProfile;

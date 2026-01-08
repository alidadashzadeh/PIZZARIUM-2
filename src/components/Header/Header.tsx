import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import UserProfile from "./UserProfile";
import { Switch as DarkModeSwitch } from "@/components/ui/DarkModeSwitch";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
	return (
		<div className="flex justify-between items-center h-12 ">
			<Logo />
			<Nav />
			<div className="flex gap-4">
				<UserProfile />
				<Button
					variant="outline"
					size="icon"
					aria-label="Toggle theme"
					className="cursor-pointer"
				>
					<ShoppingCart className="h-6 w-6 cursor-pointer" />
				</Button>
				<DarkModeSwitch className="h-6 w-6 cursor-pointer" />
			</div>
		</div>
	);
};

export default Header;

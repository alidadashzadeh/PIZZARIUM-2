import Logo from "./Logo";
import Nav from "./Nav";
import CartSheet from "../cart/CartSheet";
import { Switch as DarkModeSwitch } from "@/components/ui/DarkModeSwitch";

import UserProfile from "./UserProfile";

const Header = () => {
	return (
		<div className="flex justify-between items-center h-12 ">
			<Logo />
			<Nav />
			<div className="flex gap-4">
				<UserProfile />
				<CartSheet />
				<DarkModeSwitch />
			</div>
		</div>
	);
};

export default Header;

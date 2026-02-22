import Logo from "./Logo";
import Nav from "./Nav";
import CartSheet from "../cart/CartSheet";
import { Switch as DarkModeSwitch } from "@/components/ui/DarkModeSwitch";

import UserProfile from "./UserProfile";
import MobileNav from "./MobileNav";

const Header = () => {
	return (
		<header className="flex items-center justify-between h-12 px-2 sm:px-4 mx-auto max-w-full lg:max-w-screen-xl 2xl:max-w-[1440px]">
			<div className="flex-shrink-0">
				<Logo />
			</div>
			<div className="hidden md:flex flex-1 justify-center">
				<Nav />
			</div>
			<div className="flex items-center gap-2 sm:gap-3 md:gap-4">
				<UserProfile />
				<CartSheet />
				<DarkModeSwitch />
				<MobileNav />
			</div>
		</header>
	);
};

export default Header;

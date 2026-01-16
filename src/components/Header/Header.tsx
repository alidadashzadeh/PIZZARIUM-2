import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import UserProfile from "./UserProfile";
import { Switch as DarkModeSwitch } from "@/components/ui/DarkModeSwitch";
import CartSheet from "./CartSheet";

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

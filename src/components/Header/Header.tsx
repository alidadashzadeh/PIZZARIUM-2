import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-12 ">
      <Logo />
      <Nav />
      <UserProfile />
    </div>
  );
};

export default Header;

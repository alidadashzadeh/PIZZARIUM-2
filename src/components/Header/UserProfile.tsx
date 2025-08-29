"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch as DarkModeSwitch } from "@/components/ui/DarkModeSwitch";

import { LogOut, ShoppingCart, User as UserIcon } from "lucide-react";
import { Small } from "../ui/Typography";

function UserProfile() {
  return (
    <div className="flex gap-4">
      {!true && (
        <Button asChild>
          <a href="/login">Sign In / Sign Up</a>
        </Button>
      )}
      {true && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <Small>Username</Small>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 mt-2">
            <DropdownMenuItem asChild>
              <a href="/profile" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Profile
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem
              //   onClick={/* handle logout here */}
              className="flex items-center gap-2 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
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
  );
}

export default UserProfile;

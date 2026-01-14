"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { useAuthStore } from "@/store/useAuthStore";
import { signOut } from "@/lib/queries/auth";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

function UserProfile() {
  const [authOpen, setAuthOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  console.log(user);

  return (
    <div className="flex gap-4">
      <div className="fixed inset-x-0 top-20 z-[9999]">
        <Toaster
          position="top-right"
          closeButton
          toastOptions={{
            duration: 4000,
            style: { fontSize: "14px" },
          }}
        />
      </div>

      {!user && (
        <>
          <Button onClick={() => setAuthOpen(true)}>Sign In / Sign Up</Button>
          <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
        </>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              {user?.avatar ? (
                <AvatarImage
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback>
                  <UserIcon className="w-4 h-4 text-gray-400" />
                </AvatarFallback>
              )}
            </Avatar>
            <Small className="pr-2 line-clamp-1 max-w-[6ch]">
              {user?.username || user?.email?.split("@")[0]}
            </Small>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mt-2">
            <DropdownMenuItem asChild>
              <a href="/profile" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Profile
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                signOut();
                toast("Signed out Successfully!");
              }}
              className="flex items-center gap-2 text-red-600"
            >
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

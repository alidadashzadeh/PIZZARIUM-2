"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
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
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import Link from "next/link";
import { useProfile } from "@/hooks/profile/useProfile";

function UserProfile() {
  const [authOpen, setAuthOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const { data: profile } = useProfile();

  return (
    <div className="flex gap-4">
      <div className="fixed inset-x-0 z-[9999]">
        <Toaster
          position="top-center"
          closeButton
          richColors
          toastOptions={{
            duration: 2000,
            style: { fontSize: "14px", marginTop: "60px" },
          }}
        />
      </div>

      {/* 🔑 AUTH STATE CONTROLS UI */}
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
              {profile?.avatar ? (
                <AvatarImage
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <AvatarFallback>
                  <UserIcon className="w-4 h-4 text-gray-400" />
                </AvatarFallback>
              )}
            </Avatar>

            <Small className="pr-2 line-clamp-1 max-w-[6ch]">
              {profile?.username ?? user.email?.split("@")[0]}
            </Small>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mt-2">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                toast("Signed out successfully!");
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

"use client";

import { useState } from "react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { User as UserIcon } from "lucide-react";
import { Small } from "../ui/Typography";
import AuthModal from "../ui/AuthModal";
import { Toaster } from "../ui/sonner";
import ProfileLoader from "../ui/ProfileLoader";

import { useProfile } from "@/hooks/profile/useProfile";
import { useClientMounted } from "@/hooks/profile/useClientMounted";
import { useAuthStore } from "@/store/useAuthStore";
import { useAvatarLoaded } from "@/hooks/profile/useAvatarLoaded";

function UserProfile() {
	const [authOpen, setAuthOpen] = useState(false);
	const mounted = useClientMounted();
	const user = useAuthStore((s) => s.user);
	const { data: profile, isLoading } = useProfile();
	const avatarLoaded = useAvatarLoaded(profile?.avatar ?? undefined);

	return (
		<div className="flex gap-4 w-[150px] justify-end">
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
			{/* before hydration */}
			{!mounted || isLoading || !avatarLoaded ? <ProfileLoader /> : <div></div>}

			{/* after hydration if no user is logged in */}
			{mounted && !isLoading && !profile && (
				<>
					<Button onClick={() => setAuthOpen(true)}>Sign In / Sign Up</Button>
					<AuthModal open={authOpen} onOpenChange={setAuthOpen} />
				</>
			)}

			{/* after hydration when user is logged in */}
			{mounted && profile && avatarLoaded && (
				<Link href="/profile" className="flex items-center gap-2">
					<Avatar className="w-8 h-8">
						{profile?.avatar ? (
							<AvatarImage
								src={profile.avatar}
								alt={profile?.username || "User Avatar"}
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<AvatarFallback>
								<UserIcon className="w-4 h-4 text-gray-400" />
							</AvatarFallback>
						)}
					</Avatar>

					<Small className="line-clamp-1 max-w-[6ch]  py-2">
						{profile?.username ?? user?.email?.split("@")[0]}
					</Small>
				</Link>
			)}
		</div>
	);
}

export default UserProfile;

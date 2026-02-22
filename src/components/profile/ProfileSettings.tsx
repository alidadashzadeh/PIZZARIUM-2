"use client";

import { useState } from "react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Large, Muted, P } from "@/components/ui/Typography";

import { useAuthStore } from "@/store/useAuthStore";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { useProfile } from "@/hooks/profile/useProfile";
import { useUpdateAvatar } from "@/hooks/profile/useUpdateAvatar";

export default function ProfileSettings() {
	const user = useAuthStore((s) => s.user);
	const { data: profile } = useProfile();
	const userId = user?.id;

	const [form, setForm] = useState({
		username: profile?.username ?? "",
		phone_number: profile?.phone_number ?? "",
		address: profile?.address ?? "",
	});

	const { mutate: updateProfile, isPending } = useUpdateProfile();
	const { mutate: mutateAvatar } = useUpdateAvatar(userId ?? "");

	const handleSave = () => {
		updateProfile({
			...form,
		});
	};

	console.log("avatar", profile?.avatar);

	return (
		<div className="max-w-3xl mx-auto flex flex-col gap-6">
			<div>
				<Large>Profile</Large>
				<Muted>Update your personal information</Muted>
			</div>

			<Card>
				<CardContent className="flex items-center gap-4 p-6">
					<div className="w-16 md:w-32  aspect-square relative">
						<Image
							src={
								profile?.avatar ? profile?.avatar : "/avatar_placeholder.avif"
							}
							alt="Avatar"
							fill
							className="rounded-full object-cover"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<P>Profile Picture</P>
						<Input
							type="file"
							accept="image/*"
							disabled={isPending}
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								mutateAvatar({ file });
							}}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<Card>
					<CardContent className="p-6 flex flex-col gap-2">
						<Label>Username</Label>
						<Input
							placeholder={profile?.username ?? "your_username"}
							value={form.username}
							onChange={(e) => setForm({ ...form, username: e.target.value })}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6 flex flex-col gap-2">
						<Label>Default Phone Number</Label>
						<Input
							placeholder={profile?.phone_number ?? "+1 555 123 4567"}
							value={form.phone_number}
							onChange={(e) =>
								setForm({ ...form, phone_number: e.target.value })
							}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6 flex flex-col gap-2">
						<Label>Default Address</Label>
						<Input
							placeholder={profile?.address ?? "123 Main St, New York, NY"}
							value={form.address}
							onChange={(e) => setForm({ ...form, address: e.target.value })}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6 flex flex-col gap-2">
						<Label>Loyal member since</Label>
						<Input
							value={
								user
									? new Date(user.created_at).toLocaleDateString(undefined, {
											year: "numeric",
											month: "long",
											day: "numeric",
										})
									: ""
							}
							disabled
						/>
					</CardContent>
				</Card>
			</div>

			<div className="flex justify-start">
				<Button
					size="lg"
					className="w-auto"
					onClick={handleSave}
					disabled={isPending}
				>
					Save Changes
				</Button>
			</div>
		</div>
	);
}

import { supabase } from "../supabase/client";
import { useAuthStore } from "@/store/useAuthStore";

export interface Profile {
	id: string;
	username: string | null;
	avatar: string | null;
	phone_number: string;
	created_at: string;
	address: string;
}

export async function fetchProfile(userId: string): Promise<Profile> {
	const { data, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();

	if (error) throw error;

	return data;
}

export async function createProfile(profile: {
	id: string;
	username?: string;
	avatar?: string;
}) {
	const { error } = await supabase.from("profiles").insert({
		id: profile.id,
		username: profile.username ?? null,
		avatar: profile.avatar ?? null,
	});

	if (error) throw error;
}

export type UpdateProfileVars = {
	user_id: string;
	username?: string;
	phone_number?: string;
	address?: string;
};

export async function updateProfile(updates: {
	username?: string;
	phone_number?: string;
	address?: string;
}) {
	const user = useAuthStore.getState().user;

	if (!user?.id) {
		throw new Error("Not logged in");
	}

	const { data, error } = await supabase
		.from("profiles")
		.update(updates)
		.eq("id", user.id)
		.select("*")
		.single();

	if (error) throw error;

	return data;
}

export async function uploadAvatar({ file }: { file: File }) {
	const formData = new FormData();
	formData.append("file", file);

	const res = await fetch("/api/avatar", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		throw new Error(body?.error ?? "Avatar upload failed");
	}

	return res.json();
}

import { supabase } from "../supabase";
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
	// ✅ Always grab current user inside query
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

export async function uploadAvatar({
	userId,
	file,
}: {
	userId: string;
	file: File;
}) {
	const filePath = `${userId}-${Date.now()}.jpg`;

	// upload / overwrite image
	const { error: uploadError } = await supabase.storage
		.from("avatars")
		.upload(filePath, file, {
			upsert: true,
			contentType: file.type,
		});

	if (uploadError) {
		throw uploadError;
	}

	// build public URL
	const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

	// update profile row
	const { data, error } = await supabase
		.from("profiles")
		.update({ avatar: publicUrl })
		.eq("id", userId)
		.select("*")
		.single();

	if (error) {
		throw error;
	}

	return data;
}

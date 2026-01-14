import { supabase } from "../supabase";

export interface Profile {
  id: string;
  username: string | null;
  avatar: string | null;
  created_at: string;
}

/**
 * Fetch user profile by user ID
 * Throws if profile does not exist
 */
export async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Create a new profile for a user
 * Typically called after sign-up
 */
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

/**
 * Update current user's profile
 */
export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, "username" | "avatar">>
) {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) throw error;
}

/**
 * Fetch profile if it exists, otherwise return null
 */
export async function fetchProfileSafe(
  userId: string
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;

  return data;
}

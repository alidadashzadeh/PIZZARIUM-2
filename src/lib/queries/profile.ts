import { supabase } from "../supabase";

export interface Profile {
  id: string;
  username: string | null;
  avatar: string | null;
  phone_number: string;
  created_at: string;
  address: string;
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
// export async function updateProfile(
//   userId: string,
//   updates: Partial<Pick<Profile, "username" | "avatar">>
// ) {
//   const { error } = await supabase
//     .from("profiles")
//     .update(updates)
//     .eq("id", userId);

//   if (error) throw error;
// }
type UpdateProfileInput = {
  username?: string;
  phone_number?: string;
  address?: string;
};

export async function updateProfile(data: UpdateProfileInput) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
  );

  if (Object.keys(cleanData).length === 0) {
    throw new Error("Nothing to update");
  }

  const { error } = await supabase
    .from("profiles")
    .update(cleanData)
    .eq("id", user.id);

  if (error) throw error;
}

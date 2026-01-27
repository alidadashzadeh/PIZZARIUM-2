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

type UpdateProfileInput = {
  username?: string;
  phone_number?: string;
  address?: string;
};

export type UpdateProfileVars = {
  user_id: string;
  username?: string;
  phone_number?: string;
  address?: string;
};

export async function updateProfile({
  user_id,
  ...updates
}: UpdateProfileVars) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user_id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

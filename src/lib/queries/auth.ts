import { supabase } from "./../supabase";
import { supabase as supabaseClient } from "./../supabase/client";

import type { Session, User } from "@supabase/supabase-js";

export async function signUp(email: string, password: string) {
	const { data, error } = await supabaseClient.auth.signUp({
		email,
		password,
	});

	if (error) throw error;

	return {
		user: data.user ?? null,
		session: data.session ?? null,
	};
}

export async function signIn(email: string, password: string) {
	const { data, error } = await supabaseClient.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;

	return data;
}

export async function signOut() {
	const { error } = await supabaseClient.auth.signOut();
	if (error) throw error;
}

export async function getSession(): Promise<Session | null> {
	const { data, error } = await supabase.auth.getSession();
	if (error) throw error;

	return data.session;
}

export async function getUser(): Promise<User | null> {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;

	return data.user;
}

export function onAuthStateChange(
	callback: (event: string, session: Session | null) => void,
) {
	return supabase.auth.onAuthStateChange((event, session) => {
		callback(event, session);
	});
}

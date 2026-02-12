import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
	user: User | null;
	session: Session | null;
	loading: boolean;

	setSession: (session: Session | null) => void;
	signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	session: null,
	loading: true,

	setSession: (session) => {
		if (!session) {
			set({ session: null, user: null, loading: false });
			return;
		}

		const user = session.user;

		set({
			session,
			user,
			loading: false,
		});
	},

	signOut: async () => {
		await supabase.auth.signOut();
		set({ session: null, user: null, loading: false });
	},
}));

// Load initial session
(async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();

	useAuthStore.getState().setSession(session);
})();

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
	useAuthStore.getState().setSession(session);
});

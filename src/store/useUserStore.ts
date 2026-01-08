import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface UserState {
	user: User | null;
	loading: boolean;

	setUser: (user: User | null) => void;
	fetchUser: () => Promise<void>;
	signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
	user: null,
	loading: false,

	setUser: (user) => set({ user }),

	fetchUser: async () => {
		set({ loading: true });

		const {
			data: { user },
		} = await supabase.auth.getUser();

		set({ user, loading: false });
	},

	signOut: async () => {
		await supabase.auth.signOut();
		set({ user: null });
	},
}));

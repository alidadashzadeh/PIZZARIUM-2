// authStore.ts
import { create } from "zustand";
import { supabase } from "./../lib/supabase";
import { fetchProfile } from "@/lib/queries/profile";

interface AuthState {
  user: any | null; // Supabase user object
  session: any | null; // Supabase session object
  loading: boolean; // true while checking session

  setSession: (session) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setSession: async (session) => {
    if (!session) {
      set({ session: null, user: null, loading: false });
      return;
    }

    // Base user
    const user = session.user;

    try {
      // Fetch profile from Supabase
      const profile = await fetchProfile(user.id);

      // Merge profile into user
      set({
        session,
        user: session.user,
        // user: {
        //   ...user,
        //   username: profile.username,
        //   avatar: profile.avatar,
        //   phone_number: profile.phone_number,
        // },
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      // fallback to just user
      set({ session, user, loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));

// Initialize store on app start
(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  useAuthStore.getState().setSession(session);
})();

// Listen to auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setSession(session);
});

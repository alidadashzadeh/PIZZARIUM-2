// // authStore.ts
// import { create } from "zustand";
// import { supabase } from "./../lib/supabase";
// import { fetchProfile } from "@/lib/queries/profile";
// import { Session, User } from "@supabase/supabase-js";

// interface AuthState {
//   user: User | null;
//   session: Session | null;
//   loading: boolean;

//   setSession: (session: Session) => void;
//   signOut: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   session: null,
//   loading: true,

//   setSession: async (session) => {
//     if (!session) {
//       set({ session: null, user: null, loading: false });
//       return;
//     }

//     // Base user
//     const user = session.user;

//     try {
//       // Fetch profile from Supabase
//       const profile = await fetchProfile(user.id);

//       // Merge profile into user
//       set({
//         session,
//         user: session.user,
//         loading: false,
//       });
//     } catch (err) {
//       console.error("Failed to fetch profile:", err);
//       // fallback to just user
//       set({ session, user, loading: false });
//     }
//   },

//   signOut: async () => {
//     await supabase.auth.signOut();
//     set({ session: null, user: null });
//   },
// }));

// // Initialize store on app start
// (async () => {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   if (session) {
//     useAuthStore.getState().setSession(session);
//   }
// })();

// // Listen to auth changes
// supabase.auth.onAuthStateChange((_event, session) => {
//   if (session) {
//     useAuthStore.getState().setSession(session);
//   }
// });

// authStore.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabase";
import { fetchProfile } from "@/lib/queries/profile";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;

  setSession: (session: Session | null) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setSession: async (session) => {
    // ✅ Clear auth state if logged out
    if (!session) {
      set({ session: null, user: null, loading: false });
      return;
    }

    const user = session.user;

    try {
      // Fetch profile (optional)
      await fetchProfile(user.id);

      set({
        session,
        user,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);

      // fallback to base user
      set({
        session,
        user,
        loading: false,
      });
    }
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

  useAuthStore.getState().setSession(session); // ✅ session can be null
})();

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setSession(session); // ✅ always update
});

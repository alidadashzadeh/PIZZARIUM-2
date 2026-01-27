// import { useState } from "react";
// import { supabase } from "@/lib/supabase";

// type UpdateProfileInput = {
//   username?: string;
//   phone?: string;
//   address?: string;
// };

// export function useUpdateProfile() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateProfile = async (data: UpdateProfileInput) => {
//     setLoading(true);
//     setError(null);

//     console.log(data);
//     const cleanData = Object.fromEntries(
//       Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
//     );
//     console.log(cleanData);

//     const {
//       data: { user },
//       error: authError,
//     } = await supabase.auth.getUser();

//     if (authError || !user) {
//       setError("Not authenticated");
//       setLoading(false);
//       return;
//     }

//     const { data: updatedUser, error } = await supabase
//       .from("profiles")
//       .update({
//         ...data,
//         // updated_at: new Date().toISOString(),
//       })
//       .eq("id", user.id)
//       .select();

//     if (error) {
//       setError(error.message);
//     }

//     setLoading(false);
//   };

//   return {
//     updateProfile,
//     loading,
//     error,
//   };
// }
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/lib/queries/profile";
import { useAuthStore } from "@/store/useAuthStore";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      if (!userId) return;

      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });
};

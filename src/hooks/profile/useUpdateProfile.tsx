// "use client";

import { updateProfile } from "@/lib/queries/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["profile", userId],
      });

      const previousProfile = queryClient.getQueryData(["profile", userId]);

      const { user_id, ...optimisticFields } = variables as any;

      queryClient.setQueryData(["profile", userId], (old: any) => ({
        ...old,
        ...optimisticFields,
      }));

      return { previousProfile };
    }, // ✅ comma, not semicolon

    onError: (_error, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", userId], context.previousProfile);
      }

      toast.error("Update failed, changes reverted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },

    onSuccess: () => {
      toast.success("Profile updated");
    },
  });
}

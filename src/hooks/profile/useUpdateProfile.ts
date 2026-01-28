import { updateProfile } from "@/lib/queries/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    // OPTIMISTIC UPDATE
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["profile", userId],
      });

      const previousProfile = queryClient.getQueryData(["profile", userId]);

      // remove user_id so it doesn't pollute cache
      const { user_id, ...optimisticFields } = variables as any;

      queryClient.setQueryData(["profile", userId], (old: any) =>
        old
          ? {
              ...old,
              ...optimisticFields,
            }
          : old
      );

      return { previousProfile };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", userId], context.previousProfile);
      }

      toast.error("Update failed, changes reverted");
    },

    // ✅ commit real server truth directly into cache
    // ✅ remove invalidate and extra fetch
    onSuccess: (serverProfile) => {
      queryClient.setQueryData(["profile", userId], serverProfile);

      toast.success("Profile updated");
    },
  });
}

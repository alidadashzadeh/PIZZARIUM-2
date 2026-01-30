import { updateProfile } from "@/lib/queries/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onMutate: async (variables) => {
      const user = useAuthStore.getState().user;
      if (!user?.id) return;

      const userId = user.id;

      await queryClient.cancelQueries({
        queryKey: ["profile", userId],
      });

      const previousProfile = queryClient.getQueryData(["profile", userId]);

      queryClient.setQueryData(["profile", userId], (old: any) =>
        old ? { ...old, ...variables } : old
      );

      return { previousProfile };
    },

    onError: (_err, _vars, context) => {
      const user = useAuthStore.getState().user;
      if (!user?.id) return;

      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", user.id], context.previousProfile);
      }

      toast.error("Update failed, reverted");
    },

    onSuccess: (serverProfile) => {
      const user = useAuthStore.getState().user;
      if (!user?.id) return;

      queryClient.setQueryData(["profile", user.id], serverProfile);

      toast.success("Profile updated");
    },
  });
}

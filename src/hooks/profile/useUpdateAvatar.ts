import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, uploadAvatar } from "@/lib/queries/profile";
import { toast } from "sonner";

export function useUpdateAvatar(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAvatar,

    onMutate: async ({ file }) => {
      await queryClient.cancelQueries({
        queryKey: ["profile", userId],
      });

      const previousProfile = queryClient.getQueryData<Profile>([
        "profile",
        userId,
      ]);

      const previewUrl = URL.createObjectURL(file);

      queryClient.setQueryData<Profile>(["profile", userId], (old) =>
        old
          ? {
              ...old,
              avatar: previewUrl,
            }
          : old
      );

      return { previousProfile, previewUrl };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", userId], context.previousProfile);
      }

      toast.error("Avatar update failed");
    },

    onSuccess: () => {
      toast.success("Avatar updated");
    },

    onSettled: (_data, _err, _vars, context) => {
      if (context?.previewUrl) {
        URL.revokeObjectURL(context.previewUrl);
      }

      queryClient.invalidateQueries({
        queryKey: ["profile", userId],
      });
    },
  });
}

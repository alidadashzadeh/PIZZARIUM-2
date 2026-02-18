import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, uploadAvatar } from "@/lib/queries/profile";
import { toast } from "sonner";

export function useUpdateAvatar(userId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: uploadAvatar,

		onMutate: async ({ file }) => {
			await queryClient.cancelQueries({ queryKey: ["profile", userId] });

			const previousProfile = queryClient.getQueryData<Profile>([
				"profile",
				userId,
			]);

			const previewUrl = URL.createObjectURL(file);

			queryClient.setQueryData<Profile>(["profile", userId], (old) =>
				old ? { ...old, avatar: previewUrl } : old,
			);

			return { previousProfile, previewUrl };
		},

		onError: (_err, _vars, context) => {
			if (context?.previousProfile) {
				queryClient.setQueryData(["profile", userId], context.previousProfile);
			}
		},

		onSuccess: async (serverProfile, _vars, context) => {
			const realUrl = serverProfile.avatar;

			// preload image first
			const img = new window.Image();
			img.src = realUrl;

			// only swap after fully loaded - remove flickering avatar
			img.onload = () => {
				queryClient.setQueryData(["profile", userId], serverProfile);

				if (context?.previewUrl) {
					URL.revokeObjectURL(context.previewUrl);
				}
			};

			// fallback: still commit even if preload fails
			img.onerror = () => {
				queryClient.setQueryData(["profile", userId], serverProfile);

				if (context?.previewUrl) {
					URL.revokeObjectURL(context.previewUrl);
				}
			};

			toast.success("Avatar updated");
		},
	});
}

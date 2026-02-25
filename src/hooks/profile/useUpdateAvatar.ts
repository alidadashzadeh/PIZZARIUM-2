import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, uploadAvatar } from "@/lib/queries/profile";
import { toast } from "sonner";
import { resizeAndConvertToWebp } from "@/lib/utils";

export function useUpdateAvatar(userId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ file }: { file: File }) => {
			const optimized = await resizeAndConvertToWebp(file);
			return uploadAvatar({ file: optimized });
		},

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

			toast.error(
				_err instanceof Error ? _err.message : "Avatar update failed",
			);
		},

		onSuccess: async (serverProfile, _vars, context) => {
			const realUrl = serverProfile.avatar;

			const img = new window.Image();
			img.src = realUrl;

			img.onload = () => {
				queryClient.setQueryData(["profile", userId], serverProfile);

				if (context?.previewUrl) {
					URL.revokeObjectURL(context.previewUrl);
				}
			};

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

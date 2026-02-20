import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile, uploadAvatar } from "@/lib/queries/profile";
import { toast } from "sonner";

async function resizeAndConvertToWebp(
	file: File,
	maxSize = 512,
	quality = 0.75,
): Promise<File> {
	const bitmap = await createImageBitmap(file);

	const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height, 1);

	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d")!;
	ctx.drawImage(bitmap, 0, 0, width, height);

	const blob = await new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(b) => (b ? resolve(b) : reject(new Error("WebP conversion failed"))),
			"image/webp",
			quality,
		);
	});

	const newName = file.name.replace(/\.\w+$/, ".webp");

	return new File([blob], newName, { type: "image/webp" });
}

export function useUpdateAvatar(userId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ file }: { file: File }) => {
			const optimized = await resizeAndConvertToWebp(file);
			return uploadAvatar({ userId, file: optimized });
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

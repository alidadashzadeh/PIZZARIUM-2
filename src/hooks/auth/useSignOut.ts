"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut as signOutFn } from "@/lib/queries/auth";
import { toast } from "sonner";

export function useSignOut() {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: signOutFn,

		onSuccess: () => {
			queryClient.clear();
			toast("Signed out successfully!");
			router.replace("/");
		},
	});
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AccountDashboard from "./AccountDashboard";
import { Spinner } from "../ui/spinner";

import { useAuthStore } from "@/store/useAuthStore";

export default function ProtectedProfilePage() {
	const user = useAuthStore((s) => s.user);
	const router = useRouter();

	useEffect(() => {
		if (user === null) {
			// redirect to home if user is logged out
			router.replace("/");
		}
	}, [user, router]);

	// show loader while auth state is initializing
	if (user === undefined)
		return (
			<div className="text-center mt-20">
				<Spinner className="mx-auto mt-6" />
			</div>
		);

	if (!user) return null;

	return <AccountDashboard />;
}

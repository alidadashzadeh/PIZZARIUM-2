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
			router.replace("/");
		}
	}, [user, router]);

	if (user === undefined)
		return (
			<div className="text-center mt-20">
				<Spinner className="mx-auto mt-6" />
			</div>
		);

	if (!user) return null;

	return <AccountDashboard />;
}

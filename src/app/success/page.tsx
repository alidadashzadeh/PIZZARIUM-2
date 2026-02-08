import SuccessPage from "@/components/success/SuccessPage";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<SuccessPage />
		</Suspense>
	);
}
// import SuccessPage from "@/components/success/SuccessPage";
// import { Spinner } from "@/components/ui/spinner";
// import { Suspense } from "react";
// import { redirect } from "next/navigation";

// export default function Page({
// 	searchParams,
// }: {
// 	searchParams: { session_id?: string };
// }) {
// 	const { session_id } = searchParams;

// 	if (!session_id) {
// 		redirect("/");
// 	}

// 	return (
// 		<Suspense fallback={<Spinner />}>
// 			<SuccessPage />
// 		</Suspense>
// 	);
// }

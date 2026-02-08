import SuccessPage from "@/components/success/SuccessPage";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function page() {
	return (
		<Suspense fallback={<Spinner />}>
			<SuccessPage />
		</Suspense>
	);
}

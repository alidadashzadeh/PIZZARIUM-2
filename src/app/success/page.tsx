import { Suspense } from "react";

import SuccessPage from "@/components/success/SuccessClient";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
	return (
		<Suspense fallback={<Spinner />}>
			<SuccessPage />
		</Suspense>
	);
}

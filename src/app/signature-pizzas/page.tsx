import { Suspense } from "react";

import { H2 } from "@/components/ui/Typography";
import SignaturePizzasList from "@/components/signaturePizzas/SignaturePizzasList";
import SignatureListLoader from "@/components/ui/SignatureListLoader";

import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";

export const revalidate = 3600;

export default async function Page() {
	const pizzas = await fetchSignaturePizzas();

	return (
		<div className="flex flex-col gap-4">
			<H2>Discover Signature Pizzas</H2>
			<Suspense fallback={<SignatureListLoader />}>
				<SignaturePizzasList pizzas={pizzas} />
			</Suspense>
		</div>
	);
}

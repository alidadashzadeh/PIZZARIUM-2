import { H2 } from "@/components/ui/Typography";
import SignaturePizzasList from "@/components/signaturePizzas/SignaturePizzasList";
import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";
import { Suspense } from "react";
import SignatureListLoader from "@/components/ui/SignatureListLoader";

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

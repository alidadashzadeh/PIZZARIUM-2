import { H2 } from "@/components/ui/Typography";
import SignaturePizzasList from "@/components/signaturePizzas/SignaturePizzasList";
import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";
import { Suspense } from "react";

// ISR: regenerate page every hour if data changes
export const revalidate = 3600;

export default async function Page() {
	// Server-side fetch
	// Optimal because signature pizzas rarely change
	const pizzas = await fetchSignaturePizzas();

	return (
		<div className="flex flex-col gap-4">
			<H2>Discover Signature Pizzas</H2>
			{/* Client component handles: - Sorting ,filtering, etc... - Instant UI
			updates without network requests */}
			<Suspense fallback={<p>Loading filters...</p>}>
				<SignaturePizzasList pizzas={pizzas} />
			</Suspense>
		</div>
	);
}

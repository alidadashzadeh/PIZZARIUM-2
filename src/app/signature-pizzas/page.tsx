import { H2 } from "@/components/ui/Typography";
import SignaturePizzasList from "@/components/signaturePizzas/SignaturePizzasList";

import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";

export const revalidate = 300;

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{
		category?: string;
		sortBy?: string;
		sortOrder?: string;
	}>;
}) {
	const pizzas = await fetchSignaturePizzas();
	const params = await searchParams;

	return (
		<div className="flex flex-col gap-4">
			<H2>Discover Signature Pizzas</H2>
			<SignaturePizzasList pizzas={pizzas} searchParams={params} />
		</div>
	);
}

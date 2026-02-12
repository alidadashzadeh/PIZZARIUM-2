import { redirect } from "next/navigation";

import SignaturePizzaControls from "@/components/signaturePizzas/SignaturePizzaControls";
import SignaturePizzaInfo from "@/components/signaturePizzas/SignaturePizzaInfo";

import { fetchSignaturePizzaDetails } from "@/lib/queries/signaturePizza";

type Props = {
	params: Promise<{ id: string; slug: string }>;
};

export default async function Page({ params }: Props) {
	const { id, slug } = await params;
	const { data: pizza, error } = await fetchSignaturePizzaDetails(id);

	if (slug !== pizza.slug) {
		redirect(`/signature-pizzas/${pizza.id}/${pizza.slug}`);
	}

	if (error || !pizza) return <div>Pizza not found</div>;

	return (
		<div className="grid  grid-cols-[500px_1fr_500px] gap-6 items-start">
			<SignaturePizzaInfo pizza={pizza} />
			<SignaturePizzaControls pizza={pizza} />
		</div>
	);
}

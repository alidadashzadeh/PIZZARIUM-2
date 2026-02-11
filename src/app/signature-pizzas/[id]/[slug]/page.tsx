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
		<div className="flex flex-col lg:flex-row gap-4">
			<SignaturePizzaInfo pizza={pizza} />
			<SignaturePizzaControls pizza={pizza} />
		</div>
	);
}

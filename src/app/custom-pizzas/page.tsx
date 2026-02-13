import { H2 } from "@/components/ui/Typography";

import { getCustomPizzaData } from "@/lib/queries/customPizzas";

import CustomPizzaList from "../../components/customPizzas/CustomPizzaList";

export default async function Page() {
	const customPizzaData = await getCustomPizzaData();

	return (
		<>
			<H2>Create your Pizza</H2>
			<CustomPizzaList {...customPizzaData} />
		</>
	);
}

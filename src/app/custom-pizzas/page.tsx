import CustomPizzaClient from "./CustomPizzaClient";

import { getCustomPizzaData } from "@/lib/queries/customPizzas";

export default async function Page() {
	const pizzaData = await getCustomPizzaData();

	return <CustomPizzaClient {...pizzaData} />;
}

import DrinkList from "@/components/drinks/DrinkList";
import { H2 } from "@/components/ui/Typography";

function page() {
	return (
		<div className="pt-8 flex flex-col gap-4">
			<H2>drinks</H2>
			<div>
				<DrinkList />
			</div>
		</div>
	);
}

export default page;

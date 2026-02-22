import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { H4 } from "../ui/Typography";

import { usePizzaStore } from "@/store/usePizzaStore";

import { CustomPizzaType } from "@/types/customPizzaType";

export default function CustomPizzaSizeSelector() {
	const size = usePizzaStore((s) => s.customPizza?.size);
	const price = usePizzaStore((s) => s.customPizza?.price);
	const selectSize = usePizzaStore((state) => state.selectSize);

	return (
		<>
			<H4>Size</H4>
			<ToggleGroup
				type="single"
				variant="outline"
				value={size}
				className="w-full"
				onValueChange={(value) => {
					if (!value) return;
					selectSize(value as CustomPizzaType["size"]);
				}}
			>
				<ToggleGroupItem value="small" className="sm:p-4  cursor-pointer">
					Small - ${price?.small}
				</ToggleGroupItem>
				<ToggleGroupItem value="medium" className="sm:p-4 cursor-pointer">
					Medium - ${price?.medium}
				</ToggleGroupItem>
				<ToggleGroupItem value="large" className="sm:p-4 cursor-pointer">
					Large - ${price?.large}
				</ToggleGroupItem>
			</ToggleGroup>
		</>
	);
}

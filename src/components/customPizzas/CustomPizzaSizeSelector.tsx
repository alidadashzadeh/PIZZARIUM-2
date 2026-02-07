import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePizzaStore } from "@/store/usePizzaStore";
import { CustomPizzaType } from "@/types/customPizzaType";
import { H4 } from "../ui/Typography";

export default function CustomPizzaSizeSelector() {
	const size = usePizzaStore((s) => s.customPizza?.size);
	const price = usePizzaStore((s) => s.customPizza?.price);
	const selectSize = usePizzaStore((state) => state.selectSize);

	console.log(price);
	return (
		<>
			<H4>Size</H4>
			<ToggleGroup
				type="single"
				variant="outline"
				value={size}
				onValueChange={(value) => {
					if (!value) return;
					selectSize(value as CustomPizzaType["size"]);
				}}
			>
				<ToggleGroupItem value="small" className="p-4 cursor-pointer">
					Small - ${price?.small}
				</ToggleGroupItem>
				<ToggleGroupItem value="medium" className="p-4 cursor-pointer">
					Medium - ${price?.medium}
				</ToggleGroupItem>
				<ToggleGroupItem value="large" className="p-4 cursor-pointer">
					Large - ${price?.large}
				</ToggleGroupItem>
			</ToggleGroup>
		</>
	);
}

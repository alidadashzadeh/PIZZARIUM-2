"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Large } from "../ui/Typography";
import CustomPizzaImage from "./CustomPizzaImage";
import CustomPizzaaRecipe from "./CustomPizzaaRecipe";
import CustomPizzaToppings from "./CustomPizzaToppings";
import CustomPizzaSizeSelector from "./CustomPizzaSizeSelector";
import { toast } from "sonner";

import { useCartStore } from "@/store/useCartStore";
import { usePizzaStore } from "@/store/usePizzaStore";

import { ConfirmPizzaModalProps } from "@/types/CartType";

export default function ConfirmPizzaModal({
	open,
	onOpenChange,
}: ConfirmPizzaModalProps) {
	const customPizza = usePizzaStore((s) => s.customPizza);
	const resetCustomPizza = usePizzaStore((s) => s.resetCustomPizza);
	const addItem = useCartStore((s) => s.addItem);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm your pizza</DialogTitle>
					<div className="relative h-76 aspect-square mx-auto">
						<CustomPizzaImage />
					</div>
				</DialogHeader>

				<CustomPizzaaRecipe />

				<CustomPizzaToppings />

				<CustomPizzaSizeSelector />

				<Button
					className="cursor-pointer"
					onClick={() => {
						if (customPizza?.toppings.length === 0) {
							toast.error("no toppings selected!");
							return;
						}
						addItem({
							...customPizza,
							name: "custom pizza",
							type: "custom",
							quantity: 1,
							price: customPizza.price ?? 0,
						});
						onOpenChange(false);
						resetCustomPizza();
					}}
				>
					<Large>
						${(customPizza?.price?.[customPizza?.size] ?? 0).toFixed(2)}- Add to
						Cart
					</Large>
				</Button>
			</DialogContent>
		</Dialog>
	);
}

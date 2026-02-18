import Image from "next/image";

import { usePizzaStore } from "@/store/usePizzaStore";

export default function CustomPizzaImage() {
	const toppings = usePizzaStore((s) => s.customPizza?.toppings);

	return (
		<>
			<Image
				src="/base-pizza.png"
				alt="pizza-base"
				fill
				className="object-contain"
			/>
			{toppings?.map((topping) => {
				return (
					<Image
						src={topping?.image_raw}
						alt="pizza-base"
						fill
						className="object-contain"
						key={topping?.id}
					/>
				);
			})}
		</>
	);
}

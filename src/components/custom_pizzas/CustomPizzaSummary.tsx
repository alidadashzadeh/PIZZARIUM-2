"use client";

import { useEffect } from "react";
import { Large } from "../ui/Typography";
import { Button } from "../ui/button";
import { usePizzaStore } from "@/store/usePizzaStore";
import { estimateCustomPizzaCost } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import CustomPizzaImage from "./CustomPizzaImage";
import CustomPizzaaRecipe from "./CustomPizzaaRecipe";
import CustomPizzaToppings from "./CustomPizzaToppings";
import CustomPizzaSizeSelector from "./CustomPizzaSizeSelector";
import CustomPizzaQuantity from "./CustomPizzaQuantity";

type Props = {
  onAddToCart: () => void;
};
export default function CustomPizzaSummary({ onAddToCart }: Props) {
  const customPizza = usePizzaStore((state) => state.customPizza);
  const setPrice = usePizzaStore((state) => state.setPrice);
  const resetCustomPizza = usePizzaStore((state) => state.resetCustomPizza);

  useEffect(() => {
    const basePrice = estimateCustomPizzaCost(customPizza);
    setPrice(basePrice);
  }, [
    customPizza.size,
    customPizza.dough,
    customPizza.crust,
    customPizza.sauce,
    customPizza.cheese,
    customPizza.cook,
    customPizza.toppings,
  ]);

  return (
    <div className="w-100 sticky top-4 self-start flex flex-col gap-2">
      <Button
        variant="outline"
        className="absolute top-0 right-0 cursor-pointer z-100"
        onClick={resetCustomPizza}
      >
        <div>Clear</div>
        <RefreshCw />
      </Button>

      <div className="relative h-76 aspect-square mx-auto ">
        <CustomPizzaImage />
      </div>

      <CustomPizzaaRecipe />

      <CustomPizzaToppings />

      <CustomPizzaSizeSelector />

      <CustomPizzaQuantity />

      <div>
        <Button className="cursor-pointer w-full" onClick={onAddToCart}>
          <Large>
            $
            {(
              (customPizza?.price?.[customPizza?.size] ?? 0) *
              customPizza?.quantity
            ).toFixed(2)}{" "}
            - Confirm & Add to Cart
          </Large>
        </Button>
      </div>
    </div>
  );
}

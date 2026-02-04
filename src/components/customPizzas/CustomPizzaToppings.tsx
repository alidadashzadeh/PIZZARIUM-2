import React from "react";
import { H4 } from "../ui/Typography";
import { usePizzaStore } from "@/store/usePizzaStore";
import { Separator } from "../ui/separator";

export default function CustomPizzaToppings() {
  const toppings = usePizzaStore((s) => s.customPizza?.toppings);

  return (
    <div>
      <H4>Toppings</H4>
      <div className="flex flex-wrap gap-2">
        {toppings?.length >= 1
          ? toppings?.map((topping) => (
              <div
                key={topping.id}
                className="flex flex-wrap gap-2 items-center"
              >
                <div>{topping?.name}</div>
                <Separator orientation="vertical" className="h-4" />
              </div>
            ))
          : "No toppings yet"}
      </div>
    </div>
  );
}

import React from "react";
import { H4 } from "../ui/Typography";
import { usePizzaStore } from "@/store/usePizzaStore";
import { Separator } from "../ui/separator";

export default function CustomPizzaaRecipe() {
  const dough = usePizzaStore((state) => state.customPizza?.dough);
  const sauce = usePizzaStore((state) => state.customPizza?.sauce);
  const crust = usePizzaStore((state) => state.customPizza?.crust);
  const cook = usePizzaStore((state) => state.customPizza?.cook);
  const cheese = usePizzaStore((state) => state.customPizza?.cheese);

  return (
    <>
      <H4>Your Recipe</H4>
      <div className="flex flex-wrap gap-2 text-sm items-center">
        <div>{dough?.name} Dough</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{sauce?.name} Sauce</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{crust?.name} Crust</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{cook?.name} Cook</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{cheese?.name} cheese</div>
      </div>
    </>
  );
}

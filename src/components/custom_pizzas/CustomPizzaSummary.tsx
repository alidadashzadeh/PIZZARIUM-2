"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { H4, Large } from "../ui/Typography";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "../ui/button";
import { usePizzaStore } from "@/store/usePizzaStore";
import { Separator } from "@/components/ui/separator";
import { estimateCustomPizzaCost } from "@/lib/utils";
import { CustomPizzaType } from "@/types/pizzaType";
import { RefreshCw } from "lucide-react";

export default function CustomPizzaSummary() {
  const customPizza = usePizzaStore((state) => state.customPizza);
  const selectSize = usePizzaStore((state) => state.selectSize);
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
  console.log(customPizza);

  return (
    <div className="w-112 sticky top-4 self-start">
      <Button
        variant="outline"
        className="absolute top-0 right-0"
        onClick={resetCustomPizza}
      >
        Clear
        <RefreshCw />
      </Button>
      {/* <H3>Symmary</H3> */}
      <div className="relative h-76 aspect-square mx-auto">
        <Image
          src="/base-pizza.png"
          alt="pizza-base"
          fill
          className="object-contain"
        />
        {customPizza?.toppings?.map((topping) => {
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
      </div>
      <H4>Your Recipe</H4>
      <div className="flex flex-wrap gap-2 text-sm items-center">
        <div>{customPizza?.dough?.name} Dough</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{customPizza?.sauce?.name} Sauce</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{customPizza?.crust?.name} Crust</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{customPizza?.cook?.name} Cook</div>
        <Separator orientation="vertical" className="h-4" />
        <div>{customPizza?.cheese?.name} cheese</div>
      </div>
      <H4>Toppings</H4>
      <div className="flex flex-wrap gap-2">
        {customPizza?.toppings?.length >= 1
          ? customPizza?.toppings?.map((topping) => (
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
      <H4>Size</H4>
      <div>
        <ToggleGroup
          type="single"
          variant="outline"
          value={customPizza.size}
          onValueChange={(value) => {
            if (!value) return;
            selectSize(value as CustomPizzaType["size"]);
          }}
        >
          <ToggleGroupItem value="small" className="p-4">
            Small - ${customPizza?.price?.small}
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" className="p-4">
            Medium - ${customPizza?.price?.medium}
          </ToggleGroupItem>
          <ToggleGroupItem value="large" className="p-4">
            Large - ${customPizza?.price?.large}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <H4>Quantity</H4>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          -
        </Button>
        <span className="w-8 text-center">{4}</span>
        <Button variant="outline" size="icon">
          +
        </Button>
      </div>
      <Button>
        <Large>Add to Cart</Large>
      </Button>
    </div>
  );
}

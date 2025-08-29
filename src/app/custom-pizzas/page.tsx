"use client";

import { useState } from "react";

import { H1 } from "@/components/ui/Typography";
import { useGetCheeses } from "@/hooks/custom-pizzas/useGetCheeses";
import { useGetCooks } from "@/hooks/custom-pizzas/useGetCooks";
import { useGetCrusts } from "@/hooks/custom-pizzas/useGetCrust";
import { useGetSauces } from "@/hooks/custom-pizzas/useGetSauces";
import { useGetToppings } from "@/hooks/custom-pizzas/useGetToppings";
import { useGetDoughs } from "@/hooks/custom-pizzas/usegetDoughs";
import { Button } from "@/components/ui/button";
import CustomItemsList from "@/components/custom_pizzas/CustomItemsList";
import CustomPizzaSummary from "@/components/custom_pizzas/CustomPizzaSummary";

const categories = [
  { name: "Dough", value: "dough" },
  { name: "Crust", value: "crust" },
  { name: "Sauce", value: "sauce" },
  { name: "Cook", value: "cook" },
  { name: "Toppings", value: "toppings" },
];

function page() {
  const [selected, setSelected] = useState("dough");

  const { data: cheeses } = useGetCheeses();
  const { data: cooks } = useGetCooks();
  const { data: crusts } = useGetCrusts();
  const { data: doughs } = useGetDoughs();
  const { data: sauces } = useGetSauces();
  const { data: toppings } = useGetToppings();

  return (
    <div className="pt-8 flex flex-col gap-4">
      <H1>Create your Pizza</H1>
      <div className="grid grid-cols-[200px_1fr_320px] gap-4">
        <div className="flex flex-row gap-2 sm:flex-col">
          {categories.map((cat) => {
            return (
              <Button
                variant={selected === cat.value ? "default" : "outline"}
                key={cat.name}
                onClick={() => setSelected(cat.value)}
              >
                {cat.name}
              </Button>
            );
          })}
        </div>
        <div className="">
          {selected === "dough" && <CustomItemsList list={doughs} />}
          {selected === "cook" && <CustomItemsList list={cooks} />}
          {selected === "crust" && <CustomItemsList list={crusts} />}
          {selected === "sauce" && <CustomItemsList list={sauces} />}
          {selected === "cheese" && <CustomItemsList list={cheeses} />}
          {selected === "toppings" && <CustomItemsList list={toppings} />}
        </div>
        <div className="bg-green-100">
          <CustomPizzaSummary />
        </div>
      </div>
    </div>
  );
}

export default page;

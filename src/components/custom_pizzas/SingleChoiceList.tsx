"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { CheckCheckIcon, Minus, Plus } from "lucide-react";
import { Items } from "./CustomPizzaList";
import { Card, CardContent } from "../ui/card";
import { usePizzaStore } from "@/store/usePizzaStore";
import { CustomPizzaType } from "@/types/pizzaType";

type SingleChoiceKey = Exclude<
  keyof CustomPizzaType,
  "toppings" | "price" | "size"
>;

type SingleChoiceListProps = {
  name: SingleChoiceKey;
  options: Items[];
};

export default function SingleChoiceList({
  name,
  options,
}: SingleChoiceListProps) {
  const manageSingle = usePizzaStore((state) => state.manageSingle);
  const customPizza = usePizzaStore((state) => state.customPizza);

  const isSelected = (item: Items) => {
    return customPizza[name]?.id === item.id;
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {options?.map((item) => (
        <Card
          key={item.id}
          className={`relative cursor-pointer border transition-all hover:shadow-lg ${
            isSelected(item) && "bg-primary-foreground"
          }`}
          onClick={() => {
            manageSingle(name, item);
          }}
        >
          {isSelected(item) ? (
            <CheckCheckIcon
              className="absolute top-4 right-4 text-primary"
              size={36}
            />
          ) : (
            <></>
          )}
          <CardContent className="flex flex-col items-center gap-2 p-3">
            <div className="relative w-44 aspect-square rounded-md overflow-hidden filter drop-shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              ${item.price.toFixed(2)}
            </p>
            <p className="font-medium text-center">{item.name}</p>

            <Button size="icon">
              {isSelected(item) ? (
                <Minus className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

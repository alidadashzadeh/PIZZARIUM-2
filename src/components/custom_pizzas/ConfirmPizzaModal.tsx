"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePizzaStore } from "@/store/usePizzaStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CustomPizzaType } from "@/types/pizzaType";
import { H4, Large } from "../ui/Typography";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type ConfirmPizzaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ConfirmPizzaModal({
  open,
  onOpenChange,
}: ConfirmPizzaModalProps) {
  const customPizza = usePizzaStore((s) => s.customPizza);
  const selectSize = usePizzaStore((state) => state.selectSize);
  const increaseQuantity = usePizzaStore((state) => state.increaseQuantity);
  const decreaseQuantity = usePizzaStore((state) => state.decreaseQuantity);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm your pizza</DialogTitle>
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
        </DialogHeader>

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
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={customPizza?.size}
            onValueChange={(value) => {
              if (!value) return;
              selectSize(value as CustomPizzaType["size"]);
            }}
          >
            <ToggleGroupItem value="small" className="p-4 cursor-pointer">
              Small - ${customPizza?.price?.small}
            </ToggleGroupItem>
            <ToggleGroupItem value="medium" className="p-4 cursor-pointer">
              Medium - ${customPizza?.price?.medium}
            </ToggleGroupItem>
            <ToggleGroupItem value="large" className="p-4 cursor-pointer">
              Large - ${customPizza?.price?.large}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div>
          <H4>Quantity</H4>
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={decreaseQuantity}
            >
              -
            </Button>
            <span className="w-8 text-center">{customPizza?.quantity}</span>
            <Button
              className="cursor-pointer"
              variant="outline"
              size="icon"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </div>
        </div>
        <Button className="cursor-pointer">
          <Large>
            $
            {(
              (customPizza?.price?.[customPizza?.size] ?? 0) *
              customPizza?.quantity
            ).toFixed(2)}
          </Large>
          - Confirm & Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  );
}

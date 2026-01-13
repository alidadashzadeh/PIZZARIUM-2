"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePizzaStore } from "@/store/usePizzaStore";
import { Large } from "../ui/Typography";
import CustomPizzaImage from "./CustomPizzaImage";
import CustomPizzaaRecipe from "./CustomPizzaaRecipe";
import CustomPizzaToppings from "./CustomPizzaToppings";
import CustomPizzaSizeSelector from "./CustomPizzaSizeSelector";
import CustomPizzaQuantity from "./CustomPizzaQuantity";

type ConfirmPizzaModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ConfirmPizzaModal({
  open,
  onOpenChange,
}: ConfirmPizzaModalProps) {
  const customPizza = usePizzaStore((s) => s.customPizza);

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

        <div className="flex items-center gap-2">
          <CustomPizzaQuantity />
        </div>

        <Button className="cursor-pointer">
          <Large>
            $
            {(
              (customPizza?.price?.[customPizza?.size] ?? 0) *
              customPizza?.quantity
            ).toFixed(2)}
            - Add to Cart
          </Large>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePizzaStore } from "@/store/usePizzaStore";

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
        </DialogHeader>

        <p>Dough: {customPizza.dough?.name}</p>
        <p>Size: {customPizza.size}</p>
        <p>Qty: {customPizza.quantity}</p>

        <Button>Confirm & Add to Cart</Button>
      </DialogContent>
    </Dialog>
  );
}

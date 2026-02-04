import { usePizzaStore } from "@/store/usePizzaStore";
import { H4 } from "../ui/Typography";
import { Button } from "../ui/button";

export default function CustomPizzaQuantity() {
  const increaseQuantity = usePizzaStore((state) => state.increaseQuantity);
  const decreaseQuantity = usePizzaStore((state) => state.decreaseQuantity);
  const quantity = usePizzaStore((state) => state?.customPizza?.quantity);

  return (
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
        <span className="w-8 text-center">{quantity}</span>
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
  );
}

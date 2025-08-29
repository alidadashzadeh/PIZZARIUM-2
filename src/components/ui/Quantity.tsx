import { Button } from "./button";

interface QuantityProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function Quantity({ quantity, setQuantity }: QuantityProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
      >
        -
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        +
      </Button>
    </div>
  );
}

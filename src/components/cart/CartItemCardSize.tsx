import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CartItemCardProps } from "./CartItemCard";
import { useCartStore } from "@/store/useCartStore";

export default function CartItemCardSize({ item }: CartItemCardProps) {
  const changeSize = useCartStore((s) => s.changeSize);

  return (
    <div className="flex items-center gap-1">
      <span className="w-8">Size</span>
      <ToggleGroup
        type="single"
        variant="outline"
        value={item.size}
        onValueChange={(value) => {
          if (!value) return;
          changeSize(item.cartItemId, value as "small" | "medium" | "large");
        }}
      >
        <ToggleGroupItem value="small" className="p-4 cursor-pointer">
          S
        </ToggleGroupItem>
        <ToggleGroupItem value="medium" className="p-4 cursor-pointer">
          M
        </ToggleGroupItem>
        <ToggleGroupItem value="large" className="p-4 cursor-pointer">
          L
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

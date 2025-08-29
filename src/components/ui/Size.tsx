import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SizeProps {
  pizza: {
    prices: {
      small: number;
      medium: number;
      large: number;
    };
  } | null;
  size: "small" | "medium" | "large";
  setSize: React.Dispatch<React.SetStateAction<"small" | "medium" | "large">>;
}

export default function Size({ pizza, size, setSize }: SizeProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={size}
      onValueChange={(val) => {
        if (val) setSize(val as "small" | "medium" | "large");
      }}
    >
      <ToggleGroupItem value="small" className="p-4">
        Small for ${pizza?.prices.small ?? "-"}
      </ToggleGroupItem>
      <ToggleGroupItem value="medium" className="p-4">
        Medium for ${pizza?.prices.medium ?? "-"}
      </ToggleGroupItem>
      <ToggleGroupItem value="large" className="p-4">
        Large for ${pizza?.prices.large ?? "-"}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

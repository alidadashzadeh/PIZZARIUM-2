import Image from "next/image";
import React from "react";
import { H3, H4, Large, P } from "../ui/Typography";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "../ui/button";

export default function CustomPizzaSummary() {
  return (
    <div>
      <H3>Symmary</H3>
      <div className="relative aspect-square m-auto">
        <div>
          <Image
            src="/base-pizza.png"
            alt="pizza-base"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <H4>Your Recipe</H4>
      <div className="">
        <P>Regular Dough</P>
        <P>no cheese </P>
        <P> Tomato Sauce</P>
        <P> Regular Crust</P>
        <P> Regular Cook</P>
      </div>
      <H4>Toppings</H4>
      <div>Mushroom, dried fish, pineapple</div>

      <H4>Size</H4>
      <div>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="small" className="p-4">
            Small for $11
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" className="p-4">
            Medium for $12
          </ToggleGroupItem>
          <ToggleGroupItem value="large" className="p-4">
            Large for $13
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

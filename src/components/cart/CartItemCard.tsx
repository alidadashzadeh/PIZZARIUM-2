import { CartItem } from "@/types/pizzaType";

import React from "react";
import CartItemCardQuantity from "./CartItemCardQuantity";
import CartItemCardImage from "./CartItemCardImage";
import CartItemCardRemoveBtn from "./CartItemCardRemoveBtn";
import CartItemCardSize from "./CartItemCardSize";

export interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0 ">
      <CartItemCardImage item={item} />

      <div className="flex flex-col gap-2">
        <h4 className="font-medium leading-tight">{item.name}</h4>
        <span className="font-semibold">${item.lineTotal.toFixed(2)}</span>
        <CartItemCardQuantity item={item} />
        {item.size && <CartItemCardSize item={item} />}
      </div>
      {/* <div className="flex flex-1 flex-col gap-1">
          <div className="flex justify-between">
            <h4 className="font-medium leading-tight">{item.name}</h4>
          </div>

          <div className="text-sm text-muted-foreground flex flex-wrap gap-2">
            {item.size && <span className="capitalize">Size: {item.size}</span>}
            <span>${item.price.toFixed(2)} each</span>
          </div>
        </div> */}

      <CartItemCardRemoveBtn item={item} />
    </div>
  );
}

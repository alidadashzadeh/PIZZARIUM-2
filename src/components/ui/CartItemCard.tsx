import { CartItem } from "@/types/pizzaType";
import Image from "next/image";
import React from "react";

interface CartItemCardProps {
  item: CartItem;
}
export default function CartItemCard({ item }: CartItemCardProps) {
  return (
    <div>
      {item?.image && (
        <Image
          src={item.image}
          alt={item.name}
          width={64} // or whatever size you want
          height={64} // keep aspect ratio
        />
      )}
      {item?.name}
    </div>
  );
}

import Image from "next/image";
import React from "react";
import { getCartItemImage } from "@/lib/utils";
import { CartItemCardProps } from "./CartItemCard";

export default function CartItemCardImage({ item }: CartItemCardProps) {
  return (
    <div className=" relative w-16 h-16">
      <Image
        src={getCartItemImage(item)}
        alt={item.name}
        fill
        className="object-cover"
      />
    </div>
  );
}

"use client";

import { useCartStore } from "@/store/useCartStore";
import React from "react";
import CartItemCard from "./CartItemCard";

export default function CartItemList() {
  const items = useCartStore((s) => s.items);
  return (
    <div>
      {items.map((item) => (
        <CartItemCard key={item?.id} item={item} />
      ))}
    </div>
  );
}

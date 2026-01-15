"use client";

import { SheetTrigger } from "./sheet";
import { Button } from "./button";
import { ShoppingCart } from "lucide-react";

export default function ItemCartSheetTrigger() {
  return (
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="cursor-pointer"
      >
        <ShoppingCart className="h-6 w-6 cursor-pointer" />
      </Button>
    </SheetTrigger>
  );
}

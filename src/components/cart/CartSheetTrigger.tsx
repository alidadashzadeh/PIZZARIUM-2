"use client";

import { SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartSheetTrigger() {
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

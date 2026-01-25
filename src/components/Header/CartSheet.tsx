import { Sheet } from "@/components/ui/sheet";

import CartSheetTrigger from "../cart/CartSheetTrigger";
import CartSheetContent from "../cart/CartSheetContent";

export default function CartSheet() {
  return (
    <Sheet>
      <CartSheetTrigger />
      <CartSheetContent />
    </Sheet>
  );
}

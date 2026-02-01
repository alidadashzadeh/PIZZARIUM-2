import { Sheet } from "@/components/ui/sheet";

import CartSheetTrigger from "./CartSheetTrigger";
import CartSheetContent from "./CartSheetContent";

export default function CartSheet() {
  return (
    <Sheet>
      <CartSheetTrigger />
      <CartSheetContent />
    </Sheet>
  );
}

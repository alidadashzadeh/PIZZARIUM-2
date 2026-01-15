import { Sheet } from "@/components/ui/sheet";
import ItemCartSheetContent from "../ui/ItemCartSheetContent";
import ItemCartSheetTrigger from "../ui/ItemCartSheetTrigger";

export default function ItemCartSheet() {
  return (
    <Sheet>
      <ItemCartSheetTrigger />
      <ItemCartSheetContent />
    </Sheet>
  );
}

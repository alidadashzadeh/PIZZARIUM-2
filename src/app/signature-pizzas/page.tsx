import SignaturePizzaList from "@/components/signature_pizzas/SignaturePizzaList";
import { H1 } from "@/components/ui/Typography";
import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";

function page() {
  return (
    <div className="pt-8 flex flex-col gap-4">
      <H1>Discover Signature Pizzas</H1>
      <SignaturePizzaList />
    </div>
  );
}

export default page;

import SignaturePizzaDetails from "@/components/signature_pizzas/SignaturePizzaDetails";
import { useGetSignaturePizza } from "@/hooks/signature-pizzas/useGetSignaturePizza";

function page() {
  return (
    <div>
      <SignaturePizzaDetails />
    </div>
  );
}

export default page;

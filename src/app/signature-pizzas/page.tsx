import { H2 } from "@/components/ui/Typography";
import SignaturePizzasList from "@/components/signature_pizzas/SignaturePizzasList";
import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";

// ISR: regenerate page every hour if data changes
export const revalidate = 60 * 60; // 1 hour

export default async function Page() {
  // Server-side fetch
  // Optimal because signature pizzas rarely change
  const pizzas = await fetchSignaturePizzas();

  return (
    <div className="flex flex-col gap-4">
      <H2>Discover Signature Pizzas</H2>

      {/* Client component handles: - Sorting ,filtering, etc... - Instant UI
			updates without network requests */}
      <SignaturePizzasList pizzas={pizzas} />
    </div>
  );
}

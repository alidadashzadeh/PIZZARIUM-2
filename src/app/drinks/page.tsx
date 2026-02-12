import DrinkList from "@/components/drinks/DrinkList";
import { H2 } from "@/components/ui/Typography";
import { fetchDrinks } from "@/lib/queries/drinks";

export default async function page() {
  const drinks = await fetchDrinks();

  return (
    <div className="flex flex-col gap-4">
      <H2>drinks</H2>
      <div>
        <DrinkList drinks={drinks} />
      </div>
    </div>
  );
}

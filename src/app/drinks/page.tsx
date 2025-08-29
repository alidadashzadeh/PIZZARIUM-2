import DrinkList from "@/components/drinks/DrinkList";
import { H1 } from "@/components/ui/Typography";

function page() {
  return (
    <div className="pt-8 flex flex-col gap-4">
      <H1>drinks</H1>
      <div>
        <DrinkList />
      </div>
    </div>
  );
}

export default page;

import { Tabs, TabsContent } from "@/components/ui/tabs";
import CustomPizzaTabsTriggers from "./CustomPizzaTabsTriggers";
import MultiChoiceList from "./MultiChoiceList";
import SingleChoiceList from "./SingleChoiceList";
import CustomPizzaSummary from "./CustomPizzaSummary";

type Category = {
  name: string;
  value: string;
  type: "single" | "multi";
};

const categories: Category[] = [
  { name: "Dough", value: "dough", type: "single" },
  { name: "Crust", value: "crust", type: "single" },
  { name: "Sauce", value: "sauce", type: "single" },
  { name: "Cook", value: "cook", type: "single" },
  { name: "Cheese", value: "cheese", type: "single" },
  { name: "Toppings", value: "toppings", type: "multi" },
];

export type Items = {
  id: number;
  name: string;
  image: string;
  price: number;
};
type CustomPizzaClientProps = {
  doughs: Items[];
  cooks: Items[];
  crusts: Items[];
  sauces: Items[];
  cheeses: Items[];
  toppings: Items[];
};

export default function CustomPizzaList({
  doughs,
  cooks,
  crusts,
  sauces,
  cheeses,
  toppings,
}: CustomPizzaClientProps) {
  if (!categories.length) return null;

  const dataMap: Record<string, Items[]> = {
    dough: doughs,
    crust: crusts,
    sauce: sauces,
    cook: cooks,
    cheese: cheeses,
    toppings: toppings,
  };

  return (
    <div className="flex justify-between gap-4 relative">
      <Tabs
        defaultValue={categories[0].value}
        className="flex flex-col gap-4 flex-1"
      >
        <CustomPizzaTabsTriggers categories={categories} />

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            {cat.type === "single" && (
              <SingleChoiceList
                name={cat.value}
                options={dataMap[cat.value]}
                // value={/* single state */}
                // onChange={/* setter */}
              />
            )}

            {cat.type === "multi" && (
              <MultiChoiceList
                name={cat.value}
                options={dataMap[cat.value]}
                // value={/* toppings state */}
                // onChange={/* setter */}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
      <CustomPizzaSummary />
    </div>
  );
}

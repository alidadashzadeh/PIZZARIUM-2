"use client";

import { useGetDrinks } from "@/hooks/drinks/useGetDrinks";
import DrinkCard from "./DrinkCard";

export default function DrinkList() {
  const { data: drinks, isLoading, error } = useGetDrinks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error happened</div>;

  return (
    <div className="grid grid-cols-5 gap-8 ">
      {drinks?.map((drink) => {
        return <DrinkCard key={drink.id} drink={drink} />;
      })}
    </div>
  );
}

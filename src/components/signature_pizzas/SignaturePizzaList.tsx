"use client";

import { useGetSignaturePizzas } from "@/hooks/signature-pizzas/useGetSignaturePizzas";
import SignaturePizzaCard from "./SignaturePizzaCard";
import SignaturePizzaFilters from "./SignaturePizzaFilters";
import { useState } from "react";
import { LoadingPizzaCard } from "../ui/LoadingPizzaCard";

export type Category = "all" | "meat" | "veggie";

export type SortField = "" | "price" | "prep_time" | "nutrition" | "popularity";

export type SortOrder = "" | "asc" | "desc";

export interface FiltersState {
  category: Category;
  sortBy: SortField;
  sortOrder: SortOrder;
}

function SignaturePizzaList() {
  const { data, isLoading, error } = useGetSignaturePizzas();

  const [filters, setFilters] = useState<FiltersState>({
    category: "all",
    sortBy: "",
    sortOrder: "",
  });

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-8 ">
        {Array.from({ length: 10 }).map((_, i) => (
          <LoadingPizzaCard key={i} />
        ))}
      </div>
    );
  if (error) return <div>Error loading pizzas.</div>;
  if (!data) return <div>No pizzas found.</div>;

  let list = [...data];
  if (filters.category !== "all") {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.sortBy != "") {
    list.sort((a, b) => {
      let aVal, bVal;

      switch (filters.sortBy) {
        case "price":
          aVal = a.prices.small;
          bVal = b.prices.small;
          break;
        case "prep_time":
          aVal = a.prep_time_minutes ?? 0;
          bVal = b.prep_time_minutes ?? 0;
          break;
        case "nutrition":
          aVal = a.calorie ?? 0;
          bVal = b.calorie ?? 0;
          break;
        case "popularity":
          aVal = a.avg_rating;
          bVal = b.avg_rating;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === "asc") {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <SignaturePizzaFilters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-4 gap-8  mx-auto">
        {list?.map((pizza) => (
          <SignaturePizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default SignaturePizzaList;

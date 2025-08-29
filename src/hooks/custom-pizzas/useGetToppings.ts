"use client";

import { fetchToppings } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetToppings = () => {
  return useQuery({
    queryKey: ["toppings"],
    queryFn: fetchToppings,
  });
};

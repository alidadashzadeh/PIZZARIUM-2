"use client";

import { fetchSauces } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetSauces = () => {
  return useQuery({
    queryKey: ["sauces"],
    queryFn: fetchSauces,
  });
};

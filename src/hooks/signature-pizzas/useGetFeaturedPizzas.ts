"use client";

// hooks/useSignaturePizzas.ts

import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedPizzas } from "@/lib/queries/signaturePizza";

export const useGetFeaturedPizzas = () => {
  return useQuery({
    queryKey: ["featured_pizzas"],
    queryFn: fetchFeaturedPizzas,
  });
};

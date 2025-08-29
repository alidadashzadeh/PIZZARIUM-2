"use client";

import { fetchCheeses } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetCheeses = () => {
  return useQuery({
    queryKey: ["cheeses"],
    queryFn: fetchCheeses,
  });
};

"use client";

import { fetchCooks } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetCooks = () => {
  return useQuery({
    queryKey: ["cooks"],
    queryFn: fetchCooks,
  });
};

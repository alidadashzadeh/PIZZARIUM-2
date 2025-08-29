"use client";

import { fetchCrusts } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetCrusts = () => {
  return useQuery({
    queryKey: ["crusts"],
    queryFn: fetchCrusts,
  });
};

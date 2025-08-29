"use client";

import { fetchDoughs } from "@/lib/queries/customPizzas";
import { useQuery } from "@tanstack/react-query";

export const useGetDoughs = () => {
  return useQuery({
    queryKey: ["doughs"],
    queryFn: fetchDoughs,
  });
};

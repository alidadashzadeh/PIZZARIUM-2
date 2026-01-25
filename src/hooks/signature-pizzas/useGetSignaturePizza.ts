"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSignaturePizzaDetails } from "@/lib/queries/signaturePizza";

export const useGetSignaturePizzaDetails = (id: string) => {
  return useQuery({
    queryKey: ["signature_pizza_details", id],
    queryFn: () => fetchSignaturePizzaDetails(id),
    enabled: !!id,
  });
};

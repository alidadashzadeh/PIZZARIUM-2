"use client";

// hooks/useSignaturePizzas.ts

import { useQuery } from "@tanstack/react-query";
import { fetchSignaturePizzas } from "@/lib/queries/signaturePizza";

export const useGetSignaturePizzas = () => {
  return useQuery({
    queryKey: ["signature_pizzas"],
    queryFn: fetchSignaturePizzas,
  });
};

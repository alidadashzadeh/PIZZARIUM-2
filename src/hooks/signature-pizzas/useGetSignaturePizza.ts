"use client";

// hooks/useSignaturePizzas.ts

import { useQuery } from "@tanstack/react-query";
import {
  fetchSignaturePizza,
  fetchSignaturePizzas,
} from "@/lib/queries/signaturePizza";

export const useGetSignaturePizza = (id: string) => {
  return useQuery({
    queryKey: ["signature_pizza", id],
    queryFn: () => fetchSignaturePizza(id),
    enabled: !!id,
  });
};

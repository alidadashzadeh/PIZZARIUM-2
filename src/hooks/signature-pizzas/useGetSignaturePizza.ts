"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSignaturePizza } from "@/lib/queries/signaturePizza";

export const useGetSignaturePizza = (id: string) => {
	return useQuery({
		queryKey: ["signature_pizza", id],
		queryFn: () => fetchSignaturePizza(id),
		enabled: !!id,
	});
};

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDrinks } from "@/lib/queries/drinks";

export const useGetDrinks = () => {
	return useQuery({
		queryKey: ["drinks"],
		queryFn: fetchDrinks,
	});
};

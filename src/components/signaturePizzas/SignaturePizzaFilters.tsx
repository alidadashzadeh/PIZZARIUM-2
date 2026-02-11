"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { SignaturePizzaFiltersProps } from "@/types/siganaturPizzaType";

export default function SignaturePizzaFilters({
	filters,
}: SignaturePizzaFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	function updateUrlParam(key: string, value?: string) {
		const params = new URLSearchParams(searchParams);

		if (!value || value === "all") {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		router.replace(`?${params.toString()}`, { scroll: false });
	}

	return (
		<div className="flex gap-2">
			<ToggleGroup
				type="single"
				variant="outline"
				value={filters.category}
				onValueChange={(val) => {
					updateUrlParam("category", val);
				}}
			>
				<ToggleGroupItem value="all" className="px-4">
					All
				</ToggleGroupItem>
				<ToggleGroupItem value="meat" className="px-4">
					Meat
				</ToggleGroupItem>
				<ToggleGroupItem value="veggie" className="px-4">
					Veggie
				</ToggleGroupItem>
			</ToggleGroup>

			<Select
				value={filters?.sortBy}
				onValueChange={(val) => {
					updateUrlParam("sortBy", val);
				}}
			>
				<SelectTrigger className="w-[120px]">
					<SelectValue placeholder="Sort By" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Sort By</SelectLabel>
						<SelectItem value="price">Price</SelectItem>
						<SelectItem value="prep_time">Prep Time</SelectItem>
						<SelectItem value="popularity">Popularity</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select
				value={filters?.sortOrder}
				onValueChange={(val) => {
					updateUrlParam("sortOrder", val);
				}}
			>
				<SelectTrigger className="w-[160px]">
					<SelectValue placeholder="Order" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Order</SelectLabel>
						<SelectItem value="asc">Ascending (low to high)</SelectItem>
						<SelectItem value="desc">Descending (high to low)</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
			<Button
				onClick={() => {
					router.replace("?", { scroll: false });
				}}
				variant="outline"
			>
				Clear All
			</Button>
		</div>
	);
}

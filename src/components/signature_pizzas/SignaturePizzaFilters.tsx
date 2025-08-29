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
import {
  Category,
  FiltersState,
  SortField,
  SortOrder,
} from "./SignaturePizzaList";
import { Button } from "../ui/button";

interface SignaturePizzaFiltersProps {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

export default function SignaturePizzaFilters({
  filters,
  setFilters,
}: SignaturePizzaFiltersProps) {
  return (
    <div className="flex gap-2">
      <ToggleGroup
        type="single"
        variant="outline"
        value={filters.category}
        onValueChange={(val: string) => {
          setFilters((prev) => ({ ...prev, category: val as Category }));
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
          const allowedValues: SortField[] = [
            "price",
            "prep_time",
            "nutrition",
            "popularity",
          ];

          if (allowedValues.includes(val as SortField)) {
            setFilters((prev) => ({
              ...prev,
              sortBy: val as SortField,
            }));
          }
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
            <SelectItem value="nutrition">Nutrition</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={filters?.sortOrder}
        onValueChange={(val) => {
          setFilters((prev) => ({
            ...prev,
            sortOrder: val as SortOrder,
          }));
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Order</SelectLabel>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={() => {
          setFilters({ category: "all", sortBy: "", sortOrder: "" });
        }}
        variant="outline"
      >
        Clear All
      </Button>
    </div>
  );
}

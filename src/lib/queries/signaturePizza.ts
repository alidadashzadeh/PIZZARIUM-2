// lib/queries.ts
import { Pizza } from "@/types/pizza";
import { supabase } from "../supabase";

export const fetchSignaturePizzas = async () => {
  const { data, error } = await supabase.from("signature_pizzas").select("*");

  if (error) throw error;
  return data as Pizza[];
};

export const fetchFeaturedPizzas = async () => {
  const { data, error } = await supabase
    .from("signature_pizzas")
    .select("*")
    .eq("is_featured", true);

  if (error) throw error;
  return data;
};

export async function fetchSignaturePizza(id: string) {
  const { data, error } = await supabase
    .from("pizza_with_last_two_reviews")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

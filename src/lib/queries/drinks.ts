// lib/queries.ts
import { supabase } from "../supabase";

export const fetchDrinks = async () => {
  const { data, error } = await supabase
    .from("drinks")
    .select("*")
    .eq("is_available", true);

  if (error) throw error;
  return data;
};

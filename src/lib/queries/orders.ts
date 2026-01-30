import { supabase } from "../supabase";

export type CartItem = {
  id: string;
  name: string;
  size?: string;
  quantity: number;
  price: number;
  toppings?: string[];
};

export type OrderInsert = {
  user_id?: string;
  items: CartItem[];
  total: number;
  notes?: string;
  stripe_session_id?: string;
};

export async function insertOrder(order: OrderInsert) {
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select()
    .single();

  if (error) {
    console.error("Supabase Insert Order Error:", error.message);
    throw error;
  }

  return data;
}

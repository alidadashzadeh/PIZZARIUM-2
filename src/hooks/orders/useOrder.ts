import { useState } from "react";
import { insertOrder, OrderInsert } from "@/lib/queries/orders";

export function useOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (order: OrderInsert) => {
    setLoading(true);
    setError(null);

    try {
      const data = await insertOrder(order);
      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to create order");
      setLoading(false);
      return null;
    }
  };

  return { createOrder, loading, error };
}

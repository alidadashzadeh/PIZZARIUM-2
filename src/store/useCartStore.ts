import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { CartItem } from "@/types/pizzaType";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];

  /** ---------- Actions ---------- */
  addItem: (
    item: Omit<CartItem, "cartItemId" | "lineTotal" | "addedAt">
  ) => void;
  updateQty: (cartItemId: string, qty: number) => void;
  removeItem: (cartItemId: string) => void;
  updateNotes: (cartItemId: string, notes: string) => void;
  clearCart: () => void;

  /** ---------- Derived ---------- */
  //   totalQty: () => number;
  //   subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // actions
      addItem: (item) =>
        set((state) => {
          // default quantity to 1 if missing
          const quantity = item.quantity ?? 1;

          const existingItem = state.items.some(
            (i) => i.id === item.id
            // (i) => i.refId === item.refId && i.type === item.type
          );

          if (existingItem) {
            toast.error(`${item.name} is already in the cart!`);
            return state;
          }

          const newItem: CartItem = {
            ...item,
            cartItemId: nanoid(),
            quantity,
            lineTotal: item.price * quantity,
            addedAt: Date.now(),
          };

          //   console.log(newItem);
          return { items: [...state.items, newItem] };
        }),

      /* ---------- Derived ---------- */
      //   totalQty: () => get().items.reduce((sum, item) => sum + item.qty, 0),

      //   subtotal: () =>
      //     get().items.reduce((sum, item) => sum + item.lineTotal, 0),

      updateQty: (cartItemId, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  qty: Math.max(1, qty),
                  lineTotal: item.unitPrice * Math.max(1, qty),
                }
              : item
          ),
        })),

      updateNotes: (cartItemId, notes) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, notes } : item
          ),
        })),

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
    }
  )
);

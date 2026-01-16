import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { CartItem } from "@/types/pizzaType";
import { toast } from "sonner";

interface CartState {
  items: CartItem[];

  // actions
  addItem: (
    item: Omit<CartItem, "cartItemId" | "lineTotal" | "addedAt">
  ) => void;
  removeItem: (cartItemId: string) => void;

  increaseCartItemQty: (cartItemId: string) => void;
  decreaseCartItemQty: (cartItemId: string) => void;
  changeSize: (
    cartItemId: string,
    newSize: "small" | "medium" | "large"
  ) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // actions
      addItem: (item) =>
        set((state) => {
          const quantity = item.quantity ?? 1;

          const existingItem = state.items.some((i) => {
            // custom items are always unique
            if (item.type === "custom") return false;

            // drinks & signature pizzas have id
            return i.id === item.id && i.type === item.type;
          });

          if (existingItem) {
            toast.error(`${item.name} is already in the cart!`);
            return state;
          }

          let lineTotal = 0;

          if (item.size && typeof item.price === "object") {
            // pizza
            lineTotal = item.price[item.size] * quantity;
          } else {
            // drink
            lineTotal = item.price * quantity;
          }
          const newItem: CartItem = {
            ...item,
            cartItemId: nanoid(),
            quantity,
            lineTotal,
            addedAt: Date.now(),
          };

          return { items: [...state.items, newItem] };
        }),

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),

      increaseCartItemQty: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.cartItemId !== cartItemId) return item;

            const newQty = (item.quantity ?? 1) + 1;

            let newLineTotal;
            if (item.size && typeof item.price === "object") {
              // pizza
              newLineTotal = item.price[item.size] * newQty;
            } else {
              // drink
              newLineTotal = item.price * newQty;
            }
            return {
              ...item,
              quantity: newQty,
              lineTotal: newLineTotal,
            };
          }),
        })),

      decreaseCartItemQty: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.cartItemId !== cartItemId) return item;

            const newQty = Math.max(1, (item.quantity ?? 1) - 1);
            let newLineTotal;
            if (item.size && typeof item.price === "object") {
              // pizza
              newLineTotal = item.price[item.size] * newQty;
            } else {
              // drink
              newLineTotal = item.price * newQty;
            }
            return {
              ...item,
              quantity: newQty,
              lineTotal: newLineTotal,
              // lineTotal: item.price * newQty,
            };
          }),
        })),

      changeSize: (cartItemId, newSize) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.cartItemId !== cartItemId) return item;
            if (item.type === "drink") return item;
            if (item.size === newSize) return item;

            let newLineTotal = item.lineTotal;
            if (item.size && typeof item.price === "object") {
              // pizza
              newLineTotal = item.price[newSize] * item.quantity;
            }

            return {
              ...item,
              size: newSize,
              lineTotal: newLineTotal,
            };
          }),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-store",
    }
  )
);

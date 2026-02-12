import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { CartItem } from "@/types/CartType";
import { toast } from "sonner";
import { sortCartItems, updateCartState } from "@/lib/utils";

interface CartState {
	items: CartItem[];
	pendingOrderId: string | null;
	total: number;
	// actions
	setPendingOrderId: (id: string) => void;
	clearPendingOrderId: () => void;
	addItem: (
		item: Omit<CartItem, "cartItemId" | "lineTotal" | "addedAt">,
	) => boolean;
	removeItem: (cartItemId: string) => void;
	increaseCartItemQty: (cartItemId: string) => void;
	decreaseCartItemQty: (cartItemId: string) => void;
	changeSize: (
		cartItemId: string,
		newSize: "small" | "medium" | "large",
	) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			pendingOrderId: null,
			total: 0,

			// actions
			setPendingOrderId: (id) =>
				set(() => ({
					pendingOrderId: id,
				})),

			clearPendingOrderId: () =>
				set(() => ({
					pendingOrderId: null,
				})),

			addItem: (item): boolean => {
				const quantity = item.quantity ?? 1;

				const existingItem = get().items.some((i) => {
					// custom items are always unique
					if (item.type === "custom") return false;

					// drinks & signature pizzas have id
					return i.id === item.id && i.type === item.type;
				});

				if (existingItem) {
					toast.error(`${item.name} is already in the cart!`);
					return false;
				}

				let lineTotal = 0;

				if (item.size && typeof item.price === "object") {
					// pizza
					lineTotal = item.price[item.size] * quantity;
				} else if (typeof item.price === "number") {
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

				toast.success(`${item.name} successfully added to cart.`);

				set((state) => {
					const updatedItems = sortCartItems([...state.items, newItem]);
					return updateCartState(updatedItems as CartItem[]);
				});

				return true;
			},

			removeItem: (cartItemId) =>
				set((state) => {
					const updatedItems = state.items.filter(
						(item) => item.cartItemId !== cartItemId,
					);

					return updateCartState(updatedItems);
				}),

			increaseCartItemQty: (cartItemId) =>
				set((state) => {
					const updatedItems = state.items.map((item) => {
						if (item.cartItemId !== cartItemId) return item;

						const newQty = item.quantity + 1;

						const newLineTotal =
							typeof item.price === "object"
								? item.price[item.size!] * newQty
								: item.price * newQty;

						return {
							...item,
							quantity: newQty,
							lineTotal: Number(newLineTotal.toFixed(2)),
						};
					});

					return updateCartState(updatedItems);
				}),

			decreaseCartItemQty: (cartItemId) =>
				set((state) => {
					const updatedItems = state.items.map((item) => {
						if (item.cartItemId !== cartItemId) return item;

						const newQty = Math.max(1, item.quantity - 1);

						const newLineTotal =
							typeof item.price === "object"
								? item.price[item.size!] * newQty
								: item.price * newQty;

						return {
							...item,
							quantity: newQty,
							lineTotal: Number(newLineTotal.toFixed(2)),
						};
					});

					return updateCartState(updatedItems);
				}),

			changeSize: (cartItemId, newSize) =>
				set((state) => {
					const updatedItems = state.items.map((item) => {
						if (item.cartItemId !== cartItemId) return item;
						if (item.type === "drink") return item;

						const newLineTotal =
							typeof item.price === "object"
								? item.price[newSize] * item.quantity
								: item.lineTotal;

						return {
							...item,
							size: newSize,
							lineTotal: Number(newLineTotal.toFixed(2)),
						};
					});

					return updateCartState(updatedItems);
				}),

			clearCart: () => set(updateCartState([])),
		}),
		{
			name: "cart-store",
		},
	),
);

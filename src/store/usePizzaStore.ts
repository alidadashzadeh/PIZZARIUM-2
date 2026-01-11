import {
  CartItem,
  CustomPizzaOption,
  CustomPizzaToppingOption,
  CustomPizzaType,
} from "@/types/pizzaType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MultiSelectKeys = {
  [K in keyof CustomPizzaType]: CustomPizzaType[K] extends any[] ? K : never;
}[keyof CustomPizzaType];

type PizzaStore = {
  customPizza: CustomPizzaType;
  cartItems: CartItem[];

  // actions

  resetCustomPizza: () => void;

  manageSingle: (category: string, value: CustomPizzaOption) => void;
  manageMulti: (
    category: MultiSelectKeys,
    value: CustomPizzaToppingOption
  ) => void;
  selectSize: (size: CustomPizzaType["size"]) => void;
  setPrice: (price: number) => void;
};
export const usePizzaStore = create<PizzaStore>()(
  persist(
    (set) => ({
      // STATE
      customPizza: {
        size: "small",
        dough: { name: "regular", id: 2, price: 0 },
        crust: { name: "regular", id: 1, price: 0 },
        cheese: { name: "Dairy Free", id: 1, price: 0.99 },
        sauce: { name: "creamy garlic", id: 4, price: 0.99 },
        cook: { name: "regular", id: 2, price: 0 },
        toppings: [],
        price: null,
      },

      cartItems: [],

      // ACTIONS
      manageSingle: (category, value) =>
        set((state) => ({
          customPizza: {
            ...state.customPizza,
            [category]: {
              id: value.id,
              name: value.name,
              price: value.price,
            },
          },
        })),

      manageMulti: (category, item) =>
        set((state) => {
          const array = state.customPizza[category];

          const cleanItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            image_raw: item.image_raw,
          };
          const exists = array.some((i) => i.id === item.id);

          return {
            customPizza: {
              ...state.customPizza,
              [category]: exists
                ? array.filter((i) => i.id !== item.id) // remove
                : [...array, cleanItem], // add
            },
          };
        }),

      selectSize: (size) =>
        set((state) => ({
          customPizza: {
            ...state.customPizza,
            size,
          },
        })),

      setPrice: (basePrice) =>
        set((state) => {
          const small = Number(basePrice.toFixed(2));
          const medium = Number((basePrice * 1.2).toFixed(2));
          const large = Number((basePrice * 1.3).toFixed(2));

          return {
            customPizza: {
              ...state.customPizza,
              price: {
                small,
                medium,
                large,
              },
            },
          };
        }),

      resetCustomPizza: () =>
        set({
          customPizza: {
            size: "small",
            dough: { name: "regular", id: 2, price: 0 },
            crust: { name: "regular", id: 1, price: 0 },
            cheese: { name: "Dairy Free", id: 1, price: 0.99 },
            sauce: { name: "creamy garlic", id: 4, price: 0.99 },
            cook: { name: "regular", id: 2, price: 0 },
            toppings: [],
            price: null,
          },
        }),
    }),
    {
      name: "pizza-store", // localStorage key
    }
  )
);

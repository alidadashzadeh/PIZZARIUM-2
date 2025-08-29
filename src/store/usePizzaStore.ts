import { create } from "zustand";

type CartItem = {
  id: string; // unique id for this cart item
  type: "signature" | "custom" | "drink";
  name: string;
  size: string;
  toppings: string[];
  price: number;
};

type CustomPizzaState = {
  size: string | null;
  crust: string | null;
  toppings: string[];
  price: number;
};

type SignaturePizzaState = {
  signatureId: string | null;
  size: string | null;
  extraToppings: string[];
  price: number;
};

type PizzaStore = {
  cart: CartItem[];

  customPizza: CustomPizzaState;
  signaturePizza: SignaturePizzaState;
};

export const usePizzaStore = create<PizzaStore>(() => ({
  cart: [],

  customPizza: {
    size: null,
    crust: null,
    toppings: [],
    price: 0,
  },

  signaturePizza: {
    signatureId: null,
    size: null,
    extraToppings: [],
    price: 0,
  },
}));

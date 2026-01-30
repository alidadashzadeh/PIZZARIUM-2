import { create } from "zustand";

export type ShippingInfo = {
  address: string;
  phone_number: string;
};

export type CheckoutStore = {
  shipping: ShippingInfo;
  setShipping: (data: Partial<ShippingInfo>) => void;
  clearShipping: () => void;
};

export const useDeliveryStore = create<CheckoutStore>((set) => ({
  shipping: {
    address: "",
    phone_number: "",
  },

  setShipping: (data: Partial<ShippingInfo>) =>
    set((state) => ({
      shipping: { ...state.shipping, ...data },
    })),

  clearShipping: () =>
    set({
      shipping: { address: "", phone_number: "" },
    }),
}));

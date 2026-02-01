import { create } from "zustand";

export type DeliveryInfo = {
  address: string;
  phone_number: string;
};

export type CheckoutStore = {
  shipping: DeliveryInfo;
  setShipping: (data: Partial<DeliveryInfo>) => void;
  clearShipping: () => void;
};

export const useDeliveryStore = create<CheckoutStore>((set) => ({
  shipping: {
    address: "",
    phone_number: "",
  },

  setShipping: (data: Partial<DeliveryInfo>) =>
    set((state) => ({
      shipping: { ...state.shipping, ...data },
    })),

  clearShipping: () =>
    set({
      shipping: { address: "", phone_number: "" },
    }),
}));

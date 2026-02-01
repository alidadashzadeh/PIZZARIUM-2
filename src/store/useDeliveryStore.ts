import { create } from "zustand";

export type DeliveryInfo = {
  address: string;
  phone_number: string;
};

export type CheckoutStore = {
  delivery: DeliveryInfo;
  setShipping: (data: Partial<DeliveryInfo>) => void;
  clearShipping: () => void;
};

export const useDeliveryStore = create<CheckoutStore>((set) => ({
  delivery: {
    address: "",
    phone_number: "",
  },

  setShipping: (data: Partial<DeliveryInfo>) =>
    set((state) => ({
      delivery: { ...state.delivery, ...data },
    })),

  clearShipping: () =>
    set({
      delivery: { address: "", phone_number: "" },
    }),
}));

// import { create } from "zustand";

// export type DeliveryInfo = {
//   address: string;
//   phone_number: string;
// };

// export type CheckoutStore = {
//   delivery: DeliveryInfo;
//   setShipping: (data: Partial<DeliveryInfo>) => void;
//   clearShipping: () => void;
// };

// export const useDeliveryStore = create<CheckoutStore>((set) => ({
//   delivery: {
//     address: "",
//     phone_number: "",
//   },

//   setShipping: (data: Partial<DeliveryInfo>) =>
//     set((state) => ({
//       delivery: { ...state.delivery, ...data },
//     })),

//   clearShipping: () =>
//     set({
//       delivery: { address: "", phone_number: "" },
//     }),
// }));
import { create } from "zustand";

export type DeliveryInfo = {
  full_name: string;
  address: string;
  phone_number: string;
  delivery_instructions?: string;
};

export type CheckoutStore = {
  delivery: DeliveryInfo;
  setShipping: (data: Partial<DeliveryInfo>) => void;
  clearShipping: () => void;
};

export const useDeliveryStore = create<CheckoutStore>((set) => ({
  delivery: {
    full_name: "",
    address: "",
    phone_number: "",
    delivery_instructions: "",
  },

  setShipping: (data: Partial<DeliveryInfo>) =>
    set((state) => ({
      delivery: { ...state.delivery, ...data },
    })),

  clearShipping: () =>
    set({
      delivery: {
        full_name: "",
        address: "",
        phone_number: "",
        delivery_instructions: "",
      },
    }),
}));

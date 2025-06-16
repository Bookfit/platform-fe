import { create } from "zustand";

interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));

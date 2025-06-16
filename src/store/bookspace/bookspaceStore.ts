// bookspace address 저장
import { create } from "zustand";

interface AddressState {
  address: string;
  setAddress: (address: string) => void;
}

export const useBookSpaceStore = create<AddressState>((set) => ({
  address: "",
  setAddress: (address) => set({ address }),
}));

import { create } from "zustand";

interface NaverMarkerState {
  lat: number;
  lng: number;
  setMarker: (lat: number, lng: number) => void;
}

export const useNaverMapStore = create<NaverMarkerState>((set) => ({
  lat: 0,
  lng: 0,
  setMarker: (lat, lng) => set({ lat, lng }),
}));

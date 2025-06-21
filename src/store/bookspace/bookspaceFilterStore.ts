import { create } from 'zustand';

interface BookspaceFilterState {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  resetFilter: () => void;
}

export const useBookspaceFilterStore = create<BookspaceFilterState>((set) => ({
  selectedFilter: 'all',
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  resetFilter: () => set({ selectedFilter: 'all' }),
}));

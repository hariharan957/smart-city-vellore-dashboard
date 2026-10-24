import { create } from 'zustand';

export type RouteCategory = 'all' | 'chennai' | 'bangalore' | 'local';

interface TransportFilterState {
  category: RouteCategory;
  searchQuery: string;
  setCategory: (category: RouteCategory) => void;
  setSearchQuery: (query: string) => void;
  resetFilter: () => void;
}

export const useTransportFilterStore = create<TransportFilterState>((set) => ({
  category: 'all',
  searchQuery: '',
  setCategory: (category) => set({ category }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilter: () => set({ category: 'all', searchQuery: '' }),
}));

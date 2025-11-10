import { create } from 'zustand';

/**
 * Search Store - Manages search and filter states
 * - Search queries
 * - Category filters
 * - Package filters
 */
const useSearchStore = create((set) => ({
  // Search query state
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: '' }),

  // Package page search terms
  uaeSearchTerm: '',
  baliSearchTerm: '',
  thailandSearchTerm: '',
  singaporeSearchTerm: '',
  
  setUAESearchTerm: (term) => set({ uaeSearchTerm: term }),
  setBaliSearchTerm: (term) => set({ baliSearchTerm: term }),
  setThailandSearchTerm: (term) => set({ thailandSearchTerm: term }),
  setSingaporeSearchTerm: (term) => set({ singaporeSearchTerm: term }),

  // Blog filters
  blogQuery: '',
  blogCategory: 'All',
  setBlogQuery: (query) => set({ blogQuery: query }),
  setBlogCategory: (category) => set({ blogCategory: category }),

  // Hotels filters
  hotelSearchTerm: '',
  setHotelSearchTerm: (term) => set({ hotelSearchTerm: term }),

  // Reset all search states
  resetSearchState: () => set({
    searchQuery: '',
    uaeSearchTerm: '',
    baliSearchTerm: '',
    thailandSearchTerm: '',
    singaporeSearchTerm: '',
    blogQuery: '',
    blogCategory: 'All',
    hotelSearchTerm: '',
  }),
}));

export default useSearchStore;

import { create } from 'zustand';

/**
 * Booking Store - Manages booking-related states
 * - Traveler counts (adults, children, infants)
 * - Form submission state
 */
const useBookingStore = create((set, get) => ({
  // Traveler counts
  adult: 2,
  child: 0,
  infant: 0,

  // Increment/decrement actions
  incrementAdult: () => set((state) => ({ adult: state.adult + 1 })),
  decrementAdult: () => set((state) => ({ adult: Math.max(1, state.adult - 1) })),
  
  incrementChild: () => set((state) => ({ child: state.child + 1 })),
  decrementChild: () => set((state) => ({ child: Math.max(0, state.child - 1) })),
  
  incrementInfant: () => set((state) => ({ infant: state.infant + 1 })),
  decrementInfant: () => set((state) => ({ infant: Math.max(0, state.infant - 1) })),

  // Direct setters
  setAdult: (count) => set({ adult: Math.max(1, count) }),
  setChild: (count) => set({ child: Math.max(0, count) }),
  setInfant: (count) => set({ infant: Math.max(0, count) }),

  // Get total travelers
  getTotalTravelers: () => {
    const state = get();
    return state.adult + state.child + state.infant;
  },

  // Submission state
  isSubmitting: false,
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  // Reset to defaults
  resetBooking: () => set({
    adult: 2,
    child: 0,
    infant: 0,
    isSubmitting: false,
  }),
}));

export default useBookingStore;

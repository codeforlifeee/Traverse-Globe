import { create } from 'zustand';

/**
 * UI Store - Manages all UI-related states
 * - Mobile menu state
 * - Modal states
 * - Active sections
 * - Back to top button visibility
 */
const useUIStore = create((set) => ({
  // Mobile menu state
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),

  // Booking modal state
  isBookingModalOpen: false,
  bookingModalPackage: '',
  openBookingModal: (packageName) => set({ 
    isBookingModalOpen: true, 
    bookingModalPackage: packageName 
  }),
  closeBookingModal: () => set({ 
    isBookingModalOpen: false, 
    bookingModalPackage: '' 
  }),

  // Active section for package details navigation
  activeSection: 'overview',
  setActiveSection: (section) => set({ activeSection: section }),

  // Back to top button visibility
  showBackToTop: false,
  setShowBackToTop: (show) => set({ showBackToTop: show }),

  // Active image for gallery
  activeImage: '',
  setActiveImage: (image) => set({ activeImage: image }),

  // Reset all UI states
  resetUIState: () => set({
    isMobileMenuOpen: false,
    isBookingModalOpen: false,
    bookingModalPackage: '',
    activeSection: 'overview',
    showBackToTop: false,
    activeImage: '',
  }),
}));

export default useUIStore;

// Company contact details, addresses and social links.
// Deliberately its own module: ~15 components need only this object, and importing it
// from a bulk-data file would pull that file into the initial bundle.

export const companyInfo = {
  name: "Traverse Globe",
  tagline: "Travel the world, the right way",
  description: "Your trusted travel partner for unforgettable journeys across the world. We specialize in creating unique travel experiences that you'll cherish forever.",
  email: {
    primary: "mail@traverseglobe.com",
    info: "info@traverseglobe.com",
    holidays: "holidays@traverseglobe.com",
    marketing: "marketing@traverseglobe.com",
    care: "care@traverseglobe.com",
    sponsorship: "sponsorship@traverseglobe.com"
  },
  phone: {
    primary: "+91 9997085457",
    whatsapp: "919997085457",
    noida: "+91 9520232324"
  },
  address: {
    karnal: {
      full: "352, Diwan Colony, near Virk Hospital, Urban Estate, Sector 13, Karnal, Haryana 132001",
      city: "Karnal, Haryana",
      mapLink: "https://maps.app.goo.gl/oPShVDMztyVRTR42F"
    },
    noida: {
      full: "H - 173, Sector -63 Noida Uttar Pradesh, Near Noida Electronic City metro station - 201301",
      city: "Noida"
    },
    dubai: {
      corporate: "Traverse Globe Middleeast DMCC, 1103, Fortune tower Cluster C, JLT, Dubai, UAE",
      branch: "42-02 Opal Tower, Business Bay, Near: Burj Khalifa, Dubai, UAE"
    }
  },
  social: {
    facebook: "https://www.facebook.com/traverseglob",
    instagram: "https://www.instagram.com/traverse.glob",
    linkedin: "https://www.linkedin.com/company/traverse-globe"
  },
  website: "https://traverseglobe.com/"
};

// Static site config.
//
// Sanity CMS is the source of truth for all content: packages, hotels, destinations,
// banners, blog posts, testimonials and platform ratings (see src/services/sanityClient.js
// and src/hooks/queries.js). What remains here is presentational config that has no
// editorial value - landing-page copy for the destination tiles, the "why choose us"
// feature list and the two hotel category cards.
//
// Do NOT add content or bulk data to this module. It is reachable from eagerly-imported
// components, so anything here ships in the initial bundle.

import { hotelListings } from "./hotelListings.js";
export { hotelListings };

export const internationalDestinations = [
  {
    "title": "UAE",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/uae"
  },
  {
    "title": "Bali",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/bali"
  },
  {
    "title": "Thailand",
    "image": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/thailand"
  },
  {
    "title": "Singapore",
    "image": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/singapore"
  },
  {
    "title": "Sri Lanka",
    "image": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/srilanka"
  },
  {
    "title": "Vietnam",
    "image": "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/vietnam"
  },
  {
    "title": "Laos",
    "image": "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/international/laos"
  }
];

export const domesticDestinations = [
  {
    "title": "Andaman",
    "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/domestic/andaman"
  },
  {
    "title": "Jaipur",
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/domestic/jaipur"
  },
  {
    "title": "Kerala",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/domestic/kerala"
  },
  {
    "title": "Kashmir",
    "image": "https://images.unsplash.com/photo-1605649487212-47b9f5c1e813?auto=format&fit=crop&w=400&q=35&fm=webp",
    "link": "/destinations/domestic/kashmir"
  }
];

// Company Features
export const companyFeatures = [
  {
    icon: "fa-solid fa-passport",
    title: "Personalized Itinerary",
    description: "Tailored travel plans crafted to match your unique preferences and desires."
  },
  {
    icon: "fa-solid fa-hotel",
    title: "Luxury Stays, Unluxury Prices",
    description: "Experience premium accommodations without the premium price tag."
  },
  {
    icon: "fa-solid fa-car",
    title: "Ride Easy",
    description: "Comfortable and reliable transportation throughout your journey."
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Trusted Local Expertise",
    description: "Benefit from insider knowledge and authentic local experiences."
  },
  {
    icon: "fa-solid fa-medal",
    title: "100% In-House Service",
    description: "End-to-end service managed by our dedicated team for seamless travel."
  }
];

// Backward compatibility alias
export const services = companyFeatures;

// Hotel listings
export const hotelCategories = [
  {
    slug: "domestic",
    title: "Domestic Hotels",
    blurb: "Discover comfortable stays across India",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    link: "/hotels/domestic"
  },
  {
    slug: "international",
    title: "International Hotels",
    blurb: "Experience luxury accommodations worldwide",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
    link: "/hotels/international"
  }
];

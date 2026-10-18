import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Phone,
  Clock,
  Sparkles,
  CheckCircle,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Filter,
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import Kicker from '../components/revamp/Kicker';
import SectionRule from '../components/revamp/SectionRule';
import ImageWithFallback from '../components/revamp/ImageWithFallback';

const ALL_ACTIVITIES = [
  {
    id: 'desert-safari',
    slug: 'desert-safari',
    category: 'desert',
    categoryName: 'Desert Adventure',
    title: 'Premium Evening Desert Safari with Dune Bashing & BBQ Dinner',
    location: 'Dubai, UAE',
    duration: '6 Hours',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 142,
    price: 2499,
    originalPrice: 3800,
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80',
    description: 'Experience the adrenaline of high red dune bashing in a 4x4 Land Cruiser, camel rides, sandboarding, Henna tattooing, Tanoura dance show, and a lavish 5-star BBQ buffet under the starry Arabian desert.',
    highlights: ['4x4 Land Cruiser Dune Bashing', 'Sunset Photo Stop on Dunes', 'Camel Ride & Sandboarding', 'Lavish BBQ Buffet Dinner', 'Live Tanoura & Belly Dance'],
  },
  {
    id: 'scuba-diving',
    slug: 'scuba-diving',
    category: 'watersports',
    categoryName: 'Watersports & Marine',
    title: 'Certified Scuba Diving & Snorkeling Experience at Fujairah',
    location: 'Fujairah / Dubai, UAE',
    duration: 'Full Day (8 Hours)',
    badge: 'Adventure',
    rating: 4.8,
    reviews: 86,
    price: 4999,
    originalPrice: 7200,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the vibrant underwater ecosystem of the Gulf of Oman. Certified PADI dive instructors, full scuba gear, underwater photography, and swimming with exotic marine turtles and coral reefs.',
    highlights: ['All Scuba Equipment Provided', 'PADI Instructor Guided', 'Boat Ride & Refreshments', 'Free Underwater Photos/Videos', 'Suitable for Beginners'],
  },
  {
    id: 'dhow-cruise',
    slug: 'dhow-cruise',
    category: 'cruises',
    categoryName: 'Cruises & Waterfront',
    title: 'Dubai Marina Luxury Glass Dhow Cruise with 5-Star Buffet',
    location: 'Dubai Marina, UAE',
    duration: '2.5 Hours',
    badge: 'Romantic',
    rating: 4.8,
    reviews: 112,
    price: 1899,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    description: 'Glide along the illuminated canals of Dubai Marina aboard a traditional two-deck wooden dhow. Enjoy panoramic skyline vistas, live saxophone and Tanoura performances, and an international gourmet dinner.',
    highlights: ['Air-Conditioned Lower & Open-Air Upper Deck', '5-Star International Buffet', 'Live Musical Performances', 'Marina & Ain Dubai Skyline Views', 'Welcome Drinks & Arabic Coffee'],
  },
  {
    id: 'theme-parks',
    slug: 'theme-parks',
    category: 'themeparks',
    categoryName: 'Theme Parks & Attractions',
    title: 'Burj Khalifa (124th & 125th Floor) + Dubai Aquarium Combo Pass',
    location: 'Downtown Dubai, UAE',
    duration: 'Flexible / 4 Hours',
    badge: 'Must Visit',
    rating: 4.9,
    reviews: 210,
    price: 3899,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    description: 'Ascend to the observation deck of the worlds tallest skyscraper via high-speed double-decker elevators. Follow it with a walkthrough across the 270-degree acrylic tunnel of Dubai Aquarium & Underwater Zoo.',
    highlights: ['Fast-track Elevator to Floor 124/125', 'Outdoor Observation Terrace', 'Dubai Aquarium Underwater Tunnel', 'Underwater Zoo King Croc Access', 'Instant Mobile Voucher'],
  },
  {
    id: 'yacht-rental',
    slug: 'yacht-rental',
    category: 'luxury',
    categoryName: 'Luxury Charters',
    title: 'Private Luxury Yacht Charter (50ft VIP Cruiser) with Captain',
    location: 'Dubai Marina / JBR, UAE',
    duration: '2 to 4 Hours',
    badge: 'VIP Exclusive',
    rating: 5.0,
    reviews: 44,
    price: 8500,
    originalPrice: 12000,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80',
    description: 'Charter your own private yacht cruising past Ain Dubai, Palm Jumeirah, and Atlantis. Complete with professional captain, dedicated crew, sound system, sunbed lounge, and on-board BBQ grill setup.',
    highlights: ['Private 50-Foot Luxury Cruiser', 'Up to 15 Guests Capacity', 'Captain & Crew Included', 'Sound System & Bluetooth Audio', 'Complimentary Soft Drinks & Ice'],
  },
  {
    id: 'houseboat',
    slug: 'houseboat',
    category: 'cruises',
    categoryName: 'Cruises & Waterfront',
    title: 'Alleppey Deluxe Houseboat Overnight Cruise with Kerala Meals',
    location: 'Alleppey, Kerala',
    duration: 'Overnight (21 Hours)',
    badge: 'Trending',
    rating: 4.9,
    reviews: 73,
    price: 5200,
    originalPrice: 7500,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: 'Drift along the palm-fringed backwaters and lush paddy fields of Kerala on a traditional private Kettuvallam. Includes fresh tender coconut welcome, authentic Karimeen fish lunch, and village walk.',
    highlights: ['Private Air-Conditioned Bedroom', 'Traditional Kerala Lunch & Dinner', 'Scenic Backwater Village Sightseeing', 'Dedicated Chef & Boat Captain', 'Complimentary Fishing Rods'],
  },
  {
    id: 'quad-biking-atv',
    slug: 'quad-biking',
    category: 'desert',
    categoryName: 'Desert Adventure',
    title: 'Self-Drive 400cc Desert Quad Bike (ATV) Safari with Guide',
    location: 'Lahbab Desert, UAE',
    duration: '3 Hours',
    badge: 'High Octane',
    rating: 4.8,
    reviews: 95,
    price: 3200,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    description: 'Take command of an automated 400cc Yamaha ATV across towering open red sand dunes. Accompanied by a lead safari guide, complete with safety helmets, goggles, and unlimited cold refreshments.',
    highlights: ['Powerful 400cc Automatic Quad Bike', 'Open Desert Riding Area', 'Full Safety Gear & Instructions', 'Guide Escorted convoy', 'Free Hotel Pickup & Drop'],
  },
  {
    id: 'bali-water-rafting',
    slug: 'bali-water-rafting',
    category: 'watersports',
    categoryName: 'Watersports & Marine',
    title: 'Ayung River White Water Rafting & Ubud Waterfall Tour',
    location: 'Ubud, Bali',
    duration: '6 Hours',
    badge: 'Popular',
    rating: 4.9,
    reviews: 130,
    price: 2999,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
    description: 'Tackle Grade II & III rapids through deep river gorges, tropical rainforests, and Hindu stone carvings. Concludes with an Indonesian buffet lunch overlooking the valley and a dip in Tegenungan Waterfall.',
    highlights: ['12km River Rafting Course', 'Professional Raft Guide & Equipment', 'Hot Shower Facilities & Towel', 'Indonesian Buffet Lunch', 'Insurance Coverage Included'],
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Activities' },
  { key: 'desert', label: 'Desert Safari' },
  { key: 'watersports', label: 'Watersports & Diving' },
  { key: 'cruises', label: 'Cruises & Boat Tours' },
  { key: 'themeparks', label: 'Theme Parks & Pass' },
  { key: 'luxury', label: 'Luxury Charters' },
];

export default function Activities() {
  const { category: urlCategory } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');

  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') return ALL_ACTIVITIES;
    return ALL_ACTIVITIES.filter(
      (a) => a.category === selectedCategory || a.slug === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-28 pb-16 bg-surface">
      {/* Hero Header */}
      <section className="bg-brand-canvas py-12 md:py-16 border-b border-brand-hairline">
        <div className="container-custom">
          <Kicker tone="orange" size="sm" className="mb-2">
            Signature Excursions &amp; Adventures
          </Kicker>
          <SectionRule className="mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-brand-ink max-w-3xl leading-tight">
            Curated Activities &amp; Experiences
          </h1>
          <p className="mt-3 text-sm md:text-base text-brand-muted-ink font-canva-sans max-w-2xl leading-relaxed">
            From thrilling desert dune bashing and deep sea scuba diving to serene luxury yacht cruises and VIP theme park access. Every activity is verified for safety, quality, and real value.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-poppins font-semibold transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? 'bg-brand-orange text-white shadow-soft-md shadow-brand-orange/20 scale-105'
                    : 'bg-surface text-brand-ink border border-brand-hairline hover:border-brand-orange/40 hover:text-brand-orange'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-brand-muted-ink font-canva-sans">
              Showing <span className="font-semibold text-brand-ink">{filteredActivities.length}</span> verified activities
            </p>
            <div className="flex items-center gap-2 text-xs font-poppins text-brand-muted-ink">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% Best Price &amp; Instant Confirmation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => {
              const waText = encodeURIComponent(
                `Hi Traverse Globe! I'd like to book/enquire about the activity: "${act.title}" (₹${act.price}/person). Can you share details?`
              );
              const waUrl = `https://wa.me/${companyInfo.phone.whatsapp}?text=${waText}`;

              return (
                <article
                  key={act.id}
                  className="flex flex-col bg-surface rounded-2xl overflow-hidden border border-brand-hairline shadow-soft-sm hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Media */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-canvas-2">
                    <ImageWithFallback
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    {act.badge && (
                      <span className="absolute top-3 left-3 bg-brand-orange text-white text-[11px] font-poppins font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-soft-md">
                        {act.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-poppins px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-orange" />
                      {act.duration}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-brand-muted-ink font-poppins mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        {act.location}
                      </span>
                      <span className="font-semibold text-brand-ink">
                        ★ {act.rating} ({act.reviews})
                      </span>
                    </div>

                    <h3 className="font-poppins font-bold text-base md:text-lg text-brand-ink leading-snug mb-2">
                      {act.title}
                    </h3>

                    <p className="text-xs md:text-sm text-brand-muted-ink font-canva-sans line-clamp-2 mb-3">
                      {act.description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="mb-4 space-y-1">
                      {act.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-brand-ink/90 font-canva-sans">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing Block */}
                    <div className="mt-auto pt-3 border-t border-brand-hairline">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          {act.originalPrice > act.price && (
                            <span className="text-xs text-brand-muted-ink line-through font-canva-sans mr-2">
                              ₹{act.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                          <span className="text-xl font-poppins font-bold text-brand-ink">
                            ₹{act.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-brand-muted-ink font-canva-sans ml-1">
                            / Person
                          </span>
                        </div>
                        <span className="text-[11px] font-poppins text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                          Instant Confirmation
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${companyInfo.phone.primary}`}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white text-xs font-poppins font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Expert
                        </a>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-poppins font-semibold transition-colors shadow-soft-sm"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5" />
                          Book via WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="mt-12">
        <div className="container-custom">
          <div className="rounded-3xl bg-brand-ink text-white p-8 md:p-12 text-center relative overflow-hidden shadow-soft-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-transparent pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-3 relative z-10">
              Need a Custom Excursion or Group Charter?
            </h3>
            <p className="text-white/80 font-canva-sans text-sm md:text-base max-w-2xl mx-auto mb-6 relative z-10">
              Our travel specialists can bundle multiple activities, private yacht rentals, helicopter transfers, and luxury hotel packages at exclusive discounted rates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-7 py-3.5 rounded-xl font-poppins font-semibold text-sm shadow-glow-orange transition-all"
              >
                <Phone className="w-4 h-4" />
                Speak to our Adventure Specialist
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-3.5 rounded-xl font-poppins font-medium text-sm transition-all"
              >
                Request Custom Itinerary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

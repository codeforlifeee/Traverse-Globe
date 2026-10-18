import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

/**
 * ActivitiesShowcase — Homepage section for curated activities/experiences.
 * Positioned after the Trust Strip, before the sales banner.
 * Activities link to their respective destination/package pages or a future /activities route.
 */

const activities = [
  {
    title: 'Desert Safari & Quad Biking',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=75',
    link: '/activities/desert-safari',
    blurb: 'Dune bashing, camel rides & BBQ under the stars',
    badge: 'Best Seller',
    price: '₹2,499',
  },
  {
    title: 'Scuba Diving & Snorkeling',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=75',
    link: '/activities/scuba-diving',
    blurb: 'Explore vibrant coral reefs & marine life',
    badge: 'Adventure',
    price: '₹4,999',
  },
  {
    title: 'Dhow Cruise & Marina Dinner',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=75',
    link: '/activities/dhow-cruise',
    blurb: 'Sunset views, live music & gourmet dining',
    badge: 'Romantic',
    price: '₹1,899',
  },
  {
    title: 'Theme Parks & Waterparks',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=75',
    link: '/activities/theme-parks',
    blurb: 'Burj Khalifa, Global Village & Aquaventure',
    badge: 'Family',
    price: '₹3,299',
  },
  {
    title: 'Luxury Yacht Rental',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=75',
    link: '/activities/yacht-rental',
    blurb: 'Private charters on the Arabian Gulf',
    badge: 'Luxury',
    price: '₹8,500',
  },
  {
    title: 'Houseboat & Backwater Cruise',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=75',
    link: '/activities/houseboat',
    blurb: "Kerala's serene backwaters & village life",
    badge: 'Trending',
    price: '₹5,200',
  },
];

export default function ActivitiesShowcase() {
  return (
    <UniversalCarousel
      kicker="Experiences & Excursions"
      title="Activities you'll actually love"
      subtitle="Curated adventures — not just packages, but memories"
      bg="canvas"
      slidesPerViewDesktop={4}
      autoplay
    >
      {activities.map((a, i) => (
        <UniversalCard
          key={i}
          image={a.image}
          imageAlt={a.title}
          kicker="Activity"
          title={a.title}
          subtitle={a.blurb}
          badge={a.badge}
          price={{ amount: a.price, from: true, perPerson: true }}
          cta={{ label: 'Enquire Now', style: 'button' }}
          href={a.link}
        />
      ))}
    </UniversalCarousel>
  );
}

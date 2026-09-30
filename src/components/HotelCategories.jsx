import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const hotelTypes = [
  {
    title: 'Luxury Hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/luxury',
    blurb: 'Five-star suites, spa retreats & world-class service',
    badge: 'Premium',
  },
  {
    title: 'Resort Stays',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/resort',
    blurb: 'Beachfront, poolside & all-inclusive family resorts',
  },
  {
    title: 'Business Hotels',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/business',
    blurb: 'Central locations, work spaces & fast check-ins',
  },
  {
    title: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/budget',
    blurb: 'Comfortable stays that keep your trip on track',
  },
  {
    title: 'Domestic Hotels',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/domestic',
    blurb: 'Handpicked stays across India',
  },
  {
    title: 'International Hotels',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60',
    link: '/hotels/international',
    blurb: 'Luxury accommodations worldwide',
  },
];

export default function HotelCategories() {
  return (
    <UniversalCarousel
      kicker="Where you'll stay"
      title="Hotels for every kind of trip"
      subtitle="From beachside villas to city-centre business hotels — inspected and negotiated by us"
      bg="canvas"
      slidesPerViewDesktop={4}
    >
      {hotelTypes.map((h, i) => (
        <UniversalCard
          key={i}
          image={h.image}
          imageAlt={h.title}
          kicker="Hotels"
          title={h.title}
          subtitle={h.blurb}
          badge={h.badge}
          cta={{ label: 'Browse hotels', style: 'link' }}
          href={h.link}
        />
      ))}
    </UniversalCarousel>
  );
}

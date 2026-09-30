import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const categories = [
  {
    title: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    link: '/destinations/international/uae',
    blurb: 'Desert safari, sky-high views, and culture',
    badge: 'Popular',
  },
  {
    title: 'Bali',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80',
    link: '/destinations/international/bali',
    blurb: 'Beaches, temples, and lush rice terraces',
    badge: 'Popular',
  },
  {
    title: 'Thailand',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    link: '/destinations/international/thailand',
    blurb: 'Islands, food, and vibrant culture',
    badge: 'Popular',
  },
  {
    title: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    link: '/destinations/international/singapore',
    blurb: 'City lights, attractions, and family fun',
    badge: 'Popular',
  },
];

export default function PackageCategories() {
  return (
    <UniversalCarousel
      kicker="Explore by category"
      title="Find your perfect getaway"
      subtitle="Tailored to your interests, curated by our team"
      bg="canvas-2"
      slidesPerViewDesktop={4}
    >
      {categories.map((c, i) => (
        <UniversalCard
          key={i}
          image={c.image}
          imageAlt={c.title}
          kicker="Category"
          title={c.title}
          subtitle={c.blurb}
          badge={c.badge}
          cta={{ label: 'Explore', style: 'link' }}
          href={c.link}
        />
      ))}
    </UniversalCarousel>
  );
}

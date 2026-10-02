import { useState } from 'react';
import { useHomepagePackages } from '../hooks/queries';
import BookingModal from './BookingModal';
import { slugify } from '../utils/slug';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const resolveCategoryFromDetailId = (id) => {
  const num = Number(id);
  if (num >= 1 && num <= 10) return { type: 'international', category: 'uae' };
  if ((num >= 11 && num <= 15) || (num >= 26 && num <= 30)) return { type: 'international', category: 'bali' };
  if ((num >= 16 && num <= 20) || (num >= 36 && num <= 39)) return { type: 'international', category: 'thailand' };
  if ((num >= 21 && num <= 25) || (num >= 31 && num <= 35)) return { type: 'international', category: 'singapore' };
  if (num >= 40 && num <= 54) return { type: 'international', category: 'srilanka' };
  if (num >= 55 && num <= 70) return { type: 'international', category: 'vietnam' };
  if (num >= 71 && num <= 90) return { type: 'international', category: 'laos' };
  if (num >= 91 && num <= 100) return { type: 'domestic', category: 'andaman' };
  if (num >= 101 && num <= 110) return { type: 'domestic', category: 'jaipur' };
  if (num >= 111 && num <= 120) return { type: 'domestic', category: 'kerala' };
  if (num >= 121 && num <= 130) return { type: 'domestic', category: 'kashmir' };
  return { type: 'international', category: 'uae' };
};

const ExplorePrices = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const { data: packages = [], isPending: loading } = useHomepagePackages(20);

  const handleCardClick = (pkg) => {
    if (pkg.slug?.current) {
      const destinationType =
        ['kashmir', 'kerala', 'jaipur', 'andaman'].includes(pkg.category) ? 'domestic' : 'international';
      window.open(
        `/destinations/${destinationType}/${pkg.category}/${pkg.slug.current}`,
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }
    if (pkg.detailId) {
      const slug = slugify(pkg.title);
      const { type, category } = resolveCategoryFromDetailId(pkg.detailId);
      window.open(`/destinations/${type}/${category}/${slug}`, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedTitle(pkg.title);
    setShowBooking(true);
  };

  if (loading || packages.length === 0) return null;

  return (
    <>
      <UniversalCarousel
        kicker="Best value picks"
        title="Packages starting from ₹4,199"
        subtitle="Real prices, no hidden fees — GST + service charge already included"
        bg="canvas-2"
        slidesPerViewDesktop={4}
        loop
        autoplay
      >
        {packages.map((pkg, i) => (
          <UniversalCard
            key={i}
            image={pkg.bannerImage || pkg.image}
            imageAlt={pkg.title}
            kicker={pkg.duration || 'Package'}
            title={pkg.title || 'Package'}
            subtitle={pkg.shortDescription || pkg.location || ''}
            badge={pkg.badge}
            rating={pkg.rating}
            price={{ amount: pkg.price || 0, from: true, perPerson: true }}
            cta={{ label: pkg.buttonLabel || 'Book now', style: 'button' }}
            onClick={() => handleCardClick(pkg)}
          />
        ))}
      </UniversalCarousel>
      <BookingModal
        open={showBooking}
        onClose={() => setShowBooking(false)}
        packageName={selectedTitle}
      />
    </>
  );
};

export default ExplorePrices;

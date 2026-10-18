import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDestinationsByType } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

/**
 * TrendingDestinations — Unified destination carousel (REVAMP_PLAN §3 #5)
 * Combines international and domestic hotspots into a single high-conversion section.
 */
const TrendingDestinations = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'international' | 'domestic'
  const { data: allDestinations = [], isPending } = useDestinationsByType();

  const filtered = useMemo(() => {
    if (filter === 'all') return allDestinations;
    return allDestinations.filter((d) => d.type === filter);
  }, [allDestinations, filter]);

  if (isPending) {
    return (
      <div className="container-custom py-10 md:py-14">
        <SkeletonList count={4} columns={4} />
      </div>
    );
  }

  if (allDestinations.length === 0) return null;

  return (
    <div>
      <UniversalCarousel
        kicker="Handpicked Escapes"
        title="Trending Destinations"
        subtitle="Explore our most loved vacation spots across the UAE, Asia & India"
        bg="canvas"
        slidesPerViewDesktop={4}
        autoplay
      >
        {filtered.map((d, i) => (
          <UniversalCard
            key={d.slug || i}
            image={d.image}
            imageAlt={d.title}
            kicker={d.type === 'domestic' ? 'India' : 'International'}
            title={d.title}
            subtitle={d.description || 'Curated stays, guided tours & family-friendly plans'}
            badge={d.featured ? 'Featured' : 'Popular'}
            cta={{ label: 'Explore packages', style: 'link' }}
            onClick={() => navigate(d.link || `/destinations/${d.type || 'international'}/${d.slug}`)}
          />
        ))}
      </UniversalCarousel>
    </div>
  );
};

export default TrendingDestinations;

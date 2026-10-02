import { useNavigate } from 'react-router-dom';
import { useDestinationsByType } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const TrendingDestinations = () => {
  const navigate = useNavigate();
  const { data: destinations = [], isPending } = useDestinationsByType('international');

  // Reserve the row while loading - returning null here collapsed the section and
  // shifted the page once data arrived.
  if (isPending) {
    return (
      <div className="container-custom py-10 md:py-14">
        <SkeletonList count={4} columns={4} />
      </div>
    );
  }
  if (destinations.length === 0) return null;

  return (
    <UniversalCarousel
      kicker="International"
      title="Trending destinations abroad"
      subtitle="Discover the hottest travel spots around the globe"
      bg="white"
      slidesPerViewDesktop={4}
      autoplay
    >
      {destinations.map((d, i) => (
        <UniversalCard
          key={i}
          image={d.image}
          imageAlt={d.title}
          kicker="International"
          title={d.title}
          subtitle="Curated stays, guided tours & family-friendly plans"
          cta={{ label: 'Explore packages', style: 'link' }}
          onClick={() => navigate(d.link || '/destinations')}
        />
      ))}
    </UniversalCarousel>
  );
};

export default TrendingDestinations;

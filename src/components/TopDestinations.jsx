import { useDestinationsByType } from '../hooks/queries';
import { SkeletonList } from './revamp/Skeletons';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const TopDestinations = () => {
  const { data: destinations = [], isPending } = useDestinationsByType('domestic');

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
      kicker="Domestic"
      title="Trending destinations across India"
      subtitle="Discover the hottest travel spots around the country"
      bg="canvas"
      slidesPerViewDesktop={4}
      autoplay
    >
      {destinations.map((d, i) => (
        <UniversalCard
          key={i}
          image={d.image}
          imageAlt={d.title}
          kicker="Domestic"
          title={d.title}
          subtitle="Handpicked stays, transport & local experiences"
          cta={{ label: 'Explore packages', style: 'link' }}
          href={d.link || '/destinations'}
        />
      ))}
    </UniversalCarousel>
  );
};

export default TopDestinations;

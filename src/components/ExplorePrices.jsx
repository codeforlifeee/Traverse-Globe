import { useHomepagePackages } from '../hooks/queries';
import UniversalCarousel from './revamp/UniversalCarousel';
import PackageCard from './PackageCard';
import { SkeletonList } from './revamp/Skeletons';

/**
 * ExplorePrices — the homepage package carousel.
 *
 * Now the first content band under the hero, in the slot Trending Destinations
 * used to hold. Destination tiles only ever pointed at another listing page;
 * packages are the thing with a price on them, so they lead instead.
 *
 * Cards render `size="compact"` — the full-size photo made each card taller than
 * the viewport allowance here and pushed the price below the fold.
 */
const ExplorePrices = () => {
  const { data: packages = [], isPending: loading } = useHomepagePackages(20);

  if (loading) {
    return (
      <section className="section-y bg-brand-canvas/50">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <UniversalCarousel
      kicker="Handpicked escapes"
      title="Curated Dubai &amp; family packages"
      subtitle="Real prices, no hidden fees — with 24/7 on-ground assistance &amp; verified 4★+ stays"
      bg="canvas"
      slidesPerViewDesktop={4}
    >
      {packages.map((pkg, i) => (
        <PackageCard
          key={pkg._id || pkg.id || i}
          pkg={pkg}
          category={pkg.category}
          size="compact"
        />
      ))}
    </UniversalCarousel>
  );
};

export default ExplorePrices;

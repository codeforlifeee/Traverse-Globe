import { useHomepagePackages } from '../hooks/queries';
import UniversalCarousel from './revamp/UniversalCarousel';
import PackageCard from './PackageCard';
import { SkeletonList } from './revamp/Skeletons';

/**
 * ExplorePrices — Homepage package carousel (REVAMP_PLAN §3 #6, #11)
 * Rendered AFTER reviews section. Showcases Thrillophilia-benchmark PackageCards.
 */
const ExplorePrices = () => {
  const { data: packages = [], isPending: loading } = useHomepagePackages(20);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-brand-canvas-2">
        <div className="container-custom">
          <SkeletonList count={4} columns={4} />
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <UniversalCarousel
      kicker="Best value picks"
      title="Curated Packages &amp; Experiences"
      subtitle="Real prices, no hidden fees — with 24/7 on-ground assistance &amp; verified 4★+ stays"
      bg="canvas-2"
      slidesPerViewDesktop={4}
      loop={false}
      autoplay={false}
    >
      {packages.map((pkg, i) => (
        <PackageCard
          key={pkg._id || pkg.id || i}
          pkg={pkg}
          category={pkg.category}
        />
      ))}
    </UniversalCarousel>
  );
};

export default ExplorePrices;

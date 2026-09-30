import { useState, useEffect } from 'react';
import { fetchDomesticDestinations } from '../services/sanityClient';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDomesticDestinations();
        setDestinations(data);
      } catch (err) {
        console.error('Failed to load destinations:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  if (loading || destinations.length === 0) return null;

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

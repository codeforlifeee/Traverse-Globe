import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInternationalDestinations } from '../services/sanityClient';
import UniversalCarousel from './revamp/UniversalCarousel';
import UniversalCard from './revamp/UniversalCard';

const TrendingDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchInternationalDestinations();
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

// Custom Hook: useDestinations
// Fetches packages for a specific destination category

import { useState, useEffect } from 'react';
import { getDestinationPackages, getDestinationBanners } from '../services/destinationService';

export function useDestinations(categorySlug) {
  const [packages, setPackages] = useState([]);
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch packages and banners in parallel
        const [packagesData, bannersData] = await Promise.all([
          getDestinationPackages(categorySlug),
          getDestinationBanners(categorySlug)
        ]);

        setPackages(packagesData);
        setBanners(bannersData);
      } catch (err) {
        console.error('Error fetching destination data:', err);
        setError(err.message);
        setPackages([]);
        setBanners([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categorySlug]);

  return { packages, banners, isLoading, error };
}

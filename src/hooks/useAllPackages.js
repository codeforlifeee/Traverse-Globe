// Custom Hook: useAllPackages
// Fetches all packages, optionally filtered by type (international/domestic)

import { useState, useEffect } from 'react';
import { getAllPackages } from '../services/destinationService';

export function useAllPackages(type = null) {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getAllPackages(type);
        setPackages(data);
      } catch (err) {
        console.error('Error fetching all packages:', err);
        setError(err.message);
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [type]);

  return { packages, isLoading, error };
}

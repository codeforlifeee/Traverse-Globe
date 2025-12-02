// Custom Hook: usePackageDetail
// Fetches details for a specific package by category and slug with live updates

import { useState, useEffect } from 'react';
import { getPackageBySlug } from '../services/destinationService';

export function usePackageDetail(categorySlug, packageSlug) {
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!categorySlug || !packageSlug) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPackageBySlug(categorySlug, packageSlug);
        
        if (data) {
          setPackageData(data);
        } else {
          setError('Package not found');
          setPackageData(null);
        }
      } catch (err) {
        console.error('Error fetching package details:', err);
        setError(err.message || 'Failed to load package');
        setPackageData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categorySlug, packageSlug, refetchTrigger]);

  // Function to manually trigger refetch
  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { packageData, isLoading, error, refetch };
}

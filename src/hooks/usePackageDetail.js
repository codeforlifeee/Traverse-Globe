// Custom Hook: usePackageDetail
// Fetches details for a specific package by category and slug

import { useState, useEffect } from 'react';
import { getPackageBySlug } from '../services/destinationService';

export function usePackageDetail(categorySlug, packageSlug) {
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setPackageData(data);
      } catch (err) {
        console.error('Error fetching package details:', err);
        setError(err.message);
        setPackageData(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [categorySlug, packageSlug]);

  return { packageData, isLoading, error };
}

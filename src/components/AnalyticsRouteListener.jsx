import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sends virtual page views on route changes for GA4 (gtag) and GTM via dataLayer
export default function AnalyticsRouteListener() {
  const location = useLocation();

  useEffect(() => {
    const page_path = location.pathname + location.search;
    const page_title = document.title;

    // Push a generic pageview event for GTM containers (History Change trigger)
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'pageview', page_path, page_title });
    } catch {}

    // Fire GA4 virtual page_view when gtag is present (direct install)
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-GS0QJGE7EN', { page_path });
      }
    } catch {}
  }, [location.pathname, location.search]);

  return null;
}

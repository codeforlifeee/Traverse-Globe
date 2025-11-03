import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Sends virtual page views on route changes via dataLayer for GTM
export default function AnalyticsRouteListener() {
  const location = useLocation();

  useEffect(() => {
    const page_path = location.pathname + location.search;
    const page_title = document.title;

    // Push a pageview event for GTM (used by History Change triggers and GA4 tags in GTM)
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 
        event: 'pageview', 
        page_path, 
        page_title,
        page_location: window.location.href
      });
    } catch (error) {
      console.error('Analytics dataLayer push error:', error);
    }
  }, [location.pathname, location.search]);

  return null;
}

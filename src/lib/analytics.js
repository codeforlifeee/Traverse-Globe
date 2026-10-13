/**
 * Conversion-funnel events, pushed to the GTM dataLayer (container GTM-WZWV7ZQ7,
 * loaded in index.html). No new vendor or dependency — route these to GA4 / PostHog /
 * anything else from inside GTM.
 *
 * Events fire ONLY in production builds (`import.meta.env.PROD`), so local `npm run dev`
 * sessions never pollute the funnel. `npm run preview` serves the prod build, so events
 * do fire there — handy for verifying the dataLayer pushes.
 *
 * Funnel: package_view → shortlist_add → quote_click.
 * `packageId` is the Sanity document `_id` when the caller has it (see BookingModal /
 * PackageDetail); it is simply omitted when unavailable, and events still match by name.
 */

const enabled = import.meta.env.PROD;

export function trackEvent(event, props = {}) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
  } catch {
    // Analytics must never break the UI.
  }
}

export const trackPackageView = ({ packageId, packageName, price, category } = {}) =>
  trackEvent('package_view', { packageId, packageName, price, category });

export const trackShortlistAdd = ({ packageId, packageName, type } = {}) =>
  trackEvent('shortlist_add', { packageId, packageName, type });

export const trackQuoteClick = ({ packageId, packageName, price, method } = {}) =>
  trackEvent('quote_click', { packageId, packageName, price, method });

/**
 * Build-time pre-render support (scripts/prerender.mjs).
 *
 * The homepage's HTML is rendered at build time and hydrated in the browser. While
 * hydrating, React requires the first client render to produce exactly the markup the
 * build produced, so anything that would differ (saved theme, viewport, entrance
 * animations) must render the build's default first and switch in an effect.
 *
 * `hydration.active` is true only while a pre-rendered page is hydrating. Home clears
 * it in its mount effect (not App: React hydrates the routes' Suspense boundary, and
 * with it the hero, after the outer shell has committed and run its effects), so
 * components mounted later behave normally.
 */

export const isServer = typeof window === 'undefined';

export const hydration = {
  active:
    !isServer && document.getElementById('root')?.hasAttribute('data-prerendered') === true,
};

/** True on the build server and during hydration: render the pre-rendered markup. */
export const renderingPrerender = () => isServer || hydration.active;

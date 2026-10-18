import { lazy, Suspense } from 'react';
import HeroSection from '../components/HeroSection';

// Only the hero is eager — it holds the LCP. Everything below the fold is split out so
// framer-motion, Swiper and the Radix accordion stay off the critical path.
const TrendingDestinations = lazy(() => import('../components/TrendingDestinations'));
const ActivitiesShowcase  = lazy(() => import('../components/ActivitiesShowcase'));
const SalesBanner          = lazy(() => import('../components/revamp/SalesBanner'));
const FeedbackSection      = lazy(() => import('../components/FeedbackSection'));
const ExplorePrices        = lazy(() => import('../components/ExplorePrices'));
const WhyChooseUs          = lazy(() => import('../components/WhyChooseUs'));
const HomeBlogSection      = lazy(() => import('../components/HomeBlogSection'));
const PopularSearchesGrid  = lazy(() => import('../components/revamp/PopularSearchesGrid'));
const HomeFAQ              = lazy(() => import('../components/revamp/HomeFAQ'));

/**
 * Defers both layout and JS for a below-fold section. `height` feeds
 * contain-intrinsic-size and the Suspense placeholder from one value, so the
 * reserved box always matches and lazy mounting cannot shift the page.
 */
const Section = ({ height, children }) => (
  <div style={{ contentVisibility: 'auto', containIntrinsicSize: `${height}px` }}>
    <Suspense fallback={<div style={{ minHeight: `${height}px` }} aria-hidden="true" />}>
      {children}
    </Suspense>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ── Hero: Lead form + CTA buttons ── */}
      <HeroSection />

      {/* ── 1. Single unified destinations carousel ── */}
      <Section height={800}><TrendingDestinations /></Section>

      {/* ── 2. Activities showcase (Desert Safari, Scuba, etc.) ── */}
      <Section height={650}><ActivitiesShowcase /></Section>

      {/* ── 4. CMS-driven promotional / sales banner ── */}
      <Section height={420}><SalesBanner /></Section>

      {/* ── 5. Customer Reviews (photos embedded within) ── */}
      <Section height={750}><FeedbackSection /></Section>

      {/* ── 6. Packages placed AFTER reviews (CRO: social proof first) ── */}
      <Section height={950}><ExplorePrices /></Section>

      {/* ── 8. Why Choose Traverse Globe (video + call CTA) ── */}
      <Section height={700}><WhyChooseUs /></Section>

      {/* ── 9. Blog / Travel Guides (above FAQ) ── */}
      <Section height={650}><HomeBlogSection /></Section>

      {/* ── 10. Popular search tags ── */}
      <Section height={500}><PopularSearchesGrid /></Section>

      {/* ── 11. FAQ ── */}
      <Section height={700}><HomeFAQ /></Section>
    </div>
  );
};

export default Home;

import { lazy, Suspense } from 'react';
import HeroSection from '../components/HeroSection';

// Only the hero is eager — it holds the LCP. Everything below the fold is split out so
// framer-motion, Swiper and the Radix accordion stay off the critical path.
const TrendingDestinations = lazy(() => import('../components/TrendingDestinations'));
const ThemesShowcase = lazy(() => import('../components/revamp/ThemesShowcase'));
const LiveOffersStrip = lazy(() => import('../components/revamp/LiveOffersStrip'));
const PackageCategories = lazy(() => import('../components/PackageCategories'));
const TopDestinations = lazy(() => import('../components/TopDestinations'));
const HotelCategories = lazy(() => import('../components/HotelCategories'));
const VideoHero = lazy(() => import('../components/revamp/VideoHero'));
const FeedbackSection = lazy(() => import('../components/FeedbackSection'));
const CustomerGrid = lazy(() => import('../components/revamp/CustomerGrid'));
const VideoTestimonialBand = lazy(() => import('../components/revamp/VideoTestimonialBand'));
const ExplorePrices = lazy(() => import('../components/ExplorePrices'));
const WhyChooseUs = lazy(() => import('../components/WhyChooseUs'));
const PopularSearchesGrid = lazy(() => import('../components/revamp/PopularSearchesGrid'));
const HomeFAQ = lazy(() => import('../components/revamp/HomeFAQ'));

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
      <HeroSection />
      <Section height={1200}><TrendingDestinations /></Section>
      <Section height={900}><ThemesShowcase /></Section>
      <Section height={800}><LiveOffersStrip /></Section>
      <Section height={1400}><PackageCategories /></Section>
      <Section height={1200}><TopDestinations /></Section>
      <Section height={800}><HotelCategories /></Section>
      <Section height={560}><VideoHero /></Section>
      <Section height={1000}><FeedbackSection /></Section>
      <Section height={900}><CustomerGrid /></Section>
      <Section height={700}><VideoTestimonialBand /></Section>
      <Section height={900}><ExplorePrices /></Section>
      <Section height={900}><WhyChooseUs /></Section>
      <Section height={600}><PopularSearchesGrid /></Section>
      <Section height={700}><HomeFAQ /></Section>
    </div>
  );
};

export default Home;

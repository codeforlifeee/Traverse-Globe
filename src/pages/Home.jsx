import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { hydration } from '@/lib/hydration';
import HeroSection from '../components/HeroSection';
import { DUBAI_COLLECTIONS, DUBAI_COLLECTION_TABS } from '../data/dubaiCollections';

// Only the hero is eager — it holds the LCP. Everything below the fold is split out so
// framer-motion, Swiper and the Radix accordion stay off the critical path.
const ExplorePrices       = lazy(() => import('../components/ExplorePrices'));
const DubaiIntro          = lazy(() => import('../components/revamp/DubaiIntro'));
const CollectionGallery   = lazy(() => import('../components/revamp/CollectionGallery'));
const ActivitiesShowcase  = lazy(() => import('../components/ActivitiesShowcase'));
const SalesBanner         = lazy(() => import('../components/revamp/SalesBanner'));
const FeedbackSection     = lazy(() => import('../components/FeedbackSection'));
const BrochureBanner      = lazy(() => import('../components/revamp/BrochureBanner'));
const HomeBlogSection     = lazy(() => import('../components/HomeBlogSection'));
const HomeFAQ             = lazy(() => import('../components/revamp/HomeFAQ'));

/**
 * Defers both layout and JS for a below-fold section. `height` is the reserved
 * box as [phone, desktop] — sections differ by up to 2x between the two (the
 * Dubai primer stacks its globe under the copy on phones), so one number either
 * over- or under-reserved on one of them. It feeds both contain-intrinsic-size
 * and the Suspense placeholder through the .lazy-section CSS variables, so the
 * reserved box matches the real one and lazy mounting cannot shift the page.
 * Values are measured rendered heights (390px and 1366px viewports).
 *
 * Children mount only once the box comes within MOUNT_MARGIN of the viewport.
 * content-visibility skips painting off-screen sections, but React still rendered
 * all nine on load and the browser still styled every node, which was the bulk of
 * mobile blocking time and delayed the hero headline (the mobile LCP element).
 * Once mounted a section stays mounted.
 */
const MOUNT_MARGIN = '800px 0px';

const Section = ({ height: [mobile, desktop], children }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || mounted) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMounted(true);
        observer.disconnect();
      }
    }, { rootMargin: MOUNT_MARGIN });
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const placeholder = <div className="lazy-section-fallback" aria-hidden="true" />;
  return (
    <div ref={ref} className="lazy-section" style={{ '--h-m': `${mobile}px`, '--h-d': `${desktop}px` }}>
      {mounted ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  );
};

const Home = () => {
  // The pre-rendered hero sits inside the routes' Suspense boundary, which React
  // hydrates only after committing the outer shell. Home's effect runs once the hero
  // has hydrated, so this is the point where pre-render matching can stop.
  useEffect(() => {
    hydration.active = false;
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Hero: headline + CTAs + horizontal lead bar ── */}
      <HeroSection />

      {/* ── 1. Short Dubai primer, then the packages it sets up ── */}
      <Section height={[1090, 590]}><DubaiIntro /></Section>

      {/* ── 2. Packages (they replaced the destination tiles that used to sit
             here — a tile only ever pointed at another listing). ── */}
      <Section height={[760, 795]}><ExplorePrices /></Section>

      {/* ── 3. Ways to see Dubai — filterable scrolling gallery ── */}
      <Section height={[750, 680]}>
        <CollectionGallery
          kicker="Over 40 ways to see it"
          title="Ways to see Dubai"
          subtitle="Pick the experiences you want and we build the itinerary around them."
          tabs={DUBAI_COLLECTION_TABS}
          items={DUBAI_COLLECTIONS}
          viewAllHref="/destinations/international/uae"
          viewAllLabel="All Dubai packages"
          bg="canvas-2"
        />
      </Section>

      {/* ── 4. Activities showcase (Desert Safari, Scuba, etc.) ── */}
      <Section height={[660, 715]}><ActivitiesShowcase /></Section>

      {/* ── 5. Full-bleed CMS-driven promotional / sales banner ── */}
      <Section height={[715, 330]}><SalesBanner /></Section>

      {/* ── 6. Customer reviews (photos embedded within) ── */}
      <Section height={[805, 665]}><FeedbackSection /></Section>

      {/* ── 7. Free Dubai guide — lead capture ── */}
      <Section height={[440, 340]}><BrochureBanner /></Section>

      {/* ── 8. Blog / Travel Guides (above FAQ) ── */}
      <Section height={[665, 680]}><HomeBlogSection /></Section>

      {/* ── 9. FAQ ── */}
      <Section height={[700, 680]}><HomeFAQ /></Section>
    </div>
  );
};

export default Home;

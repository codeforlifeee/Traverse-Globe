import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Share2, Clock, Users, MapPin, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchPackageBySlug, fetchPackages, urlFor } from '../services/sanityClient';
import { getCategoryBySlug } from '../data/categoryConfig';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import HeartIcon from '../components/revamp/HeartIcon';
import Kicker from '../components/revamp/Kicker';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import ItineraryTimeline from '../components/revamp/ItineraryTimeline';
import InclusionsTable from '../components/revamp/InclusionsTable';
import HighlightsList from '../components/revamp/HighlightsList';
import StickyBookingWidget from '../components/revamp/StickyBookingWidget';
import MobileBookingBar from '../components/revamp/MobileBookingBar';
import ScrollToast from '../components/revamp/ScrollToast';
import PackageCard from '../components/PackageCard';
import { SkeletonDetail } from '../components/revamp/Skeletons';
import { Badge } from '@/components/ui/badge';

/**
 * Canonical package detail page — /packages/:slug
 * REVAMP_PLAN §4.6 — the highest-conversion surface on the site.
 */
export default function PackageDetail() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryIdx, setGalleryIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPackageBySlug(slug)
      .then(async (data) => {
        if (cancelled) return;
        setPkg(data);
        if (data?.category) {
          const rels = await fetchPackages({ category: data.category, limit: 4 });
          if (!cancelled) setRelated((rels || []).filter((r) => r.slug?.current !== slug).slice(0, 3));
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [slug]);

  const cat = pkg ? getCategoryBySlug(pkg.category) : null;

  const images = useMemo(() => {
    if (!pkg) return [];
    const list = [];
    if (pkg.bannerImage) list.push(pkg.bannerImage);
    if (Array.isArray(pkg.images)) list.push(...pkg.images.filter(Boolean));
    return [...new Set(list)];
  }, [pkg]);

  useEffect(() => {
    if (!pkg) return;
    document.title = `${pkg.title} · Traverse Globe`;
  }, [pkg]);

  if (loading) return <div className="pt-24"><SkeletonDetail /></div>;

  if (!pkg) {
    return (
      <div className="pt-32 pb-24 container-custom text-center">
        <Kicker>Not found</Kicker>
        <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-3">We couldn't find that package.</h1>
        <p className="mt-3 text-brand-muted-ink font-canva-sans">
          It may have been retired. <Link to="/destinations" className="text-brand-orange underline">Browse destinations</Link> instead.
        </p>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Destinations', to: '/destinations' },
    { label: cat?.name || 'Packages', to: cat ? `/destinations/${cat.type}/${cat.slug}` : '/destinations' },
    { label: pkg.title },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg.title,
    description: pkg.overview,
    image: images.slice(0, 5),
    offers: pkg.price ? {
      '@type': 'Offer',
      price: pkg.price,
      priceCurrency: 'INR',
      availability: pkg.active === false ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    } : undefined,
    aggregateRating: pkg.rating ? {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount: pkg.reviews || 1,
    } : undefined,
  };

  const savings = pkg.savingsPercent
    || (pkg.strikePrice && pkg.price && pkg.strikePrice > pkg.price
      ? Math.round(((pkg.strikePrice - pkg.price) / pkg.strikePrice) * 100)
      : null);

  return (
    <div className="pb-24 lg:pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <div className="container-custom pt-24 md:pt-28">
        <BreadcrumbTrail items={breadcrumbs} />
      </div>

      {/* Gallery */}
      <div className="container-custom mt-4">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto md:h-full">
              <ImageWithFallback
                src={images[galleryIdx]}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
              {/* Prev/Next on mobile */}
              <div className="md:hidden absolute inset-y-0 left-0 flex items-center">
                <button onClick={() => setGalleryIdx((i) => (i - 1 + images.length) % images.length)}
                  className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur ml-2 flex items-center justify-center shadow-soft-md">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="md:hidden absolute inset-y-0 right-0 flex items-center">
                <button onClick={() => setGalleryIdx((i) => (i + 1) % images.length)}
                  className="w-9 h-9 rounded-full bg-surface/90 backdrop-blur mr-2 flex items-center justify-center shadow-soft-md">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            {images.slice(1, 5).map((src, i) => (
              <div key={i} className="hidden md:block relative aspect-[4/3]">
                <ImageWithFallback src={src} alt="" className="w-full h-full object-cover" />
                {i === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-poppins font-semibold">
                    +{images.length - 5} photos
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="aspect-[16/9] rounded-2xl bg-brand-canvas-2" />
        )}
      </div>

      {/* Title block */}
      <div className="container-custom mt-6 md:mt-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Kicker>
              {cat ? `${cat.type} · ${cat.name}` : 'Package'}
            </Kicker>
            <h1 className="text-h1 lg:text-display font-poppins font-bold text-brand-ink mt-2 leading-tight">
              {pkg.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-muted-ink font-canva-sans">
              {pkg.rating > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  <span className="text-brand-ink font-poppins font-semibold">{pkg.rating.toFixed(1)}</span>
                  {pkg.reviews > 0 && <span>({pkg.reviews} reviews)</span>}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {pkg.duration || pkg.nights}
              </span>
              {pkg.destination && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {pkg.destination}
                </span>
              )}
              {savings > 0 && <Badge variant="trust">Save {savings}%</Badge>}
              {pkg.urgency === 'high-demand' && <Badge variant="orange">🔥 High demand</Badge>}
              {pkg.urgency === 'few-seats' && <Badge variant="orange">⚡ Only a few left</Badge>}
              {pkg.urgency === 'just-launched' && <Badge variant="trust">🎉 Just launched</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HeartIcon
              item={{
                id: `pkg:${pkg.id || pkg.slug?.current || slug}`,
                type: 'package',
                title: pkg.title,
                price: pkg.price,
                image: images[0],
                slug: slug,
                category: pkg.category,
                href: `/packages/${slug}`,
              }}
              size="lg"
            />
            <button
              onClick={() => {
                if (navigator.share) navigator.share({ title: pkg.title, url: window.location.href }).catch(() => {});
                else { navigator.clipboard?.writeText(window.location.href); }
              }}
              className="w-10 h-10 rounded-full bg-surface border border-brand-hairline shadow-soft-md flex items-center justify-center text-brand-ink hover:text-brand-orange"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Body: 2 columns */}
      <div className="container-custom mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

        {/* Main */}
        <div className="lg:col-span-2 space-y-12">
          {/* Highlights */}
          {pkg.highlights?.length > 0 && (
            <section>
              <Kicker>Why you'll love it</Kicker>
              <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2 mb-4">Highlights</h2>
              <HighlightsList highlights={pkg.highlights} />
            </section>
          )}

          {/* Overview */}
          {pkg.overview && (
            <section>
              <Kicker>Overview</Kicker>
              <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2 mb-4">About this trip</h2>
              <div className="prose max-w-none text-brand-ink font-canva-sans leading-relaxed">
                <p className="whitespace-pre-line">{pkg.overview}</p>
              </div>
            </section>
          )}

          {/* Itinerary */}
          {pkg.itinerary?.days?.length > 0 && (
            <section>
              <Kicker>Day by day</Kicker>
              <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2 mb-6">Your itinerary</h2>
              <ItineraryTimeline days={pkg.itinerary.days} />
            </section>
          )}

          {/* Inclusions/Exclusions */}
          {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
            <section>
              <Kicker>The fine print</Kicker>
              <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2 mb-6">What you get, what you don't</h2>
              <InclusionsTable included={pkg.inclusions} excluded={pkg.exclusions} />
            </section>
          )}

          {/* Hotels */}
          {pkg.hotels?.options?.length > 0 && (
            <section>
              <Kicker>Where you'll stay</Kicker>
              <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2 mb-4">
                {pkg.hotels.title || 'Hotel options'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pkg.hotels.options.map((h, i) => (
                  <div key={i} className="rounded-xl border border-brand-hairline bg-surface p-4 flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <p className="text-sm font-canva-sans text-brand-ink leading-snug">{h}</p>
                  </div>
                ))}
              </div>
              {pkg.hotels.note && (
                <p className="mt-3 text-xs text-brand-muted-ink italic">{pkg.hotels.note}</p>
              )}
            </section>
          )}

          {/* Trust chip */}
          <section className="rounded-2xl bg-brand-trust/5 border border-brand-trust/20 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-trust flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-poppins font-semibold text-brand-ink">
                  Booked with confidence
                </p>
                <p className="text-xs text-brand-muted-ink font-canva-sans mt-1">
                  {pkg.freeCancellationDays > 0
                    ? `Free cancellation up to ${pkg.freeCancellationDays} days before departure. `
                    : ''}
                  Prices are fixed and inclusive of all listed items. No hidden fees.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right rail: sticky booking widget */}
        <div className="lg:col-span-1">
          <StickyBookingWidget pkg={pkg} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-custom mt-16 md:mt-24">
          <div className="flex flex-col mb-8">
            <Kicker>You might also like</Kicker>
            <h2 className="text-h2 font-poppins font-bold text-brand-ink mt-2">More from {cat?.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <PackageCard key={r._id || r.id} pkg={r} category={r.category} showQuickView={false} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile bottom-sticky bar */}
      <MobileBookingBar pkg={pkg} />

      {/* Scroll-triggered soft toast */}
      <ScrollToast packageTitle={pkg.title} />
    </div>
  );
}

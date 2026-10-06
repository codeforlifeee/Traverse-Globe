// DestinationDetail — per-package page.
// Compact revamp inspired by MakeMyTrip / Thomas Cook / Agoda detail pages:
// title overlays the hero, a quick-facts strip replaces the separate meta row,
// sections are tight cards with underline-tab navigation, and the booking
// widget lifts up into the hero on desktop.

import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  ArrowUp,
  Award,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  Headphones,
  Hotel,
  Info,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

import WhatsAppIcon from '../../components/icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';
import { getCategoryBySlug } from '../../data/categoryConfig';
import { useDestinations } from '../../hooks/useDestinations';
import { usePackageDetail } from '../../hooks/usePackageDetail';
import { slugify } from '../../utils/slug';

import PackageCard from '../../components/PackageCard';
import BreadcrumbTrail from '../../components/revamp/BreadcrumbTrail';
import Kicker from '../../components/revamp/Kicker';
import HighlightsList from '../../components/revamp/HighlightsList';
import ItineraryTimeline from '../../components/revamp/ItineraryTimeline';
import ImageWithFallback from '../../components/revamp/ImageWithFallback';
import { SkeletonDetail } from '../../components/revamp/Skeletons';

const DEFAULT_LEAD_API_PATH = '/api/lead-webhook';

function isSameOriginUrl(url) {
  try {
    const resolved = new URL(url, window.location.origin);
    return resolved.origin === window.location.origin;
  } catch {
    return false;
  }
}

function buildLeadMessage(p) {
  return [
    'New booking enquiry',
    `Package: ${p.packageName}`,
    `Name: ${p.fullName}`,
    `Mobile: ${p.mobile}`,
    `Email: ${p.email}`,
    `Travel date: ${p.travelDate || 'Not specified'}`,
    `Travelers: ${p.travelers.total} (Adult: ${p.travelers.adult}, Child: ${p.travelers.child})`,
    `Page: ${p.page.url}`,
  ].join('\n');
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'inclusions', label: "What's included" },
  { id: 'hotels', label: 'Hotels' },
];

export default function DestinationDetail() {
  const { type, category, slug } = useParams();
  const config = getCategoryBySlug(category);

  const { packages, isLoading: packagesLoading } = useDestinations(category);
  const { packageData: currentPackage, isLoading: packageLoading } = usePackageDetail(category, slug);

  const isLoading = packagesLoading || packageLoading;
  const detail = currentPackage;

  useEffect(() => {
    if (!slug) return;
    const canonical = `${window.location.origin}/packages/${slug}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
    return () => {
      if (link && link.parentNode) link.parentNode.removeChild(link);
    };
  }, [slug]);

  const images = useMemo(() => {
    if (!detail) return [];
    if (Array.isArray(detail.images) && detail.images.length) return detail.images;
    const all = [];
    if (detail.bannerImage) all.push(detail.bannerImage);
    if (Array.isArray(detail.galleryImages)) all.push(...detail.galleryImages);
    return all;
  }, [detail]);

  const similarPackages = useMemo(() => {
    if (!currentPackage) return [];
    return packages
      .filter((p) => p.id !== currentPackage.id || p.slug?.current !== slug)
      .slice(0, 3);
  }, [packages, currentPackage, slug]);

  const [activeImg, setActiveImg] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(0);
  const [pdfToastState, setPdfToastState] = useState('idle'); // idle | working | done | error

  const enquiriesToday = useMemo(() => Math.floor(Math.random() * 20) + 1, []);

  useEffect(() => { setActiveImg(0); }, [currentPackage?.id]);

  useEffect(() => {
    const sections = SECTIONS
      .map(({ id }) => ({ id, el: document.getElementById(id) }))
      .filter((s) => s.el);
    if (!sections.length) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => setActiveSection(visible[0].target.id));
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-140px 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s.el));
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [detail]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShowBackToTop(window.scrollY > 500));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    const trimmedName = fullName.trim();
    const trimmedMobile = mobile.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) { setSubmitError('Please enter your name.'); return; }
    if (!/^[0-9]{10}$/.test(trimmedMobile)) { setSubmitError('Enter a valid 10-digit mobile number.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) { setSubmitError('Enter a valid email address.'); return; }

    setIsSubmitting(true);

    const leadPayload = {
      fullName: trimmedName,
      mobile: `+91${trimmedMobile}`,
      email: trimmedEmail,
      packageName: detail?.title || 'General Travel Enquiry',
      travelDate,
      travelers: {
        adult: adults,
        child: childrenCount,
        infant: 0,
        total: adults + childrenCount,
      },
      page: {
        path: window.location.pathname,
        url: window.location.href,
        title: document.title,
      },
    };

    try {
      const leadEndpoint = (import.meta.env.VITE_LEAD_WEBHOOK_URL || DEFAULT_LEAD_API_PATH).trim();
      const sameOrigin = isSameOriginUrl(leadEndpoint);
      const response = await fetch(leadEndpoint, sameOrigin
        ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadPayload) }
        : { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(leadPayload) }
      );
      if (!response.ok) throw new Error('Submit failed');
      setSubmitMessage("Request received! Our team will contact you within 24 hours.");
      setFullName(''); setMobile(''); setEmail('');
    } catch {
      const fallbackMessage = buildLeadMessage(leadPayload);
      const whatsappNum = String(import.meta.env.VITE_LEAD_WHATSAPP || companyInfo?.phone?.whatsapp || '').replace(/\D/g, '');
      if (whatsappNum) {
        window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(fallbackMessage)}`, '_blank', 'noopener,noreferrer');
        setSubmitMessage("Direct submit unavailable — WhatsApp has been opened with your enquiry.");
      } else {
        setSubmitError('Unable to submit right now. Please contact us via phone or WhatsApp.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf || !detail) return;
    setIsGeneratingPdf(true);
    setPdfProgress(0.03);
    setPdfToastState('working');
    try {
      const { generatePackagePdf } = await import('../../lib/packagePdf');
      await generatePackagePdf({
        detail,
        destination,
        typeLabel,
        categoryName: config?.name,
        companyInfo,
        onProgress: (p) => setPdfProgress(p),
      });
      setPdfProgress(1);
      setPdfToastState('done');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfToastState('idle');
        setPdfProgress(0);
      }, 2200);
    } catch (err) {
      console.error('[PDF] generation failed', err);
      setPdfToastState('error');
      setTimeout(() => {
        setIsGeneratingPdf(false);
        setPdfToastState('idle');
        setPdfProgress(0);
      }, 3000);
    }
  };

  if (!config) return <Navigate to="/destinations" replace />;
  if (config.type !== type) return <Navigate to={`/destinations/${config.type}/${category}`} replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-canvas pt-20 pb-12">
        <div className="container-custom"><SkeletonDetail /></div>
      </div>
    );
  }

  if (!currentPackage || !detail) {
    return <Navigate to={`/destinations/${type}/${category}`} replace />;
  }

  const destination = detail?.destination || config?.name || '';
  const typeLabel = type === 'international' ? 'International' : 'Domestic';
  const priceNum = Number(detail?.price || 0);
  const strikeNum = detail?.strikePrice ? Number(detail.strikePrice) : null;
  const savings = strikeNum && priceNum
    ? Math.max(0, Math.round(((strikeNum - priceNum) / strikeNum) * 100))
    : 0;

  const nightsMatch = String(detail?.duration || '').match(/(\d+)\s*N/i);
  const daysMatch = String(detail?.duration || '').match(/(\d+)\s*D/i);
  const nights = nightsMatch ? nightsMatch[1] : null;
  const days = daysMatch ? daysMatch[1] : null;
  const dayCount = detail?.itinerary?.days?.length || null;
  const hotelCount = detail?.hotels?.options?.length || null;

  const whatsappLink = `https://wa.me/${companyInfo?.phone?.whatsapp || ''}?text=${encodeURIComponent(`Hi, I'd like details on *${detail?.title || ''}*`)}`;

  return (
    <div className="min-h-screen bg-brand-canvas pt-16 md:pt-20 pb-24 lg:pb-10">
      {/* ---------- Hero with overlay title (compact) ---------- */}
      <section className="relative">
        <div className="relative h-[340px] md:h-[420px] lg:h-[460px] overflow-hidden bg-brand-canvas-2">
          {images[activeImg] && (
            <ImageWithFallback
              src={images[activeImg]}
              alt={detail?.title || 'Package image'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/85 via-brand-scrim/40 to-brand-scrim/50" />

          {/* Top-left: breadcrumb + badges */}
          <div className="absolute top-4 left-0 right-0 container-custom">
            <BreadcrumbTrail
              items={[
                { label: 'Destinations', to: '/destinations' },
                { label: typeLabel, to: `/destinations/${type}` },
                { label: config.name, to: `/destinations/${type}/${category}` },
                { label: detail?.title || 'Package' },
              ]}
              tone="light"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {detail?.featured && (
                <span className="inline-flex items-center gap-1 bg-brand-orange text-white px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold uppercase tracking-wide">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
              {savings > 0 && (
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold uppercase tracking-wide">
                  Save {savings}%
                </span>
              )}
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm text-white border border-white/25 px-2.5 py-1 rounded-full text-[11px] font-poppins font-semibold uppercase tracking-wide">
                <MapPin className="w-3 h-3" /> {destination}
              </span>
            </div>
          </div>

          {/* Bottom: title + meta row */}
          <div className="absolute bottom-0 left-0 right-0 container-custom pb-5 md:pb-7">
            <div className="flex items-end justify-between gap-6">
              <div className="min-w-0 text-white">
                <Kicker tone="orange" className="text-white/90">{typeLabel}</Kicker>
                <h1 className="font-season text-2xl md:text-4xl lg:text-5xl font-bold mt-1.5 leading-tight max-w-3xl">
                  {detail?.title || ''}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs md:text-sm font-canva-sans text-white/90">
                  {detail?.duration && (
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {detail.duration}</span>
                  )}
                  {typeof detail?.rating === 'number' && (
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-poppins font-semibold text-white">{detail.rating}</span>
                      <span className="text-white/70">({detail?.reviews || 0})</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Family-friendly</span>
                </div>
              </div>

              {/* Thumbnails strip — small, bottom-right on desktop only */}
              {images.length > 1 && (
                <div className="hidden md:flex gap-2 flex-shrink-0">
                  {images.slice(0, 4).map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden ring-2 transition-all ${
                        activeImg === idx ? 'ring-brand-orange shadow-soft-md scale-105' : 'ring-white/40 hover:ring-white/80'
                      }`}
                    >
                      <ImageWithFallback src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      {idx === 3 && images.length > 4 && (
                        <div className="absolute inset-0 bg-brand-scrim/70 flex items-center justify-center text-white font-poppins font-semibold text-xs">
                          +{images.length - 4}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile thumbnails under hero (so they're reachable) */}
        {images.length > 1 && (
          <div className="md:hidden container-custom pt-3 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
              {images.slice(0, 6).map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden ring-2 flex-shrink-0 ${
                    activeImg === idx ? 'ring-brand-orange' : 'ring-transparent'
                  }`}
                >
                  <ImageWithFallback src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ---------- Quick-facts strip ---------- */}
      <div className="container-custom mt-4 md:mt-6">
        <div className="rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm px-3 py-3 md:px-5 md:py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-canva-sans">
          <QuickFact Icon={Calendar} label={nights && days ? `${nights}N / ${days}D` : (detail?.duration || '—')} />
          {dayCount && <QuickFact Icon={MapPin} label={`${dayCount}-day itinerary`} />}
          {hotelCount && <QuickFact Icon={Hotel} label={`${hotelCount}+ hotel options`} />}
          <QuickFact Icon={ShieldCheck} label="Free cancellation window" />
          <QuickFact Icon={Users} label="Family-friendly" />
          <span className="ml-auto hidden md:inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300 font-poppins font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {enquiriesToday} people enquired today
          </span>
        </div>
      </div>

      {/* ---------- Main 2-column grid ---------- */}
      <div className="container-custom mt-5 md:mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* ---- Left: content ---- */}
          <div className="lg:col-span-2 min-w-0">
            {/* Underline tabs — compact, sticky */}
            <nav className="sticky top-16 md:top-20 z-20 -mx-4 md:mx-0 bg-brand-canvas/95 backdrop-blur-md border-b border-brand-hairline mb-5">
              <div className="flex gap-1 px-4 md:px-0 overflow-x-auto no-scrollbar">
                {SECTIONS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex-shrink-0 relative px-3 md:px-4 py-3 text-xs md:text-sm font-poppins font-semibold transition-colors whitespace-nowrap ${
                      activeSection === id ? 'text-brand-orange' : 'text-brand-muted-ink hover:text-brand-ink'
                    }`}
                  >
                    {label}
                    {activeSection === id && (
                      <span className="absolute left-2 right-2 bottom-0 h-0.5 rounded-full bg-brand-orange" />
                    )}
                  </button>
                ))}
              </div>
            </nav>

            <div className="space-y-5">
              {/* Overview */}
              <section id="overview" className="scroll-mt-32 rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5 md:p-6">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-orange" />
                  <h2 className="font-season text-lg md:text-xl font-bold text-brand-ink">Overview</h2>
                </div>
                {detail?.overview && (
                  <p className="mt-3 text-sm md:text-[15px] text-brand-muted-ink font-canva-sans leading-relaxed whitespace-pre-line">
                    {detail.overview}
                  </p>
                )}

                {Array.isArray(detail?.highlights) && detail.highlights.length > 0 && (
                  <div className="mt-5 pt-5 border-t border-brand-hairline">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-brand-orange" />
                      <h3 className="font-poppins font-semibold text-sm md:text-base text-brand-ink">Trip highlights</h3>
                    </div>
                    <HighlightsList highlights={detail.highlights} />
                  </div>
                )}
              </section>

              {/* Itinerary */}
              <section id="itinerary" className="scroll-mt-32 rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5 md:p-6">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-orange" />
                    <h2 className="font-season text-lg md:text-xl font-bold text-brand-ink">
                      Your itinerary
                    </h2>
                  </div>
                  {dayCount && (
                    <span className="text-xs font-poppins font-semibold text-brand-muted-ink bg-brand-canvas-2 px-2.5 py-1 rounded-full">
                      {dayCount} days
                    </span>
                  )}
                </div>

                {detail?.itinerary?.days?.length ? (
                  <ItineraryTimeline days={detail.itinerary.days} />
                ) : (
                  <EmptyState text="Itinerary details coming soon." />
                )}
              </section>

              {/* Inclusions + Hotels — side by side on xl+, stacked below */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <section id="inclusions" className="scroll-mt-32 rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Check className="w-4 h-4 text-brand-orange" />
                    <h2 className="font-season text-lg md:text-xl font-bold text-brand-ink">
                      What's included
                    </h2>
                  </div>

                  {(detail?.inclusions?.length || detail?.exclusions?.length) ? (
                    <div className="space-y-4">
                      <InclusionList
                        tone="trust"
                        title="Included"
                        items={detail?.inclusions || []}
                      />
                      <InclusionList
                        tone="destructive"
                        title="Not included"
                        items={detail?.exclusions || []}
                      />
                    </div>
                  ) : (
                    <EmptyState text="Inclusion details coming soon." />
                  )}
                </section>

                <section id="hotels" className="scroll-mt-32 rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5 md:p-6">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-brand-orange" />
                      <h2 className="font-season text-lg md:text-xl font-bold text-brand-ink">
                        {detail?.hotels?.title || 'Where you stay'}
                      </h2>
                    </div>
                    {hotelCount && (
                      <span className="text-xs font-poppins font-semibold text-brand-muted-ink bg-brand-canvas-2 px-2.5 py-1 rounded-full">
                        {hotelCount} options
                      </span>
                    )}
                  </div>

                  {detail?.hotels?.options?.length ? (
                    <ul className="space-y-2.5">
                      {detail.hotels.options.map((hotel, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl border border-brand-hairline bg-brand-canvas-2 px-3 py-2.5"
                        >
                          <Building2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm font-canva-sans text-brand-ink leading-snug">
                            {hotel}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <EmptyState text="Hotel details coming soon." />
                  )}

                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 px-3 py-2">
                    <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900 dark:text-amber-200 font-canva-sans leading-snug">
                      {detail?.hotels?.note || 'Hotels subject to availability. Similar category accommodation guaranteed.'}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* ---- Right: sticky booking form + secondary cards (desktop) ---- */}
          <aside className="hidden lg:block space-y-5">
            {/* Sticky inline booking form */}
            <form
              onSubmit={handleSubmitBooking}
              className="sticky top-24 rounded-2xl border border-brand-hairline bg-surface shadow-soft-md overflow-hidden"
            >
              {/* Price header */}
              <div className="px-5 pt-4 pb-4 bg-gradient-to-br from-brand-orange/10 via-brand-canvas-2 to-brand-canvas-2 border-b border-brand-hairline">
                <div className="flex items-center justify-between gap-2">
                  <Kicker tone="orange">Starting from</Kicker>
                  {savings > 0 && (
                    <span className="inline-flex items-center bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-poppins font-semibold">
                      Save {savings}%
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-2 mt-1.5">
                  <div className="font-season text-3xl font-bold text-brand-ink leading-none">
                    ₹{priceNum.toLocaleString('en-IN')}
                  </div>
                  {strikeNum && (
                    <div className="pb-1 text-xs text-brand-muted-ink line-through">
                      ₹{strikeNum.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-brand-muted-ink font-canva-sans">
                  Per person · twin sharing · ex-GST
                </p>
              </div>

              {/* Travel date + pax */}
              <div className="px-5 pt-4 space-y-3">
                <label className="block">
                  <span className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                    Travel date
                  </span>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-muted-ink pointer-events-none" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-sm font-canva-sans rounded-lg border border-brand-hairline bg-brand-canvas focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-brand-ink"
                    />
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <PaxStepper label="Adults" sub="12+" value={adults} min={1} onChange={setAdults} />
                  <PaxStepper label="Children" sub="2–11" value={childrenCount} min={0} onChange={setChildrenCount} />
                </div>
              </div>

              {/* Contact fields — were previously in the modal */}
              <div className="px-5 pt-4 space-y-2.5">
                <div>
                  <label htmlFor="booking-name" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                    Full name
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3 py-2 text-sm font-canva-sans rounded-lg border border-brand-hairline bg-brand-canvas text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="booking-mobile" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                    Mobile
                  </label>
                  <div className="flex items-stretch rounded-lg border border-brand-hairline bg-brand-canvas overflow-hidden focus-within:ring-2 focus-within:ring-brand-orange">
                    <span className="px-2.5 flex items-center text-xs font-poppins font-semibold text-brand-muted-ink bg-brand-canvas-2 border-r border-brand-hairline">
                      +91
                    </span>
                    <input
                      id="booking-mobile"
                      type="tel"
                      inputMode="numeric"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile"
                      className="flex-1 px-3 py-2 text-sm font-canva-sans bg-transparent text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="booking-email" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                    Email
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 text-sm font-canva-sans rounded-lg border border-brand-hairline bg-brand-canvas text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Estimated total */}
              <div className="mx-5 mt-3 rounded-lg bg-brand-canvas-2 border border-brand-hairline px-3 py-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide">
                    Estimated total
                  </div>
                  <div className="font-season text-lg font-bold text-brand-ink leading-tight">
                    ₹{(adults * priceNum + childrenCount * Math.round(priceNum * 0.7)).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-[10px] text-brand-muted-ink font-canva-sans">
                  {adults} adult{adults !== 1 ? 's' : ''}{childrenCount > 0 ? ` · ${childrenCount} child${childrenCount > 1 ? 'ren' : ''}` : ''}
                </div>
              </div>

              {/* Status messages */}
              {submitError && (
                <div className="mx-5 mt-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 px-3 py-2 text-xs text-rose-700 dark:text-rose-300 font-canva-sans">
                  {submitError}
                </div>
              )}
              {submitMessage && (
                <div className="mx-5 mt-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300 font-canva-sans flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{submitMessage}</span>
                </div>
              )}

              {/* CTAs — "Book this package" IS the submit */}
              <div className="px-5 pt-3 pb-4 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 disabled:cursor-not-allowed text-white font-poppins font-semibold text-sm py-2.5 rounded-full shadow-soft-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                  ) : (
                    <>Book this package <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full inline-flex items-center justify-center gap-1.5 border border-brand-hairline hover:border-brand-ink text-brand-ink font-poppins font-semibold text-xs py-2 rounded-full transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGeneratingPdf ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Preparing PDF…</>
                  ) : (
                    <><Download className="w-3.5 h-3.5" /> Download quotation (PDF)</>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${companyInfo?.phone?.primary || ''}`}
                    className="inline-flex items-center justify-center gap-1.5 border border-brand-hairline hover:border-brand-orange text-brand-ink hover:text-brand-orange font-poppins font-semibold text-xs py-2 rounded-full transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-poppins font-semibold text-xs py-2 rounded-full transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Trust footer */}
              <div className="px-5 py-3 bg-brand-canvas-2 border-t border-brand-hairline grid grid-cols-3 gap-2 text-center">
                <TrustMini Icon={ShieldCheck} label="Secure" />
                <TrustMini Icon={Headphones} label="24×7 help" />
                <TrustMini Icon={CreditCard} label="EMI" />
              </div>
            </form>

            {/* ---- Secondary cards (non-sticky, fill right-column scroll) ---- */}
            {/* Talk to an expert */}
            <div className="rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-poppins font-semibold text-sm text-brand-ink">Need help planning?</h3>
                  <p className="mt-0.5 text-xs text-brand-muted-ink font-canva-sans leading-relaxed">
                    Chat with a travel expert — they'll tailor dates, hotels and inclusions for your family.
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-ink hover:bg-brand-orange text-white font-poppins font-semibold text-xs py-2 rounded-full transition-colors"
                >
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${companyInfo?.email?.primary || ''}`}
                  className="inline-flex items-center justify-center gap-1.5 border border-brand-hairline hover:border-brand-orange text-brand-ink hover:text-brand-orange font-poppins font-semibold text-xs py-2 rounded-full transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> Email us
                </a>
              </div>
            </div>

            {/* Why book with us */}
            <div className="rounded-2xl border border-brand-hairline bg-surface shadow-soft-sm p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-brand-orange" />
                <h3 className="font-poppins font-semibold text-sm text-brand-ink">Why Traverse Globe</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-brand-muted-ink font-canva-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><span className="font-poppins font-semibold text-brand-ink">No hidden fees</span> — your quote is the final price.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><span className="font-poppins font-semibold text-brand-ink">Handpicked hotels</span> — we've stayed in every single one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><span className="font-poppins font-semibold text-brand-ink">On-trip support</span> — one WhatsApp number, 24×7.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><span className="font-poppins font-semibold text-brand-ink">Flexible rescheduling</span> — change dates up to 15 days prior.</span>
                </li>
              </ul>
            </div>

            {/* Testimonial snippet */}
            <div className="rounded-2xl border border-brand-hairline bg-gradient-to-br from-brand-orange/5 via-surface to-surface shadow-soft-sm p-5">
              <Quote className="w-6 h-6 text-brand-orange/30" />
              <p className="mt-2 text-sm font-canva-sans text-brand-ink leading-relaxed italic">
                "Everything from airport pickup to the last meal was planned. Our kids still talk about this trip."
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-orange/15 flex items-center justify-center font-poppins font-bold text-brand-orange text-sm">
                  P
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-poppins font-semibold text-brand-ink">Priya S.</p>
                  <div className="flex items-center gap-1 text-[11px] text-brand-muted-ink">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span>· Traveled with family</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price promise */}
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-poppins font-semibold text-sm text-emerald-900 dark:text-emerald-200">
                    Lowest-price promise
                  </h3>
                  <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-200/80 font-canva-sans leading-relaxed">
                    Find this exact package cheaper elsewhere and we'll match the price or refund the difference.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ---------- Similar packages ---------- */}
        {similarPackages.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between gap-3 mb-5">
              <div>
                <Kicker>You might also like</Kicker>
                <h2 className="font-season text-xl md:text-2xl font-bold text-brand-ink mt-1">
                  Similar {config?.name || 'curated'} packages
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {similarPackages.map((pkg) => (
                <PackageCard
                  key={pkg._id || pkg.id}
                  pkg={pkg}
                  destination={`/destinations/${type}/${category}/${pkg.slug?.current || slugify(pkg.title)}`}
                  category={category}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ---------- Mobile booking form (replaces the modal) ---------- */}
      <div id="mobile-booking-form" className="lg:hidden container-custom mt-10 scroll-mt-24">
        <form
          onSubmit={handleSubmitBooking}
          className="rounded-2xl border border-brand-hairline bg-surface shadow-soft-md overflow-hidden"
        >
          <div className="px-5 pt-4 pb-3 bg-gradient-to-br from-brand-orange/10 via-brand-canvas-2 to-brand-canvas-2 border-b border-brand-hairline">
            <Kicker tone="orange">Book this package</Kicker>
            <div className="flex items-end gap-2 mt-1">
              <div className="font-season text-2xl font-bold text-brand-ink leading-none">
                ₹{priceNum.toLocaleString('en-IN')}
              </div>
              {strikeNum && (
                <div className="pb-0.5 text-xs text-brand-muted-ink line-through">
                  ₹{strikeNum.toLocaleString('en-IN')}
                </div>
              )}
            </div>
            <p className="mt-0.5 text-[11px] text-brand-muted-ink font-canva-sans">
              Per person · twin sharing · ex-GST
            </p>
          </div>

          <div className="px-5 py-4 space-y-3">
            <label className="block">
              <span className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                Travel date
              </span>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-muted-ink pointer-events-none" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-brand-hairline bg-brand-canvas focus:outline-none focus:ring-2 focus:ring-brand-orange text-brand-ink"
                />
              </div>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <PaxStepper label="Adults" sub="12+" value={adults} min={1} onChange={setAdults} />
              <PaxStepper label="Children" sub="2–11" value={childrenCount} min={0} onChange={setChildrenCount} />
            </div>

            <div>
              <label htmlFor="booking-name-m" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                Full name
              </label>
              <input
                id="booking-name-m"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-brand-hairline bg-brand-canvas text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="booking-mobile-m" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                Mobile
              </label>
              <div className="flex items-stretch rounded-lg border border-brand-hairline bg-brand-canvas overflow-hidden focus-within:ring-2 focus-within:ring-brand-orange">
                <span className="px-2.5 flex items-center text-xs font-poppins font-semibold text-brand-muted-ink bg-brand-canvas-2 border-r border-brand-hairline">
                  +91
                </span>
                <input
                  id="booking-mobile-m"
                  type="tel"
                  inputMode="numeric"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile"
                  className="flex-1 px-3 py-2 text-sm bg-transparent text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none"
                  autoComplete="tel"
                />
              </div>
            </div>
            <div>
              <label htmlFor="booking-email-m" className="block text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
                Email
              </label>
              <input
                id="booking-email-m"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 text-sm rounded-lg border border-brand-hairline bg-brand-canvas text-brand-ink placeholder:text-brand-muted-ink/60 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                autoComplete="email"
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 px-3 py-2 text-xs text-rose-700 dark:text-rose-300">
                {submitError}
              </div>
            )}
            {submitMessage && (
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>{submitMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-70 text-white font-poppins font-semibold text-sm py-3 rounded-full shadow-soft-md transition-all"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
              ) : (
                <>Submit booking request <ChevronRight className="w-4 h-4" /></>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full inline-flex items-center justify-center gap-1.5 border border-brand-hairline text-brand-ink font-poppins font-semibold text-xs py-2.5 rounded-full disabled:opacity-70"
            >
              {isGeneratingPdf ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Preparing PDF…</>
              ) : (
                <><Download className="w-3.5 h-3.5" /> Download quotation (PDF)</>
              )}
            </button>
          </div>

          <div className="px-5 py-3 bg-brand-canvas-2 border-t border-brand-hairline flex items-start gap-2 text-[11px] text-brand-muted-ink font-canva-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-orange flex-shrink-0 mt-0.5" />
            Your info is used only to process this travel request. We'll reach out within 24 hours.
          </div>
        </form>
      </div>

      {/* ---------- Mobile sticky booking bar ---------- */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-brand-hairline shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
        <div className="container-custom py-2.5 flex items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-end gap-1.5">
              <div className="font-season text-lg font-bold text-brand-ink leading-tight">
                ₹{priceNum.toLocaleString('en-IN')}
              </div>
              {strikeNum && (
                <div className="pb-0.5 text-[10px] text-brand-muted-ink line-through leading-none">
                  ₹{strikeNum.toLocaleString('en-IN')}
                </div>
              )}
            </div>
            <div className="text-[10px] text-brand-muted-ink leading-tight">Per person · twin sharing</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('mobile-booking-form');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 90;
                  window.scrollTo({ top, behavior: 'smooth' });
                  setTimeout(() => document.getElementById('booking-name-m')?.focus(), 400);
                }
              }}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white font-poppins font-semibold text-sm px-4 py-2.5 rounded-full shadow-soft-md"
            >
              Book now
            </button>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden md:flex fixed bottom-8 right-8 z-40 w-10 h-10 bg-brand-ink hover:bg-brand-orange text-white rounded-full shadow-soft-xl items-center justify-center transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* ---------- Non-blocking PDF toast (bottom-right) ---------- */}
      {pdfToastState !== 'idle' && (
        <div className="fixed z-[70] right-4 lg:right-6 bottom-20 lg:bottom-6 w-[280px] md:w-[320px] rounded-2xl bg-surface border border-brand-hairline shadow-soft-xl overflow-hidden animate-pdf-toast">
          <div className="px-4 pt-3.5 pb-3 flex items-start gap-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              pdfToastState === 'done'
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : pdfToastState === 'error'
                ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                : 'bg-brand-orange/15 text-brand-orange'
            }`}>
              {pdfToastState === 'done' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : pdfToastState === 'error' ? (
                <Info className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5 animate-pulse" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-poppins font-semibold text-sm text-brand-ink">
                {pdfToastState === 'done' && 'Quotation ready'}
                {pdfToastState === 'error' && "Couldn't build the PDF"}
                {pdfToastState === 'working' && 'Preparing your quotation…'}
              </p>
              <p className="mt-0.5 text-[11px] text-brand-muted-ink font-canva-sans leading-snug">
                {pdfToastState === 'done' && 'Check your Downloads folder — the file was saved.'}
                {pdfToastState === 'error' && 'Please try again or contact us on WhatsApp.'}
                {pdfToastState === 'working' && 'Keep browsing — this runs in the background.'}
              </p>
            </div>
            {pdfToastState !== 'working' && (
              <button
                onClick={() => { setPdfToastState('idle'); setIsGeneratingPdf(false); setPdfProgress(0); }}
                className="text-brand-muted-ink hover:text-brand-ink -mt-1 -mr-1 p-1"
                aria-label="Dismiss"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="h-1 w-full bg-brand-canvas-2 relative overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-r-full transition-[width] duration-300 ease-out ${
                pdfToastState === 'done' ? 'bg-emerald-500'
                : pdfToastState === 'error' ? 'bg-rose-500'
                : 'bg-brand-orange'
              }`}
              style={{ width: `${Math.max(5, Math.min(100, pdfProgress * 100))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function QuickFact({ Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-brand-ink">
      <Icon className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
      <span className="font-poppins font-medium">{label}</span>
    </span>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-brand-hairline bg-brand-canvas-2 px-4 py-5 text-center">
      <p className="text-sm text-brand-muted-ink font-canva-sans">{text}</p>
    </div>
  );
}

function InclusionList({ tone, title, items }) {
  const isTrust = tone === 'trust';
  const chipCls = isTrust
    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/30';
  const Icon = isTrust ? Check : Minus;

  return (
    <div>
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-poppins font-semibold mb-2.5 ${chipCls}`}>
        <Icon className="w-3 h-3" strokeWidth={3} />
        {title}
      </div>
      {items.length ? (
        <ul className="space-y-1.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-brand-ink font-canva-sans leading-snug">
              <span className={`mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${isTrust ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-300'}`}>
                <Icon className="w-2 h-2" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-brand-muted-ink font-canva-sans italic">Not specified</p>
      )}
    </div>
  );
}

function PaxStepper({ label, sub, value, min = 0, onChange }) {
  return (
    <div>
      <div className="text-[11px] font-poppins font-semibold text-brand-muted-ink uppercase tracking-wide mb-1">
        {label} <span className="text-brand-muted-ink/70 normal-case font-canva-sans">· {sub}</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-brand-hairline bg-brand-canvas px-1 py-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-7 h-7 rounded-md hover:bg-brand-canvas-2 text-brand-muted-ink hover:text-brand-ink flex items-center justify-center transition-colors"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-poppins font-semibold text-sm text-brand-ink min-w-[1.5rem] text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-md hover:bg-brand-canvas-2 text-brand-muted-ink hover:text-brand-ink flex items-center justify-center transition-colors"
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function TrustMini({ Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-brand-muted-ink">
      <Icon className="w-3.5 h-3.5 text-brand-orange" />
      <span className="text-[10px] font-poppins font-semibold">{label}</span>
    </div>
  );
}

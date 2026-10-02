// DestinationDetail Component
// Dynamic component that displays package details for any destination
// Works with new routing: /destinations/:type/:category/:slug

import WhatsAppIcon from '../../components/icons/WhatsAppIcon';
import { ArrowUp, Building2, Calendar, CheckCircle2, Hotel, Info, Mail, MapPin, Phone, Star, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { companyInfo } from '../../data/companyInfo';
import { getCategoryBySlug } from '../../data/categoryConfig';
import { useDestinations } from '../../hooks/useDestinations';
import { usePackageDetail } from '../../hooks/usePackageDetail';
import { slugify } from '../../utils/slug';
import PackageCard from '../../components/PackageCard';

export default function DestinationDetail() {
  const { type, category, slug } = useParams();

  // Announce the new canonical URL to search engines. In Phase 3 we point at
  // the new /packages/:slug URL via <link rel="canonical">; a 301 redirect
  // ships in a later release once we've measured the SEO impact.
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

  // Get category configuration
  const config = getCategoryBySlug(category);

  // Fetch all packages for this category (for similar packages)
  const { packages, isLoading: packagesLoading } = useDestinations(category);

  // Fetch the specific package details from Sanity CMS
  const { packageData: currentPackage, isLoading: packageLoading, error: packageError } = usePackageDetail(category, slug);

  // Combine loading states
  const isLoading = packagesLoading || packageLoading;

  // The detail is now the currentPackage from Sanity (no need for separate packageDetails)
  const detail = currentPackage;

  // Get similar packages (exclude current)
  const similarPackages = useMemo(() => {
    if (!currentPackage) return [];
    return packages.filter(p => p.id !== currentPackage.id || p.slug?.current !== slug).slice(0, 3);
  }, [packages, currentPackage, slug]);

  // Get gallery images from Sanity data
  const images = useMemo(() => {
    if (!detail) return [];
    
    // Use the 'images' field directly from Sanity
    if (detail.images && Array.isArray(detail.images)) {
      return detail.images;
    }
    
    // Fallback: combine bannerImage and galleryImages if using old structure
    const allImages = [];
    if (detail.bannerImage) {
      allImages.push(detail.bannerImage);
    }
    if (detail.galleryImages && Array.isArray(detail.galleryImages)) {
      allImages.push(...detail.galleryImages);
    }
    
    return allImages.length > 0 ? allImages : [];
  }, [detail]);
  
  // State management - ALL hooks must come before any conditional returns
  const [active, setActive] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  // Set active image when images change
  useEffect(() => {
    if (images[0]) {
      setActive(images[0]);
    }
  }, [currentPackage?.id, images]);

  // Scroll observer for active section
  useEffect(() => {
    const sectionIds = ['overview', 'itinerary', 'inclusions', 'hotels'];
    const sections = sectionIds
      .map(id => ({ id, el: document.getElementById(id) }))
      .filter(s => s.el);

    if (!sections.length) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            setActiveSection(visible[0].target.id);
          });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach(s => observer.observe(s.el));

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Show/hide back-to-top button
  useEffect(() => {
    let rafScroll = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        setShowBackToTop(window.scrollY > 400);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const totalPrice = (adult * (detail?.price || 0)) + (child * (detail?.price || 0) * 0.7) + (infant * (detail?.price || 0) * 0.3);

  const handleBookNow = () => {
    setShowModal(true);
  };

  // Validation and conditional renders - MUST come after ALL hooks
  // Validate type and category match
  if (!config || config.type !== type) {
    return <Navigate to="/destinations" replace />;
  }

  // Show loading state while packages are being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4"></div>
          <p className="text-darkBlue">Loading package details...</p>
        </div>
      </div>
    );
  }

  // If package not found, redirect to category list
  if (!currentPackage || !detail) {
    return <Navigate to={`/destinations/${type}/${category}`} replace />;
  }

  const destination = detail?.destination || config?.name || '';
  const typeLabel = type === 'international' ? 'International' : 'Domestic';

  return (
    <div className="min-h-screen pt-20 pb-8">
      {/* Package Header */}
      <div className="container mx-auto px-4 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-brand-ink">{detail?.title || ''}</h1>
        <p className="text-brand-muted-ink mt-1">
          <MapPin className="w-4 h-4" /> {destination}
          {' | '}
          <Calendar className="w-4 h-4" /> {detail?.duration || ''}
          {' | '}
          <Star className="w-4 h-4 text-yellow-400" /> {detail?.rating || 0} ({detail?.reviews || 0} Reviews)
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-surface rounded-2xl shadow p-4 mb-4">
              {active && (
                <img 
                  src={active} 
                  alt="Main" 
                  className="w-full h-80 md:h-[450px] object-cover rounded-xl" 
                />
              )}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.map((src, idx) => (
                  <button 
                    key={idx} 
                    className={`rounded-lg overflow-hidden border ${active === src ? 'border-primary' : 'border-transparent'}`} 
                    onClick={() => setActive(src)}
                  >
                    <img src={src} alt={`thumb-${idx}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Navigation */}
            <div className="bg-surface rounded-2xl shadow-lg mb-4 sticky top-20 z-10">
              <div className="flex gap-2 px-2 md:px-4 py-3 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', Icon: Info },
                  { id: 'itinerary', label: 'Itinerary', Icon: Calendar },
                  { id: 'inclusions', label: 'Inclusions', Icon: CheckCircle2 },
                  { id: 'hotels', label: 'Hotels', Icon: Hotel }
                ].map(({ id, label, Icon }) => (
                  <button 
                    key={id} 
                    onClick={() => scrollToSection(id)} 
                    className={`flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      activeSection === id 
                        ? 'bg-gradient-to-r from-teal to-teal/80 text-white shadow-md' 
                        : 'text-brand-muted-ink hover:bg-brand-canvas-2 hover:text-brand-ink'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* All Sections - Scrollable Content */}
            <div className="space-y-4">

            {/* Overview Section */}
            <div id="overview" className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Overview</h2>
              <p className="text-darkBlue/80 leading-relaxed mb-4">
                {detail?.overview || ''}
              </p>
              {detail?.highlights && detail.highlights.length > 0 && (
                <div className="bg-gradient-to-br from-sky-50 dark:from-sky-950/30 to-blue-50 dark:to-blue-950/30 rounded-lg p-5 border-l-4 border-teal">
                  <h6 className="text-darkBlue font-bold mb-3 flex items-center gap-2 text-lg">
                    <Star className="w-4 h-4 text-orange" /> {detail?.title || ''}
                  </h6>
                  <ul className="list-disc pl-5 space-y-2 text-darkBlue/80">
                    {detail.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Itinerary Section */}
            <div id="itinerary" className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Day-wise Itinerary</h2>
              <div className="space-y-4">
                {detail?.itinerary?.days && detail.itinerary.days.length > 0 ? (
                  detail.itinerary.days.map((day, idx) => (
                    <div key={day._key || idx} className="bg-gradient-to-r from-sky-50 dark:from-sky-950/30 to-blue-50 dark:to-blue-950/30 p-5 rounded-lg border-l-4 border-orange">
                      <h5 className="text-darkBlue font-bold text-lg flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-orange text-white rounded-full text-sm font-bold shadow-md">{idx + 1}</span>
                        {day.title || `Day ${idx + 1}`}
                      </h5>
                      <div className="text-darkBlue/80 ml-10 space-y-2">
                        <p>{day.description || ''}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-brand-muted-ink">Itinerary details coming soon...</p>
                )}
              </div>
            </div>

            {/* Inclusions Section */}
            <div id="inclusions" className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Inclusions & Exclusions</h2>
              <div>
                <div className="bg-gradient-to-br from-green-50 dark:from-green-950/30 to-emerald-50 dark:to-emerald-950/30 rounded-lg p-5 mb-4 border-l-4 border-teal">
                  <h5 className="text-teal font-bold mb-4 text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal" />What's Included
                  </h5>
                  <ul className="space-y-3">
                    {detail?.inclusions && detail.inclusions.length > 0 ? (
                      detail.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-darkBlue">
                          <CheckCircle2 className="w-4 h-4 text-teal mt-1 flex-shrink-0" /> 
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-brand-muted-ink">Inclusion details coming soon...</li>
                    )}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-50 dark:from-red-950/30 to-pink-50 dark:to-pink-950/30 rounded-lg p-5 border-l-4 border-red-400 dark:border-red-600">
                  <h5 className="text-red-600 dark:text-red-400 font-bold mb-4 text-lg flex items-center gap-2">
                    <XCircle className="w-4 h-4" />What's Not Included
                  </h5>
                  <ul className="space-y-3">
                    {detail?.exclusions && detail.exclusions.length > 0 ? (
                      detail.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-red-800 dark:text-red-300">
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" /> 
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-brand-muted-ink">Exclusion details coming soon...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hotels Section */}
            <div id="hotels" className="bg-surface rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Accommodation Details</h2>
              <p className="mb-4 font-semibold text-lg text-darkBlue">
                {detail?.hotels?.title || `${destination?.split(',')[0] || ''} Hotel Options:`}
              </p>
              <ul className="space-y-3">
                {detail?.hotels?.options && detail.hotels.options.length > 0 ? (
                  detail.hotels.options.map((hotel, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gradient-to-r from-sky-50 dark:from-sky-950/30 to-blue-50 dark:to-blue-950/30 p-4 rounded-lg border-l-4 border-teal">
                      <Building2 className="w-5 h-5 text-teal mt-1 flex-shrink-0" /> 
                      <span>{hotel}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-brand-muted-ink">Hotel details coming soon...</li>
                )}
              </ul>
              <div className="mt-5 bg-gradient-to-r from-amber-50 dark:from-amber-950/30 to-yellow-50 dark:to-yellow-950/30 p-4 rounded-lg border-l-4 border-orange">
                <p className="text-sm text-darkBlue font-medium">
                  <Info className="w-4 h-4 mr-2 text-orange" />
                  {detail?.hotels?.note || '*Hotels subject to availability. Similar category accommodation guaranteed.'}
                </p>
              </div>
            </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <aside className="lg:col-span-1">
            <div className="bg-surface rounded-2xl shadow p-5 lg:sticky lg:top-24">
              <div className="text-center rounded-xl p-6 bg-gradient-to-br from-[#E4EEF0] via-[#d4f1f4] to-[#bde5e8] dark:from-teal/25 dark:via-teal/20 dark:to-teal/10 shadow-lg border-2 border-[#075056]/10 dark:border-teal/30">
                <div className="text-xs text-teal font-semibold mb-2 uppercase tracking-widest">Starting from</div>
                {detail?.strikePrice && (
                  <div className="text-lg text-red-400 line-through mb-1">₹{Number(detail.strikePrice).toLocaleString('en-IN')}</div>
                )}
                <div className="text-5xl font-extrabold text-teal mb-1 drop-shadow-md">
                  ₹{(detail?.price ? Number(detail.price) : 0).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-teal/80 font-semibold mt-2">Per Person on twin sharing</div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-brand-muted-ink block">Travel Date</label>
                <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="mm/dd/yyyy" />
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-brand-muted-ink block">Adult (12+)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={() => setAdult(a => Math.max(1, a - 1))}>-</button>
                    <input readOnly value={adult} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={() => setAdult(a => a + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-brand-muted-ink block">Child (&lt;12)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={() => setChild(c => Math.max(0, c - 1))}>-</button>
                    <input readOnly value={child} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={() => setChild(c => c + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href={`tel:${companyInfo?.phone?.primary || ''}`} className="flex-1 bg-orange text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal text-center whitespace-nowrap">
                  <Phone className="w-4 h-4 mr-1 sm:mr-2" />Call
                </a>
                <a href={`https://wa.me/${companyInfo?.phone?.whatsapp || ''}?text=${encodeURIComponent(`Hi, I want to know more about *${detail?.title || ''}* package`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center whitespace-nowrap" style={{background:'#25D366'}}>
                  <WhatsAppIcon className="w-4 h-4 mr-1 sm:mr-2" />WhatsApp
                </a>
              </div>

              <button className="mt-3 w-full custom-btn" onClick={handleBookNow}>Book Now</button>

              <div className="mt-5 pt-4 border-t text-sm text-brand-muted-ink space-y-2">
                <div>
                  <Phone className="w-4 h-4 text-primary mr-2" />
                  <a href={`tel:${companyInfo?.phone?.primary || ''}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {companyInfo?.phone?.primary || ''}
                  </a>
                </div>
                <div>
                  <Mail className="w-4 h-4 text-primary mr-2" />
                  <a href={`mailto:${companyInfo?.email?.primary || ''}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {companyInfo?.email?.primary || ''}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Packages */}
        {similarPackages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-season font-bold text-darkBlue mb-6">Similar Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  destination={`/destinations/${type}/${category}/${pkg.slug?.current || slugify(pkg.title)}`}
                  category={category}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-orange hover:bg-teal text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Booking Modal (simplified - you can expand this) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-season font-bold text-darkBlue mb-4">Contact Us</h3>
            <p className="text-darkBlue/80 mb-6">
              Thank you for your interest! Please contact us to complete your booking.
            </p>
            <div className="space-y-3 mb-6">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange" />
                <span>{companyInfo?.phone?.primary || ''}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange" />
                <span>{companyInfo?.email?.primary || ''}</span>
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-orange hover:bg-teal text-white font-poppins font-semibold py-3 rounded-full transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

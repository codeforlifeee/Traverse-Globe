// DestinationDetail Component
// Dynamic component that displays package details for any destination
// Works with new routing: /destinations/:type/:category/:slug

import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { companyInfo } from '../../data/siteData';
import { getCategoryBySlug } from '../../data/categoryConfig';
import { useDestinations } from '../../hooks/useDestinations';
import { usePackageDetail } from '../../hooks/usePackageDetail';
import { slugify } from '../../utils/slug';
import PackageCard from '../../components/PackageCard';

export default function DestinationDetail() {
  const { type, category, slug } = useParams();

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
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{detail?.title || ''}</h1>
        <p className="text-gray-600 mt-1">
          <i className="fa-solid fa-map-marker-alt" /> {destination}
          {' | '}
          <i className="fa-solid fa-calendar" /> {detail?.duration || ''}
          {' | '}
          <i className="fa-solid fa-star text-yellow-400" /> {detail?.rating || 0} ({detail?.reviews || 0} Reviews)
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
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
            <div className="bg-white rounded-2xl shadow-lg mb-4 sticky top-20 z-10">
              <div className="flex gap-2 px-2 md:px-4 py-3 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: 'fa-info-circle' },
                  { id: 'itinerary', label: 'Itinerary', icon: 'fa-calendar-alt' },
                  { id: 'inclusions', label: 'Inclusions', icon: 'fa-check-circle' },
                  { id: 'hotels', label: 'Hotels', icon: 'fa-hotel' }
                ].map(({ id, label, icon }) => (
                  <button 
                    key={id} 
                    onClick={() => scrollToSection(id)} 
                    className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      activeSection === id 
                        ? 'bg-gradient-to-r from-[#075056] to-[#0a6b72] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-[#E4EEF0] hover:text-[#16232A]'
                    }`}
                  >
                    <i className={`fa-solid ${icon} mr-2`}></i>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* All Sections - Scrollable Content */}
            <div className="space-y-4">

            {/* Overview Section */}
            <div id="overview" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Overview</h2>
              <p className="text-darkBlue/80 leading-relaxed mb-4">
                {detail?.overview || ''}
              </p>
              {detail?.highlights && detail.highlights.length > 0 && (
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg p-5 border-l-4 border-teal">
                  <h6 className="text-darkBlue font-bold mb-3 flex items-center gap-2 text-lg">
                    <i className="fa-solid fa-star text-orange"/> {detail?.title || ''}
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
            <div id="itinerary" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Day-wise Itinerary</h2>
              <div className="space-y-4">
                {detail?.itinerary?.days && detail.itinerary.days.length > 0 ? (
                  detail.itinerary.days.map((day, idx) => (
                    <div key={day._key || idx} className="bg-gradient-to-r from-sky-50 to-blue-50 p-5 rounded-lg border-l-4 border-orange">
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
                  <p className="text-gray-500">Itinerary details coming soon...</p>
                )}
              </div>
            </div>

            {/* Inclusions Section */}
            <div id="inclusions" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Inclusions & Exclusions</h2>
              <div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 mb-4 border-l-4 border-teal">
                  <h5 className="text-teal font-bold mb-4 text-lg flex items-center gap-2">
                    <i className="fa-solid fa-check-circle text-teal"/>What's Included
                  </h5>
                  <ul className="space-y-3">
                    {detail?.inclusions && detail.inclusions.length > 0 ? (
                      detail.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-darkBlue">
                          <i className="fa-solid fa-check-circle text-teal mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Inclusion details coming soon...</li>
                    )}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-5 border-l-4 border-red-400">
                  <h5 className="text-red-600 font-bold mb-4 text-lg flex items-center gap-2">
                    <i className="fa-solid fa-times-circle"/>What's Not Included
                  </h5>
                  <ul className="space-y-3">
                    {detail?.exclusions && detail.exclusions.length > 0 ? (
                      detail.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-red-800">
                          <i className="fa-solid fa-times-circle text-red-600 mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Exclusion details coming soon...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Hotels Section */}
            <div id="hotels" className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-season font-bold text-darkBlue mb-4">Accommodation Details</h2>
              <p className="mb-4 font-semibold text-lg text-darkBlue">
                {detail?.hotels?.title || `${destination?.split(',')[0] || ''} Hotel Options:`}
              </p>
              <ul className="space-y-3">
                {detail?.hotels?.options && detail.hotels.options.length > 0 ? (
                  detail.hotels.options.map((hotel, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-lg border-l-4 border-teal">
                      <i className="fa-solid fa-building text-teal mt-1 flex-shrink-0 text-xl"/> 
                      <span>{hotel}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">Hotel details coming soon...</li>
                )}
              </ul>
              <div className="mt-5 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border-l-4 border-orange">
                <p className="text-sm text-darkBlue font-medium">
                  <i className="fa-solid fa-info-circle mr-2 text-orange"></i>
                  {detail?.hotels?.note || '*Hotels subject to availability. Similar category accommodation guaranteed.'}
                </p>
              </div>
            </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-5 lg:sticky lg:top-24">
              <div className="text-center rounded-xl p-6 bg-gradient-to-br from-[#E4EEF0] via-[#d4f1f4] to-[#bde5e8] shadow-lg border-2 border-[#075056]/10">
                <div className="text-xs text-[#075056] font-semibold mb-2 uppercase tracking-widest">Starting from</div>
                {detail?.strikePrice && (
                  <div className="text-lg text-red-400 line-through mb-1">₹{Number(detail.strikePrice).toLocaleString('en-IN')}</div>
                )}
                <div className="text-5xl font-extrabold text-[#075056] mb-1 drop-shadow-md">
                  ₹{(detail?.price ? Number(detail.price) : 0).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#075056]/80 font-semibold mt-2">Per Person on twin sharing</div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-700 block">Travel Date</label>
                <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="mm/dd/yyyy" />
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700 block">Adult (12+)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={() => setAdult(a => Math.max(1, a - 1))}>-</button>
                    <input readOnly value={adult} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={() => setAdult(a => a + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 block">Child (&lt;12)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={() => setChild(c => Math.max(0, c - 1))}>-</button>
                    <input readOnly value={child} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={() => setChild(c => c + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href={`tel:${companyInfo?.phone?.primary || ''}`} className="flex-1 bg-orange text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal text-center whitespace-nowrap">
                  <i className="fa-solid fa-phone mr-1 sm:mr-2"/>Call
                </a>
                <a href={`https://wa.me/${companyInfo?.phone?.whatsapp || ''}?text=${encodeURIComponent(`Hi, I want to know more about *${detail?.title || ''}* package`)}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center whitespace-nowrap" style={{background:'#25D366'}}>
                  <i className="fa-brands fa-whatsapp mr-1 sm:mr-2"/>WhatsApp
                </a>
              </div>

              <button className="mt-3 w-full custom-btn" onClick={handleBookNow}>Book Now</button>

              <div className="mt-5 pt-4 border-t text-sm text-gray-600 space-y-2">
                <div>
                  <i className="fa-solid fa-phone text-primary mr-2"/>
                  <a href={`tel:${companyInfo?.phone?.primary || ''}`} className="text-blue-600 hover:underline">
                    {companyInfo?.phone?.primary || ''}
                  </a>
                </div>
                <div>
                  <i className="fa-solid fa-envelope text-primary mr-2"/>
                  <a href={`mailto:${companyInfo?.email?.primary || ''}`} className="text-blue-600 hover:underline">
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
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}

      {/* Booking Modal (simplified - you can expand this) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-season font-bold text-darkBlue mb-4">Contact Us</h3>
            <p className="text-darkBlue/80 mb-6">
              Thank you for your interest! Please contact us to complete your booking.
            </p>
            <div className="space-y-3 mb-6">
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-phone text-orange"></i>
                <span>{companyInfo?.phone?.primary || ''}</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-orange"></i>
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

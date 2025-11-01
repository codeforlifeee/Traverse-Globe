import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { packageDetails, uaePackages, baliPackages, thailandPackages, singaporePackages } from '../data/siteData';
import { slugify } from '../utils/slug';
import PackageCard from '../components/PackageCard';

export default function PackageDetails() {
  const { slug } = useParams();

  // Resolve detail either by numeric id or slug of name
  let resolvedId = Number.isFinite(Number(slug)) ? Number(slug) : null;
  let detail = resolvedId ? packageDetails[resolvedId] : null;

  if (!detail && typeof slug === 'string') {
    // find by slug of detail.name
    const matchEntry = Object.entries(packageDetails).find(([, d]) => slugify(d?.name) === slug);
    if (matchEntry) {
      resolvedId = Number(matchEntry[0]);
      detail = matchEntry[1];
    }
  }
  const pkgId = resolvedId ?? -1;
  const listMeta = useMemo(() => {
    const all = [
      ...uaePackages.map(p => ({...p, _cat: 'uae'})),
      ...baliPackages.map(p => ({...p, _cat: 'bali'})),
      ...thailandPackages.map(p => ({...p, _cat: 'thailand'})),
      ...singaporePackages.map(p => ({...p, _cat: 'singapore'})),
    ];
    return all.find(p => p.id === pkgId);
  }, [pkgId]);

  // Get similar packages based on category
  const similarPackages = useMemo(() => {
    if (!listMeta) return [];
    
    let categoryPackages = [];
    if (listMeta._cat === 'uae') {
      categoryPackages = uaePackages;
    } else if (listMeta._cat === 'bali') {
      categoryPackages = baliPackages;
    } else if (listMeta._cat === 'thailand') {
      categoryPackages = thailandPackages;
    } else if (listMeta._cat === 'singapore') {
      categoryPackages = singaporePackages;
    }
    
    // Filter out current package and limit to 3 packages
    return categoryPackages.filter(p => p.id !== pkgId).slice(0, 3);
  }, [listMeta, pkgId]);

  const images = detail?.images || [];
  const [active, setActive] = useState(images[0] || '');
  const [activeSection, setActiveSection] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const destination = detail?.destination || '—';

  useEffect(() => {
    setActive(images[0] || '');
  }, [pkgId]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'itinerary', 'inclusions', 'hotels'];
      const scrollPosition = window.scrollY + 200;

      // Show back to top button
      setShowBackToTop(window.scrollY > 300);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const onImgError = (e) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x450/DAA520/FFFFFF?text=Package+Image';
  };

  const onThumbError = (e, idx) => {
    e.currentTarget.src = `https://via.placeholder.com/200x100/DAA520/FFFFFF?text=Image+${idx+1}`;
  };

  const subtitle = (
    <span>
      <i className="fas fa-map-marker-alt" /> {destination}
      {' '}
      {listMeta?.nights ? (<span>| <i className="fas fa-calendar" /> {listMeta.nights}</span>) : (<span>| <i className="fas fa-calendar" /> Multi-Day</span>)}
      {' '}| <i className="fas fa-star text-yellow-400" /> 4.8 (256 Reviews)
    </span>
  );

  const overviewList = getOverviewList(pkgId, detail?.name);
  const itinerary = getItinerary(pkgId, destination);

  if (!detail) {
    return (
      <div className="min-h-screen pt-20 pb-10 container mx-auto px-4">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-2xl">Package not found. <Link to="/uae-packages" className="text-primary underline">Go back to packages</Link></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <span className="mx-2">/</span>
          {(() => {
            const cat = listMeta?._cat;
            const map = {
              uae: { path: '/uae-packages', label: 'UAE Packages' },
              bali: { path: '/bali-packages', label: 'Bali Packages' },
              thailand: { path: '/thailand-packages', label: 'Thailand Packages' },
              singapore: { path: '/singapore-packages', label: 'Singapore Packages' },
            };
            const item = cat ? map[cat] : null;
            return item ? (
              <>
                <Link to={item.path} className="text-primary hover:underline">{item.label}</Link>
                <span className="mx-2">/</span>
              </>
            ) : null;
          })()}
          <span>{detail.name}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{detail.name}</h1>
        <p className="text-gray-600 mt-1">{subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left: gallery + tabs */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow p-4 mb-4">
              {active && (
                <img src={active} onError={onImgError} alt="Main" className="w-full h-80 md:h-[450px] object-cover rounded-xl" />
              )}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.map((src, idx) => (
                  <button key={idx} className={`rounded-lg overflow-hidden border ${active===src ? 'border-primary' : 'border-transparent'}`} onClick={() => setActive(src)}>
                    <img src={src} onError={(e)=>onThumbError(e, idx)} alt={`thumb-${idx}`} className="w-full h-20 object-cover" />
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
                    <i className={`fas ${icon} mr-2`}></i>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* All Sections - Scrollable Content */}
            <div className="space-y-4">
              {/* Overview Section */}
              <div id="overview" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-info-circle text-[#FF5B04]"></i>
                  Overview
                </h3>
                <div className="text-gray-700 space-y-3">
                  <p>Discover the allure of {destination.split(',')[0]} with our exclusive tour package! Explore iconic landmarks, enjoy thrilling adventures and world-class shopping. With comfortable stays, guided tours, and seamless transfers, experience the perfect blend of adventure, luxury, and culture.</p>
                  <div className="bg-gradient-to-br from-[#d4f1f4] via-[#E4EEF0] to-[#cfe9ec] rounded-lg p-6 shadow-md border-l-4 border-[#075056]">
                    <h6 className="text-[#16232A] font-bold mb-3 flex items-center gap-2 text-lg">
                      <i className="fas fa-star text-[#FF5B04]"/> {detail.name}
                    </h6>
                    <ul className="list-disc pl-5 space-y-2 text-[#16232A]">
                      {overviewList.map((li,i)=>(<li key={i}>{li}</li>))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Itinerary Section */}
              <div id="itinerary" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-[#FF5B04]"></i>
                  Day-wise Itinerary
                </h3>
                <div className="space-y-4">
                  {itinerary.map((day, idx)=> (
                    <div key={idx} className="bg-gradient-to-r from-[#E4EEF0] via-[#f5fafb] to-[#E4EEF0] p-5 rounded-xl border-l-4 border-[#FF5B04] shadow-md hover:shadow-lg transition-all duration-300">
                      <h5 className="text-[#16232A] font-bold text-lg flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 bg-[#FF5B04] text-white rounded-full text-sm font-bold shadow-md">{idx + 1}</span>
                        {day.title}
                      </h5>
                      <div className="text-gray-700 mt-3 space-y-2 ml-10">
                        {day.paragraphs.map((p, i)=>(<p key={i}>{p}</p>))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions Section */}
              <div id="inclusions" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-check-circle text-[#FF5B04]"></i>
                  Inclusions & Exclusions
                </h3>
                <div className="text-gray-700">
                  <div className="bg-gradient-to-br from-[#d4f1f4] to-[#E4EEF0] rounded-xl p-5 mb-4 shadow-md border-l-4 border-[#075056]">
                    <h5 className="text-[#075056] font-bold mb-4 text-lg flex items-center gap-2">
                      <i className="fas fa-check-circle text-[#075056]"/>What's Included
                    </h5>
                    <ul className="space-y-3">
                      {getInclusions(pkgId).map((item,i)=>(
                        <li key={i} className="flex items-start gap-3 text-[#16232A]">
                          <i className="fas fa-check-circle text-[#075056] mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-xl p-5 shadow-md border-l-4 border-red-400">
                    <h5 className="text-red-600 font-bold mb-4 text-lg flex items-center gap-2">
                      <i className="fas fa-times-circle"/>What's Not Included
                    </h5>
                    <ul className="space-y-3">
                      {getExclusions().map((item,i)=>(
                        <li key={i} className="flex items-start gap-3 text-red-800">
                          <i className="fas fa-times-circle text-red-600 mt-1 flex-shrink-0"/> 
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hotels Section */}
              <div id="hotels" className="bg-white rounded-2xl shadow p-6 scroll-mt-24">
                <h3 className="text-2xl font-bold text-[#16232A] mb-4 flex items-center gap-2">
                  <i className="fas fa-hotel text-[#FF5B04]"></i>
                  Accommodation Details
                </h3>
                <div className="text-gray-700">
                  <p className="mb-4 font-semibold text-lg text-[#16232A]">{destination.split(',')[0]} Hotel Options:</p>
                  <ul className="space-y-3">
                    {getHotels(pkgId, destination).map((h,i)=>(
                      <li key={i} className="flex items-start gap-3 bg-gradient-to-r from-[#E4EEF0] via-[#f5fafb] to-[#E4EEF0] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#075056]">
                        <i className="fas fa-building text-[#075056] mt-1 flex-shrink-0 text-xl"/> 
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 bg-gradient-to-r from-[#fff3e0] to-[#ffe0b2] p-4 rounded-xl shadow-md border-l-4 border-[#FF5B04]">
                    <p className="text-sm text-[#16232A] font-medium">
                      <i className="fas fa-info-circle mr-2 text-[#FF5B04]"></i>
                      *Hotel subject to availability at the time of booking. Similar category hotel will be provided.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow p-5 lg:sticky lg:top-24">
              <div className="text-center rounded-xl p-6 bg-gradient-to-br from-[#E4EEF0] via-[#d4f1f4] to-[#bde5e8] shadow-lg border-2 border-[#075056]/10">
                <div className="text-xs text-[#075056] font-semibold mb-2 uppercase tracking-widest">Starting from</div>
                {listMeta ? (
                  <div>
                    {typeof listMeta.strikePrice === 'number' && (
                      <div className="text-lg text-red-400 line-through mb-1">₹{listMeta.strikePrice.toLocaleString('en-IN')}</div>
                    )}
                    <div className="text-5xl font-extrabold text-[#075056] mb-1 drop-shadow-md">₹{listMeta.price?.toLocaleString ? listMeta.price.toLocaleString('en-IN') : listMeta.price}</div>
                  </div>
                ) : (
                  <div className="text-5xl font-extrabold text-[#075056] mb-1 drop-shadow-md" dangerouslySetInnerHTML={{ __html: detail.priceHTML }} />
                )}
                <div className="text-xs text-[#075056]/80 font-semibold mt-2">Per Person on twin sharing</div>
              </div>

              <div className="mt-4">
                <label className="text-sm text-gray-700 block">Travel Date</label>
                <input type="date" className="mt-1 w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700 block">Adult (12+)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={()=> setAdult(a=> Math.max(1, a-1))}>-</button>
                    <input readOnly value={adult} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={()=> setAdult(a=> a+1)}>+</button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 block">Child (&lt;12)</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <button className="px-3 py-2" onClick={()=> setChild(c=> Math.max(0, c-1))}>-</button>
                    <input readOnly value={child} className="w-full text-center border-l border-r" />
                    <button className="px-3 py-2" onClick={()=> setChild(c=> c+1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a href="tel:+919997085457" className="flex-1 bg-orange text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal text-center whitespace-nowrap"><i className="fas fa-phone mr-1 sm:mr-2"/>Call</a>
                <button onClick={()=>openWhatsApp(detail)} className="flex-1 text-white border-none py-3 px-2 sm:px-4 rounded-full font-poppins font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center whitespace-nowrap" style={{background:'#25D366'}}><i className="fab fa-whatsapp mr-1 sm:mr-2"/>WhatsApp</button>
              </div>

              <button className="mt-3 w-full custom-btn" onClick={()=>setShowModal(true)}>Book Now</button>

              <div className="mt-5 pt-4 border-t text-sm text-gray-600 space-y-2">
                <div><i className="fas fa-phone text-primary mr-2"/> +91 99970 85457</div>
                <div><i className="fas fa-envelope text-primary mr-2"/> mail@traverseglobe.com</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center px-4" onClick={()=>setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="px-5 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white flex items-center justify-between">
              <h5 className="font-semibold">Want to Go For A Memorable Holiday?</h5>
              <button onClick={()=>setShowModal(false)} className="text-white text-xl">×</button>
            </div>
            <div className="p-5">
              <form onSubmit={(e)=>handleBookingSubmit(e, detail, {adult, child, infant}, ()=>setShowModal(false))} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Package Name</label>
                  <input readOnly value={detail.name} className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50" />
                </div>
                <h6 className="font-bold">Personal Details</h6>
                <div>
                  <label className="text-sm">Name</label>
                  <input required placeholder="Your Name" className="mt-1 w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm">Mobile No.</label>
                  <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                    <span className="px-3 py-2 bg-gray-50 border-r">+91</span>
                    <input required pattern="[0-9]{10}" placeholder="Mobile No." className="flex-1 px-3 py-2 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm">Email ID</label>
                  <input required type="email" placeholder="Your E-mail Address" className="mt-1 w-full border rounded-lg px-3 py-2" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm">Adult</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setAdult(a=> Math.max(1, a-1))}>-</button>
                      <input readOnly value={adult} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setAdult(a=> a+1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Child</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setChild(c=> Math.max(0, c-1))}>-</button>
                      <input readOnly value={child} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setChild(c=> c+1)}>+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm">Infant</label>
                    <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                      <button type="button" className="px-3 py-2" onClick={()=> setInfant(i=> Math.max(0, i-1))}>-</button>
                      <input readOnly value={infant} className="w-full text-center border-l border-r" />
                      <button type="button" className="px-3 py-2" onClick={()=> setInfant(i=> i+1)}>+</button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full custom-btn">Submit Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Similar Packages Section */}
      {similarPackages.length > 0 && (
  <div className="container mx-auto px-4 mt-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-darkBlue font-poppins mb-2">
              Similar Packages You May Like
            </h2>
            <p className="text-gray-600 font-canva-sans">
              Explore more amazing {listMeta?._cat?.toUpperCase() || 'destinations'} packages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} category={listMeta?._cat} />
            ))}
          </div>
          
          {/* View All Link */}
          <div className="text-center mt-8">
            <Link 
              to={`/${listMeta?._cat}-packages`}
              className="inline-flex items-center gap-2 bg-orange text-white px-8 py-3 rounded-full font-poppins font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-teal"
            >
              View All {listMeta?._cat?.toUpperCase() || 'Tour'} Packages
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

function openWhatsApp(detail){
  const message = `Hi, I want to know more about *${detail.name}* package (${detail.priceHTML.replace(/<[^>]+>/g,'')})`;
  const phone = '919997085457';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function handleBookingSubmit(e, detail, counts, close){
  e.preventDefault();
  alert('Booking submitted successfully! We will contact you soon.');
  close();
}

function getOverviewList(id, name){
  const base = [
    'Arrival in city with Hotel Transfer and Dhow Cruise Dinner',
    'Half-Day City Tour with Burj Khalifa (124th Floor)',
    'Desert Safari Adventure with BBQ Dinner and Entertainment',
    'Comfortable hotel accommodation with daily breakfast',
    'All transfers in private AC vehicle',
    'Professional English-speaking tour guide',
  ];

  const idNum = Number(id);
  if ([2,5,8].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', base[3], base[4]
    ];
  }
  if ([3,6,9].includes(idNum)) {
    return [
      base[0], base[1], base[2], 'Dubai Miracle Garden and Global Village Visit', 'Full-Day Abu Dhabi City Tour with Sheikh Zayed Grand Mosque', base[3]
    ];
  }
  if (idNum>=11 && idNum<=25){
    // Generic for Bali/Thailand/Singapore
    return [
      'Airport transfers and accommodation',
      'Daily breakfast at hotel',
      'Sightseeing tours with professional guide',
      'Cultural experiences and activities',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

function getItinerary(id, destination){
  const city = destination.split(',')[0];
  const commonDay1 = {
    title: 'Day 1: Arrival | Hotel Transfer | Dhow Cruise Dinner',
    paragraphs: [
      `Welcome to ${city}! Upon arrival at the airport, our representative will assist with a smooth transfer to the hotel.`,
      'Check-in and relax after your journey and soak in the first glimpses of this amazing city.',
      'Evening Dhow Cruise: Enjoy a buffet dinner, live entertainment, and stunning night views of the skyline.'
    ]
  };
  const day2 = {
    title: 'Day 2: Half-Day City Tour | Burj Khalifa (124th – Non-Prime)',
    paragraphs: [
      `Explore the city’s blend of heritage and modernity: Jumeirah Mosque, Burj Al Arab, Palm Jumeirah, Atlantis photo stop, and Al Fahidi district.`,
      'Afternoon free at leisure for shopping or relaxation.',
      'Evening visit to Burj Khalifa with mesmerizing Fountain Show.'
    ]
  };
  const day3 = {
    title: 'Day 3: Desert Safari Adventure with BBQ Dinner',
    paragraphs: [
      'Morning at leisure.',
      'Afternoon dune bashing, sandboarding, camel rides, and a BBQ dinner with live shows under the stars.'
    ]
  };
  const miracleVillage = {
    title: 'Day 4: Dubai Miracle Garden | Global Village',
    paragraphs: [
      'Stroll through Miracle Garden’s spectacular floral displays.',
      'Experience Global Village’s pavilions, cuisines, shopping and live performances.'
    ]
  };
  const abuDhabi = {
    title: 'Day 5: Abu Dhabi City Tour',
    paragraphs: [
      'Visit Sheikh Zayed Grand Mosque, drive along the Corniche, photo stop at Emirates Palace and Ferrari World (outside view).'
    ]
  };

  const idNum = Number(id);
  if ([1,4,7].includes(idNum)) {
    return [commonDay1, day2, day3, {title:'Day 4: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  if ([2,5,8].includes(idNum)) {
    return [commonDay1, day2, day3, miracleVillage, {title:'Day 5: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  if ([3,6,9].includes(idNum)) {
    return [commonDay1, day2, day3, miracleVillage, abuDhabi, {title:'Day 6: Departure', paragraphs:['Breakfast at hotel. Check-out & transfer to airport for your onward journey.']}];
  }
  // Generic for other destinations (4-day template)
  return [
    { title: 'Day 1: Arrival', paragraphs:[`Welcome to ${city}! Airport transfer to hotel and check-in. Evening at leisure.`] },
    { title: 'Day 2: Sightseeing', paragraphs:['Full day city tour and cultural experiences with professional guide.'] },
    { title: 'Day 3: Activities', paragraphs:['Adventure activities, shopping, and local experiences.'] },
    { title: 'Final Day: Departure', paragraphs:['Check-out and transfer to airport for departure.'] },
  ];
}

function getInclusions(id){
  const idNum = Number(id);
  const base = [
    'Accommodation with daily breakfast',
    'Airport transfers (arrival & departure)',
    'City tour with professional guide',
    'All transfers in private AC vehicle',
  ];
  if (idNum>=1 && idNum<=10){
    return [
      '3/4/5 Nights accommodation as per package',
      'Daily breakfast at hotel',
      'Airport transfers (arrival & departure)',
      'Dubai City Tour with professional guide',
      'Burj Khalifa 124th floor entry tickets',
      'Desert Safari with BBQ dinner',
      'Dhow Cruise with dinner',
      'All transfers in private AC vehicle',
    ];
  }
  return base;
}

function getExclusions(){
  return [
    'International airfare',
    'Visa charges (if applicable)',
    'Travel insurance',
    'Personal expenses and tips',
    'Meals not mentioned in inclusions',
  ];
}

function getHotels(id, destination){
  const idNum = Number(id);
  if (idNum>=1 && idNum<=10){
    return [
      'Ramada by Wyndham Dubai Deira or similar',
      'Citymax Hotel Bur Dubai or similar',
      'Golden Tulip Al Barsha or similar',
    ];
  }
  return [
    `${destination.split(',')[0]} 3-star or similar`,
    `${destination.split(',')[0]} 4-star or similar`,
    `${destination.split(',')[0]} 5-star or similar`,
  ];
}

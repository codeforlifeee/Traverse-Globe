import { useEffect, useState } from 'react';
import { companyInfo } from '../data/siteData';

const DEFAULT_LEAD_API_PATH = '/api/lead-webhook';

function buildLeadMessage(leadPayload) {
  return [
    'New booking enquiry',
    `Package: ${leadPayload.packageName}`,
    `Name: ${leadPayload.fullName}`,
    `Mobile: ${leadPayload.mobile}`,
    `Email: ${leadPayload.email}`,
    `Travelers: ${leadPayload.travelers.total} (Adult: ${leadPayload.travelers.adult}, Child: ${leadPayload.travelers.child}, Infant: ${leadPayload.travelers.infant})`,
    `Page: ${leadPayload.page.url}`,
  ].join('\n');
}

function isSameOriginUrl(url) {
  try {
    const resolved = new URL(url, window.location.origin);
    return resolved.origin === window.location.origin;
  } catch {
    return false;
  }
}

export default function BookingModal({ open, onClose, packageName }) {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Reset counters each time the modal opens
    if (open) {
      setAdult(2);
      setChild(0);
      setInfant(0);
      setFullName('');
      setMobile('');
      setEmail('');
      setSubmitMessage('');
      setSubmitError('');
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const leadEndpoint = (import.meta.env.VITE_LEAD_WEBHOOK_URL || DEFAULT_LEAD_API_PATH).trim();
      const leadPayload = {
        fullName,
        mobile: `+91${mobile}`,
        email,
        packageName: packageName || 'General Travel Enquiry',
        travelers: {
          adult,
          child,
          infant,
          total: totalTravelers,
        },
        page: {
          path: window.location.pathname,
          url: window.location.href,
          title: document.title,
        },
      };

      const sameOrigin = isSameOriginUrl(leadEndpoint);
      const response = await fetch(leadEndpoint, sameOrigin
        ? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadPayload),
          }
        : {
            method: 'POST',
            // Use a CORS-safelisted content type to skip preflight on webhook endpoints.
            headers: {
              'Content-Type': 'text/plain;charset=UTF-8',
            },
            body: JSON.stringify(leadPayload),
          });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setSubmitMessage('Request submitted successfully. Our team will contact you shortly.');
      setFullName('');
      setMobile('');
      setEmail('');

      setTimeout(() => {
        onClose?.();
      }, 1200);
    } catch (error) {
      const fallbackMessage = buildLeadMessage({
        fullName,
        mobile: `+91${mobile}`,
        email,
        packageName: packageName || 'General Travel Enquiry',
        travelers: {
          adult,
          child,
          infant,
          total: totalTravelers,
        },
        page: {
          path: window.location.pathname,
          url: window.location.href,
          title: document.title,
        },
      });

      const fallbackWhatsapp = String(import.meta.env.VITE_LEAD_WHATSAPP || companyInfo?.phone?.whatsapp || '').replace(/\D/g, '');
      const fallbackEmail = String(import.meta.env.VITE_LEAD_EMAIL || companyInfo?.email?.primary || '').trim();

      if (fallbackWhatsapp) {
        const whatsappUrl = `https://wa.me/${fallbackWhatsapp}?text=${encodeURIComponent(fallbackMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setSubmitMessage('Direct submit is unavailable right now. WhatsApp has been opened with your enquiry details.');
        return;
      }

      if (fallbackEmail) {
        const subject = encodeURIComponent(`Booking Enquiry: ${packageName || 'General Travel Enquiry'}`);
        const body = encodeURIComponent(fallbackMessage);
        window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
        setSubmitMessage('Direct submit is unavailable right now. Your email app has been opened with enquiry details.');
        return;
      }

      setSubmitError('Unable to submit right now. Please contact us via phone or WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalTravelers = adult + child + infant;

  return (
    <div 
      className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 animate-fadeIn" 
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all animate-slideUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
  <div className="px-5 py-4 bg-gradient-to-r from-orange to-orange/90 text-white relative overflow-hidden">
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <h5 className="font-bold font-poppins text-lg md:text-xl mb-1">Plan Your Dream Holiday</h5>
              <p className="text-white/90 text-sm font-canva-sans">Fill in your details and our travel experts will contact you</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white text-3xl leading-none hover:rotate-90 transition-transform duration-300 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 ml-4"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
  <div className="p-5 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-5" id="bookingForm">
            {/* Package Name - Highlighted */}
            <div className="bg-orange/5 rounded-xl p-4 border border-orange/20">
              <label className="text-xs uppercase tracking-wider font-semibold text-orange/80 font-poppins mb-2 block">
                Selected Package
              </label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-orange text-xl">
                  <i className="fa-solid fa-suitcase"></i>
                </div>
                <input
                  readOnly
                  value={packageName || ''}
                  className="flex-1 bg-transparent text-darkBlue font-semibold text-base font-poppins outline-none"
                />
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-darkBlue/10 flex items-center justify-center">
                  <i className="fa-solid fa-user text-darkBlue"></i>
                </div>
                <h6 className="font-bold text-darkBlue font-poppins text-base">Personal Details</h6>
              </div>

              {/* Name Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-darkBlue/40">
                    <i className="fa-solid fa-user text-sm"></i>
                  </div>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/10 transition-all font-canva-sans"
                  />
                </div>
              </div>

              {/* Mobile Number Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-stretch border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/10 transition-all">
                  <span className="px-4 py-3 bg-gray-50 border-r-2 border-gray-200 font-semibold text-darkBlue font-canva-sans flex items-center text-sm gap-1">
                    <i className="fa-solid fa-phone text-xs"></i>
                    +91
                  </span>
                  <input
                    required
                    pattern="[0-9]{10}"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-3 outline-none font-canva-sans text-sm"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-darkBlue/40">
                    <i className="fa-solid fa-envelope text-sm"></i>
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full border-2 border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/10 transition-all font-canva-sans"
                  />
                </div>
              </div>
            </div>

            {/* Travelers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-darkBlue/10 flex items-center justify-center">
                    <i className="fa-solid fa-users text-darkBlue"></i>
                  </div>
                  <h6 className="font-bold text-darkBlue font-poppins text-base">Number of Travelers</h6>
                </div>
                <span className="bg-orange text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {totalTravelers}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Adult Counter */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-user text-blue-600"></i>
                    <div>
                      <div>Adult</div>
                      <div className="text-xs font-normal text-darkBlue/60">12+ years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-blue-200 rounded-lg overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-blue-50 active:bg-blue-100 transition-colors font-bold text-base text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setAdult((a) => Math.max(1, a - 1))}
                      disabled={adult <= 1}
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={adult}
                        className="w-full text-center font-bold text-lg text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-blue-50 active:bg-blue-100 transition-colors font-bold text-base text-darkBlue" 
                      onClick={() => setAdult((a) => a + 1)}
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>

                {/* Child Counter */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-child text-green-600"></i>
                    <div>
                      <div>Child</div>
                      <div className="text-xs font-normal text-darkBlue/60">2-12 years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-green-200 rounded-lg overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-green-50 active:bg-green-100 transition-colors font-bold text-base text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setChild((c) => Math.max(0, c - 1))}
                      disabled={child <= 0}
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={child}
                        className="w-full text-center font-bold text-lg text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-green-50 active:bg-green-100 transition-colors font-bold text-base text-darkBlue" 
                      onClick={() => setChild((c) => c + 1)}
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>

                {/* Infant Counter */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-baby text-pink-600"></i>
                    <div>
                      <div>Infant</div>
                      <div className="text-xs font-normal text-darkBlue/60">0-2 years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-pink-200 rounded-lg overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-pink-50 active:bg-pink-100 transition-colors font-bold text-base text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setInfant((i) => Math.max(0, i - 1))}
                      disabled={infant <= 0}
                    >
                      <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={infant}
                        className="w-full text-center font-bold text-lg text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-2.5 hover:bg-pink-50 active:bg-pink-100 transition-colors font-bold text-base text-darkBlue" 
                      onClick={() => setInfant((i) => i + 1)}
                    >
                      <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange to-orange/90 hover:from-teal hover:to-teal/90 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all duration-300 font-poppins text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Request...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Submit Booking Request</span>
                </>
              )}
            </button>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-canva-sans">
                {submitError}
              </div>
            )}

            {submitMessage && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 font-canva-sans">
                {submitMessage}
              </div>
            )}

            {/* Privacy Note */}
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <i className="fa-solid fa-shield-halved text-green-600 text-lg mt-0.5"></i>
              <p className="text-xs text-darkBlue/70 font-canva-sans leading-relaxed">
                <span className="font-semibold text-darkBlue">Secure Booking:</span> Your information is protected and will only be used to process your travel request. Our team will contact you within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

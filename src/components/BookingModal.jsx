import { AlertCircle, Baby, Mail, Minus, PersonStanding, Phone, Plus, Send, ShieldCheck, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import { cn } from '@/lib/utils';
import { trackQuoteClick } from '@/lib/analytics';
import { companyInfo } from '../data/companyInfo';

const DEFAULT_LEAD_API_PATH = '/api/lead-webhook';

function buildLeadMessage(leadPayload) {
  return [
    'New booking enquiry',
    `Package: ${leadPayload.packageName}`,
    ...(leadPayload.packageId ? [`Package ID: ${leadPayload.packageId}`] : []),
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

export default function BookingModal({ open, onClose, packageName, packageId, basePrice }) {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  // Which fields the user has interacted with — so errors only show after a blur,
  // not while someone is still typing their first character (NNG: error prevention).
  const [touched, setTouched] = useState({ fullName: false, mobile: false, email: false });

  const totalTravelers = adult + child + infant;

  // Inline validation. Submit stays disabled until all three are valid.
  const nameValid = fullName.trim().length >= 2;
  const mobileValid = /^[0-9]{10}$/.test(mobile);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = nameValid && mobileValid && emailValid;
  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));
  // true once a field is both invalid and blurred — drives the red border + aria-invalid.
  const showError = (valid, field) => !valid && touched[field];

  useEffect(() => {
    // Reset the form each time the modal opens. Radix Dialog handles body-scroll
    // locking and focus trapping, so we no longer touch document.body styles here.
    if (open) {
      setAdult(2);
      setChild(0);
      setInfant(0);
      setFullName('');
      setMobile('');
      setEmail('');
      setSubmitMessage('');
      setSubmitError('');
      setTouched({ fullName: false, mobile: false, email: false });
    }
  }, [open]);

  const effectivePackageName = packageName || 'General Travel Enquiry';

  const buildPayload = () => ({
    fullName,
    mobile: `+91${mobile}`,
    email,
    packageName: effectivePackageName,
    // Sanity document _id of the package, when the caller has it — lets the sales
    // team tie a lead back to the exact package doc. Omitted when unavailable.
    ...(packageId ? { packageId } : {}),
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

  const handleWhatsApp = () => {
    const whatsappNumber = String(
      import.meta.env.VITE_LEAD_WHATSAPP || companyInfo?.phone?.whatsapp || ''
    ).replace(/\D/g, '');
    if (!whatsappNumber) return;
    // Funnel step 3: Clicked WhatsApp Quote (secondary CTA).
    trackQuoteClick({ packageId, packageName: effectivePackageName, price: basePrice, method: 'whatsapp' });
    const message = buildLeadMessage(buildPayload());
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) {
      // Surface every field error at once if somehow submitted while invalid.
      setTouched({ fullName: true, mobile: true, email: true });
      return;
    }
    // Funnel step 3: Clicked Quote (primary form submit).
    trackQuoteClick({ packageId, packageName: effectivePackageName, price: basePrice, method: 'form' });
    setSubmitMessage('');
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const leadEndpoint = (import.meta.env.VITE_LEAD_WEBHOOK_URL || DEFAULT_LEAD_API_PATH).trim();
      const leadPayload = buildPayload();

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
      const fallbackMessage = buildLeadMessage(buildPayload());

      const fallbackWhatsapp = String(import.meta.env.VITE_LEAD_WHATSAPP || companyInfo?.phone?.whatsapp || '').replace(/\D/g, '');
      const fallbackEmail = String(import.meta.env.VITE_LEAD_EMAIL || companyInfo?.email?.primary || '').trim();

      if (fallbackWhatsapp) {
        const whatsappUrl = `https://wa.me/${fallbackWhatsapp}?text=${encodeURIComponent(fallbackMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setSubmitMessage('Direct submit is unavailable right now. WhatsApp has been opened with your enquiry details.');
        return;
      }

      if (fallbackEmail) {
        const subject = encodeURIComponent(`Booking Enquiry: ${effectivePackageName}`);
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

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose?.(); }}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {/* Header with gradient */}
        <div className="px-5 py-4 pr-12 bg-gradient-to-r from-orange to-orange/90 text-white">
          <h5 className="font-bold font-poppins text-lg md:text-xl mb-1">Plan Your Dream Holiday</h5>
          <p className="text-white/90 text-sm font-canva-sans">Fill in your details and our travel experts will contact you</p>
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
                  <User className="w-4 h-4" />
                </div>
                <input
                  readOnly
                  value={packageName || ''}
                  className="flex-1 bg-transparent text-brand-ink font-semibold text-base font-poppins outline-none"
                />
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-ink/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-brand-ink" />
                </div>
                <h6 className="font-bold text-brand-ink font-poppins text-base">Personal Details</h6>
              </div>

              {/* Name Field */}
              <div className="group">
                <label className="text-sm font-medium text-brand-ink font-canva-sans mb-2 block">
                  Full Name <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => markTouched('fullName')}
                    aria-invalid={showError(nameValid, 'fullName')}
                    placeholder="Enter your full name"
                    className={cn(
                      'w-full border-2 rounded-lg pl-10 pr-4 py-3 text-sm bg-transparent text-brand-ink focus:outline-none focus:ring-2 transition-all font-canva-sans',
                      showError(nameValid, 'fullName')
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-brand-hairline focus:border-orange focus:ring-orange/10'
                    )}
                  />
                </div>
                {showError(nameValid, 'fullName') && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-canva-sans">
                    <AlertCircle className="w-3.5 h-3.5" /> Please enter your full name.
                  </p>
                )}
              </div>

              {/* Mobile Number Field */}
              <div className="group">
                <label className="text-sm font-medium text-brand-ink font-canva-sans mb-2 block">
                  Mobile Number <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className={cn(
                  'flex items-stretch border-2 rounded-lg overflow-hidden focus-within:ring-2 transition-all',
                  showError(mobileValid, 'mobile')
                    ? 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10'
                    : 'border-brand-hairline focus-within:border-orange focus-within:ring-orange/10'
                )}>
                  <span className="px-4 py-3 bg-brand-canvas border-r-2 border-brand-hairline font-semibold text-brand-ink font-canva-sans flex items-center text-sm gap-1">
                    <Phone className="w-3 h-3" />
                    +91
                  </span>
                  <input
                    required
                    pattern="[0-9]{10}"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onBlur={() => markTouched('mobile')}
                    aria-invalid={showError(mobileValid, 'mobile')}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-3 bg-transparent text-brand-ink outline-none font-canva-sans text-sm"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
                {showError(mobileValid, 'mobile') && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-canva-sans">
                    <AlertCircle className="w-3.5 h-3.5" /> Enter a valid 10-digit mobile number.
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="text-sm font-medium text-brand-ink font-canva-sans mb-2 block">
                  Email Address <span className="text-red-500 dark:text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-ink/40">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched('email')}
                    aria-invalid={showError(emailValid, 'email')}
                    placeholder="your.email@example.com"
                    className={cn(
                      'w-full border-2 rounded-lg pl-10 pr-4 py-3 text-sm bg-transparent text-brand-ink focus:outline-none focus:ring-2 transition-all font-canva-sans',
                      showError(emailValid, 'email')
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                        : 'border-brand-hairline focus:border-orange focus:ring-orange/10'
                    )}
                  />
                </div>
                {showError(emailValid, 'email') && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-canva-sans">
                    <AlertCircle className="w-3.5 h-3.5" /> Enter a valid email address.
                  </p>
                )}
              </div>
            </div>

            {/* Travelers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-ink/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-ink" />
                  </div>
                  <h6 className="font-bold text-brand-ink font-poppins text-base">Number of Travelers</h6>
                </div>
                <span className="bg-orange text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {totalTravelers}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Adult Counter */}
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
                  <label className="text-sm font-semibold text-brand-ink font-canva-sans mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <div>Adult</div>
                      <div className="text-xs font-normal text-brand-ink/60">12+ years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-blue-200 dark:border-blue-800/50 rounded-lg overflow-hidden bg-surface">
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/40 active:bg-blue-100 dark:active:bg-blue-900/50 transition-colors font-bold text-base text-brand-ink disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setAdult((a) => Math.max(1, a - 1))}
                      disabled={adult <= 1}
                      aria-label="Decrease adults"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="flex-1 text-center">
                      <input
                        readOnly
                        value={adult}
                        aria-label="Number of adults"
                        className="w-full text-center font-bold text-lg text-brand-ink bg-transparent outline-none font-poppins"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/40 active:bg-blue-100 dark:active:bg-blue-900/50 transition-colors font-bold text-base text-brand-ink"
                      onClick={() => setAdult((a) => a + 1)}
                      aria-label="Increase adults"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Child Counter */}
                <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-100 dark:border-green-900/50">
                  <label className="text-sm font-semibold text-brand-ink font-canva-sans mb-3 flex items-center gap-2">
                    <PersonStanding className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <div>
                      <div>Child</div>
                      <div className="text-xs font-normal text-brand-ink/60">2-12 years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-green-200 dark:border-green-800/50 rounded-lg overflow-hidden bg-surface">
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-green-50 dark:hover:bg-green-900/40 active:bg-green-100 dark:active:bg-green-900/50 transition-colors font-bold text-base text-brand-ink disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setChild((c) => Math.max(0, c - 1))}
                      disabled={child <= 0}
                      aria-label="Decrease children"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="flex-1 text-center">
                      <input
                        readOnly
                        value={child}
                        aria-label="Number of children"
                        className="w-full text-center font-bold text-lg text-brand-ink bg-transparent outline-none font-poppins"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-green-50 dark:hover:bg-green-900/40 active:bg-green-100 dark:active:bg-green-900/50 transition-colors font-bold text-base text-brand-ink"
                      onClick={() => setChild((c) => c + 1)}
                      aria-label="Increase children"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Infant Counter */}
                <div className="bg-pink-50 dark:bg-pink-950/30 rounded-xl p-4 border border-pink-100 dark:border-pink-900/50">
                  <label className="text-sm font-semibold text-brand-ink font-canva-sans mb-3 flex items-center gap-2">
                    <Baby className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    <div>
                      <div>Infant</div>
                      <div className="text-xs font-normal text-brand-ink/60">0-2 years</div>
                    </div>
                  </label>
                  <div className="flex items-center justify-between border-2 border-pink-200 dark:border-pink-800/50 rounded-lg overflow-hidden bg-surface">
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-pink-50 dark:hover:bg-pink-900/40 active:bg-pink-100 dark:active:bg-pink-900/50 transition-colors font-bold text-base text-brand-ink disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setInfant((i) => Math.max(0, i - 1))}
                      disabled={infant <= 0}
                      aria-label="Decrease infants"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="flex-1 text-center">
                      <input
                        readOnly
                        value={infant}
                        aria-label="Number of infants"
                        className="w-full text-center font-bold text-lg text-brand-ink bg-transparent outline-none font-poppins"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2.5 hover:bg-pink-50 dark:hover:bg-pink-900/40 active:bg-pink-100 dark:active:bg-pink-900/50 transition-colors font-bold text-base text-brand-ink"
                      onClick={() => setInfant((i) => i + 1)}
                      aria-label="Increase infants"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary + secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !formValid}
                className="flex-1 h-14 text-base font-bold font-poppins gap-2"
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
                    <Send className="w-4 h-4" />
                    <span>Get Quote</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={handleWhatsApp}
                disabled={isSubmitting}
                className="flex-1 h-14 text-base font-bold font-poppins gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/30"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </Button>
            </div>

            {/* User control & freedom — an explicit way out beyond the X / Esc. */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="mx-auto block text-sm font-poppins font-medium text-brand-ink/60 hover:text-brand-ink underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>

            {submitError && (
              <div className="rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300 font-canva-sans">
                {submitError}
              </div>
            )}

            {submitMessage && (
              <div className="rounded-lg border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-950/30 px-4 py-3 text-sm text-green-700 dark:text-green-300 font-canva-sans">
                {submitMessage}
              </div>
            )}

            {/* Privacy Note */}
            <div className="flex items-start gap-2 p-3 bg-brand-canvas rounded-lg border border-brand-hairline">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <p className="text-xs text-brand-ink/70 font-canva-sans leading-relaxed">
                <span className="font-semibold text-brand-ink">Secure Booking:</span> Your information is protected and will only be used to process your travel request. Our team will contact you within 24 hours.
              </p>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

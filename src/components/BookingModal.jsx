import { useEffect, useState } from 'react';

export default function BookingModal({ open, onClose, packageName }) {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset counters each time the modal opens
    if (open) {
      setAdult(2);
      setChild(0);
      setInfant(0);
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
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('🎉 Booking submitted successfully! We will contact you soon.');
    setIsSubmitting(false);
    onClose?.();
  };

  const totalTravelers = adult + child + infant;

  return (
    <div 
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 animate-fadeIn" 
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all animate-slideUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="px-6 py-5 bg-gradient-to-r from-orange via-orange to-amber-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0yMCAyMGgyMHYyMEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <h5 className="font-bold font-poppins text-xl md:text-2xl mb-1">Plan Your Dream Holiday ✈️</h5>
              <p className="text-white/90 text-sm font-canva-sans">Fill in the details and we'll get back to you shortly</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-white text-3xl leading-none hover:rotate-90 transition-transform duration-300 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5" id="bookingForm">
            {/* Package Name - Highlighted */}
            <div className="bg-gradient-to-r from-orange/10 to-amber-50 rounded-xl p-4 border-l-4 border-orange">
              <label className="text-xs uppercase tracking-wide font-semibold text-orange font-poppins mb-2 block">
                Selected Package
              </label>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📦</span>
                <input
                  readOnly
                  value={packageName || ''}
                  className="flex-1 bg-transparent text-darkBlue font-semibold text-lg font-poppins outline-none"
                />
              </div>
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b-2 border-orange/20">
                <span className="text-xl">👤</span>
                <h6 className="font-bold text-darkBlue font-poppins text-lg">Personal Details</h6>
              </div>

              {/* Name Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  placeholder="Enter your full name"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all font-canva-sans group-hover:border-gray-400"
                />
              </div>

              {/* Mobile Number Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex items-stretch border-2 border-gray-300 rounded-xl overflow-hidden focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/20 transition-all group-hover:border-gray-400">
                  <span className="px-4 py-3 bg-gray-100 border-r-2 border-gray-300 font-semibold text-darkBlue font-canva-sans flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    required
                    pattern="[0-9]{10}"
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-4 py-3 outline-none font-canva-sans"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="text-sm font-medium text-darkBlue font-canva-sans mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 transition-all font-canva-sans group-hover:border-gray-400"
                />
              </div>
            </div>

            {/* Travelers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b-2 border-orange/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <h6 className="font-bold text-darkBlue font-poppins text-lg">Number of Travelers</h6>
                </div>
                <span className="bg-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Total: {totalTravelers}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Adult Counter */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <span className="text-lg">👨</span>
                    Adult (12+ years)
                  </label>
                  <div className="flex items-center justify-between border-2 border-blue-300 rounded-xl overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-blue-100 active:bg-blue-200 transition-colors font-bold text-lg text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setAdult((a) => Math.max(1, a - 1))}
                      disabled={adult <= 1}
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={adult} 
                        className="w-full text-center font-bold text-xl text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-blue-100 active:bg-blue-200 transition-colors font-bold text-lg text-darkBlue" 
                      onClick={() => setAdult((a) => a + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Child Counter */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <span className="text-lg">👦</span>
                    Child (2-12 years)
                  </label>
                  <div className="flex items-center justify-between border-2 border-green-300 rounded-xl overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-green-100 active:bg-green-200 transition-colors font-bold text-lg text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setChild((c) => Math.max(0, c - 1))}
                      disabled={child <= 0}
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={child} 
                        className="w-full text-center font-bold text-xl text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-green-100 active:bg-green-200 transition-colors font-bold text-lg text-darkBlue" 
                      onClick={() => setChild((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infant Counter */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
                  <label className="text-sm font-semibold text-darkBlue font-canva-sans mb-3 flex items-center gap-2">
                    <span className="text-lg">👶</span>
                    Infant (0-2 years)
                  </label>
                  <div className="flex items-center justify-between border-2 border-pink-300 rounded-xl overflow-hidden bg-white">
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-pink-100 active:bg-pink-200 transition-colors font-bold text-lg text-darkBlue disabled:opacity-50 disabled:cursor-not-allowed" 
                      onClick={() => setInfant((i) => Math.max(0, i - 1))}
                      disabled={infant <= 0}
                    >
                      −
                    </button>
                    <div className="flex-1 text-center">
                      <input 
                        readOnly 
                        value={infant} 
                        className="w-full text-center font-bold text-xl text-darkBlue bg-transparent outline-none font-poppins" 
                      />
                    </div>
                    <button 
                      type="button" 
                      className="px-4 py-3 hover:bg-pink-100 active:bg-pink-200 transition-colors font-bold text-lg text-darkBlue" 
                      onClick={() => setInfant((i) => i + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange to-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-poppins text-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Submit Booking Request
                  <span>🚀</span>
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-gray-500 text-center font-canva-sans">
              🔒 Your information is secure and will only be used to process your booking request
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

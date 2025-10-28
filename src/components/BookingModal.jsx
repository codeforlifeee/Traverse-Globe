import { useEffect, useState } from 'react';

export default function BookingModal({ open, onClose, packageName }) {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  useEffect(() => {
    // Reset counters each time the modal opens
    if (open) {
      setAdult(2);
      setChild(0);
      setInfant(0);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking submitted successfully! We will contact you soon.');
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-darkBlue/60 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-orange text-white flex items-center justify-between">
          <h5 className="font-semibold font-poppins text-lg">Want to Go For A Memorable Holiday?</h5>
          <button onClick={onClose} className="text-white text-2xl leading-none hover:text-lightGray transition-colors">×</button>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4" id="bookingForm">
            <div>
              <label className="text-sm font-semibold text-darkBlue font-poppins">Package Name</label>
              <input
                readOnly
                value={packageName || ''}
                className="mt-1 w-full border-2 border-lightGray rounded-lg px-3 py-2 bg-lightGray/30 font-canva-sans"
              />
            </div>

            <h6 className="font-bold text-darkBlue font-poppins">Personal Details</h6>

            <div>
              <label className="text-sm text-darkBlue font-canva-sans">Name</label>
              <input
                required
                placeholder="Your Name"
                className="mt-1 w-full border-2 border-lightGray rounded-lg px-3 py-2 focus:border-orange focus:outline-none font-canva-sans"
              />
            </div>

            <div>
              <label className="text-sm text-darkBlue font-canva-sans">Mobile No.</label>
              <div className="flex items-stretch border-2 border-lightGray rounded-lg overflow-hidden mt-1 focus-within:border-orange">
                <span className="px-3 py-2 bg-lightGray/30 border-r-2 border-lightGray font-canva-sans">+91</span>
                <input
                  required
                  pattern="[0-9]{10}"
                  placeholder="Mobile No."
                  className="flex-1 px-3 py-2 outline-none font-canva-sans"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-darkBlue font-canva-sans">Email ID</label>
              <input
                required
                type="email"
                placeholder="Your E-mail Address"
                className="mt-1 w-full border-2 border-lightGray rounded-lg px-3 py-2 focus:border-orange focus:outline-none font-canva-sans"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-darkBlue font-canva-sans">Adult</label>
                <div className="flex items-stretch border-2 border-lightGray rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setAdult((a) => Math.max(1, a - 1))}>
                    -
                  </button>
                  <input readOnly value={adult} className="w-full text-center border-l-2 border-r-2 border-lightGray font-canva-sans" />
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setAdult((a) => a + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-darkBlue font-canva-sans">Child</label>
                <div className="flex items-stretch border-2 border-lightGray rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setChild((c) => Math.max(0, c - 1))}>
                    -
                  </button>
                  <input readOnly value={child} className="w-full text-center border-l-2 border-r-2 border-lightGray font-canva-sans" />
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setChild((c) => c + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-darkBlue font-canva-sans">Infant</label>
                <div className="flex items-stretch border-2 border-lightGray rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setInfant((i) => Math.max(0, i - 1))}>
                    -
                  </button>
                  <input readOnly value={infant} className="w-full text-center border-l-2 border-r-2 border-lightGray font-canva-sans" />
                  <button type="button" className="px-3 py-2 hover:bg-lightGray transition-colors font-canva-sans" onClick={() => setInfant((i) => i + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full custom-btn">Submit Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
}

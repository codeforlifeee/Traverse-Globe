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
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-between">
          <h5 className="font-semibold">Want to Go For A Memorable Holiday?</h5>
          <button onClick={onClose} className="text-white text-xl leading-none">×</button>
        </div>
        <div className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4" id="bookingForm">
            <div>
              <label className="text-sm font-semibold">Package Name</label>
              <input
                readOnly
                value={packageName || ''}
                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>

            <h6 className="font-bold">Personal Details</h6>

            <div>
              <label className="text-sm">Name</label>
              <input
                required
                placeholder="Your Name"
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="text-sm">Mobile No.</label>
              <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                <span className="px-3 py-2 bg-gray-50 border-r">+91</span>
                <input
                  required
                  pattern="[0-9]{10}"
                  placeholder="Mobile No."
                  className="flex-1 px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Email ID</label>
              <input
                required
                type="email"
                placeholder="Your E-mail Address"
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm">Adult</label>
                <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2" onClick={() => setAdult((a) => Math.max(1, a - 1))}>
                    -
                  </button>
                  <input readOnly value={adult} className="w-full text-center border-l border-r" />
                  <button type="button" className="px-3 py-2" onClick={() => setAdult((a) => a + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm">Child</label>
                <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2" onClick={() => setChild((c) => Math.max(0, c - 1))}>
                    -
                  </button>
                  <input readOnly value={child} className="w-full text-center border-l border-r" />
                  <button type="button" className="px-3 py-2" onClick={() => setChild((c) => c + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm">Infant</label>
                <div className="flex items-stretch border rounded-lg overflow-hidden mt-1">
                  <button type="button" className="px-3 py-2" onClick={() => setInfant((i) => Math.max(0, i - 1))}>
                    -
                  </button>
                  <input readOnly value={infant} className="w-full text-center border-l border-r" />
                  <button type="button" className="px-3 py-2" onClick={() => setInfant((i) => i + 1)}>
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

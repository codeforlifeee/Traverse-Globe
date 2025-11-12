import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const FloatingButtons = () => {
  return (
    <div className="fixed right-5 bottom-20 z-[9999] flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919997085457"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>

      {/* Call Button */}
      <a
        href="tel:+919997085457"
        className="w-14 h-14 rounded-full flex items-center justify-center bg-orange hover:bg-teal text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call Us"
      >
        <FaPhone className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;

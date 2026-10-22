import { Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';

/**
 * Persistent WhatsApp / call actions.
 *
 * Bottom-right, but inset further from the edge than the original so they clear
 * the last card in a carousel row instead of sitting on top of its
 * "Explore packages" link. Sized to 48px for the same reason.
 */
const FloatingButtons = () => {
  return (
    <div className="fixed right-5 md:right-10 lg:right-14 bottom-5 z-[9999] flex flex-col gap-2.5">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${companyInfo.phone.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${companyInfo.phone.primary}`}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-orange hover:bg-teal text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Call Us"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
};

export default FloatingButtons;

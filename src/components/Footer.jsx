import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Award, Lock } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import Kicker from './revamp/Kicker';

/**
 * Footer — deliberately minimal: brand + how to reach us + social.
 *
 * The destination / company link columns were removed: those links duplicate the
 * header and the in-page sections, and a wall of low-intent links at the bottom of
 * every page pulled attention away from the one action that matters here, which is
 * starting a WhatsApp conversation. The trust-badge row stays.
 */
const Footer = () => {
  // Filled in after mount: the homepage is pre-rendered at build time, and the build's
  // year must not be frozen into the HTML (or mismatch the visitor's clock on hydrate).
  const [year, setYear] = useState(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const socials = [
    { href: companyInfo.social.facebook, label: 'Facebook', Icon: Facebook },
    { href: companyInfo.social.instagram, label: 'Instagram', Icon: Instagram },
    { href: companyInfo.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
  ].filter((s) => s.href);

  return (
    <footer className="bg-brand-scrim text-white/80">
      {/* Top border accent */}
      <div className="h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange" />

      <div className="container-custom py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          {/* Brand + contact */}
          <div className="max-w-md">
            <img
              src="/logo-white-text.webp"
              alt={companyInfo.name}
              className="h-10 mb-5 object-contain"
              width="151"
              height="60"
            />
            <p className="text-sm leading-relaxed text-white/70 font-canva-sans mb-6">
              Handpicked family trips across India &amp; the UAE. Fixed prices, real support, one WhatsApp away.
            </p>

            <div className="space-y-2.5">
              <a
                href={`tel:${companyInfo.phone.primary}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-brand-orange" />
                </span>
                {companyInfo.phone.primary}
              </a>

              {companyInfo.phone.whatsapp && (
                <a
                  href={`https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                  </span>
                  WhatsApp us in Hindi or Arabic
                </a>
              )}

              <a
                href={`mailto:${companyInfo.email.primary}`}
                className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-orange" />
                </span>
                {companyInfo.email.primary}
              </a>

              <a
                href={companyInfo.address.karnal.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                </span>
                <span>{companyInfo.address.karnal.full}</span>
              </a>
            </div>
          </div>

          {/* Follow us */}
          {socials.length > 0 && (
            <div>
              <Kicker tone="orange" className="mb-3">Follow us</Kicker>
              <div className="flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-brand-orange transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trust badge row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, label: 'Secure bookings' },
            { icon: Award, label: '10,000+ families served' },
            { icon: Lock, label: 'Fixed prices, no hidden fees' },
            { icon: Phone, label: '24/7 expert support' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-brand-orange" />
              </span>
              <span className="text-xs md:text-sm text-white/80 font-canva-sans">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 md:pr-24 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60 font-canva-sans">
            © {year} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/60 font-canva-sans">
            Crafted with <span className="text-brand-orange">♥</span> for travellers in India &amp; the UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

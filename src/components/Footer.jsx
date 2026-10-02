import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ShieldCheck, Award, Lock } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { companyInfo } from '../data/companyInfo';
import { getInternationalCategories, getDomesticCategories } from '../data/categoryConfig';
import Kicker from './revamp/Kicker';

const Footer = () => {
  const international = getInternationalCategories();
  const domestic = getDomesticCategories();

  return (
    <footer className="bg-brand-scrim text-white/80">
      {/* Top border accent */}
      <div className="h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange" />

      {/* Main columns */}
      <div className="container-custom py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand column — 4 cols on desktop */}
          <div className="col-span-2 lg:col-span-4">
            <img
              src="/logo.webp"
              alt={companyInfo.name}
              className="h-12 mb-5 brightness-0 invert"
              width="151"
              height="60"
            />
            <p className="text-sm leading-relaxed text-white/70 font-canva-sans max-w-sm mb-6">
              Handpicked family trips across India & the UAE. Fixed prices, real support, one WhatsApp away.
            </p>

            {/* Contact quick chips */}
            <div className="space-y-2.5">
              <a href={`tel:${companyInfo.phone.primary}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
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
              <a href={`mailto:${companyInfo.email.primary}`} className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-brand-orange" />
                </span>
                {companyInfo.email.primary}
              </a>
              <a href={companyInfo.address.karnal.mapLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors">
                <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                </span>
                <span>{companyInfo.address.karnal.full}</span>
              </a>
            </div>
          </div>

          {/* International */}
          <div className="lg:col-span-3">
            <Kicker tone="orange" className="mb-3">International</Kicker>
            <ul className="space-y-2">
              {international.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/destinations/international/${d.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domestic */}
          <div className="lg:col-span-2">
            <Kicker tone="orange" className="mb-3">Domestic</Kicker>
            <ul className="space-y-2">
              {domestic.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/destinations/domestic/${d.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <Kicker tone="orange" className="mb-3">Company</Kicker>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans">About us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans">Contact</Link></li>
              <li><Link to="/blog" className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans">Guides & tips</Link></li>
              <li><Link to="/hotels/luxury" className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans">Hotels</Link></li>
              <li><Link to="/shortlist" className="text-sm text-white/70 hover:text-white transition-colors font-canva-sans">My shortlist</Link></li>
            </ul>

            <Kicker tone="orange" className="mt-8 mb-3">Follow us</Kicker>
            <div className="flex gap-2">
              {companyInfo.social.facebook && (
                <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-brand-orange transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {companyInfo.social.instagram && (
                <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-brand-orange transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {companyInfo.social.linkedin && (
                <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                   className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-brand-orange transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Trust badge row */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, label: 'Secure bookings' },
            { icon: Award, label: '10,000+ families served' },
            { icon: Lock, label: 'Fixed prices, no hidden fees' },
            { icon: Phone, label: '24/7 expert support' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <item.icon className="w-4 h-4 text-brand-orange" />
              </span>
              <span className="text-xs md:text-sm text-white/80 font-canva-sans">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60 font-canva-sans">
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/60 font-canva-sans">
            Crafted with <span className="text-brand-orange">♥</span> for travellers in India & the UAE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

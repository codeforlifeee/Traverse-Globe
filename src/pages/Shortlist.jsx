import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Share2, ArrowRight, Heart } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getShortlist, subscribeShortlist, removeFromShortlist, clearShortlist } from '@/lib/shortlist';
import { companyInfo } from '../data/siteData';
import ImageWithFallback from '../components/revamp/ImageWithFallback';
import Kicker from '../components/revamp/Kicker';
import BreadcrumbTrail from '../components/revamp/BreadcrumbTrail';
import { Button } from '@/components/ui/button';

export default function Shortlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getShortlist());
    return subscribeShortlist(setItems);
  }, []);

  const buildWhatsAppMessage = () => {
    if (!items.length) return '';
    const lines = [
      'Hi Traverse Globe, I\'m shortlisting these:',
      '',
      ...items.map((it, i) =>
        `${i + 1}. ${it.title}${it.price ? ` — ₹${it.price.toLocaleString('en-IN')}` : ''}${it.href ? `\n   ${window.location.origin}${it.href}` : ''}`
      ),
      '',
      'Can you help me pick + share dates?'
    ];
    return lines.join('\n');
  };

  const whatsAppUrl = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  return (
    <div className="pt-24 md:pt-28 pb-20">
      <div className="container-custom">
        <BreadcrumbTrail items={[{ label: 'My shortlist' }]} />

        <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <Kicker>Saved for later</Kicker>
            <h1 className="text-h1 font-poppins font-bold text-brand-ink mt-2">
              My shortlist <span className="text-brand-muted-ink text-h3 font-normal">({items.length})</span>
            </h1>
            <p className="mt-2 text-brand-muted-ink font-canva-sans max-w-lg">
              Everything you've saved, in one place. Send the whole list to our team on WhatsApp for a curated quote.
            </p>
          </div>
          {items.length > 0 && (
            <div className="flex gap-2">
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <Button className="shadow-glow-orange">
                  <FaWhatsapp className="w-4 h-4 mr-2" />
                  Send to WhatsApp
                </Button>
              </a>
              <Button variant="outline" onClick={() => clearShortlist()}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear all
              </Button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-brand-hairline p-12 text-center bg-white">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-orange/10 mb-4">
              <Heart className="w-7 h-7 text-brand-orange" />
            </div>
            <Kicker>Nothing saved yet</Kicker>
            <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">
              Tap the heart on any card to save it here
            </h3>
            <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans max-w-md mx-auto">
              Your shortlist stays on this device — no login needed.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/packages"><Button>Browse packages</Button></Link>
              <Link to="/destinations"><Button variant="outline">Browse destinations</Button></Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="rounded-2xl overflow-hidden bg-white border border-brand-hairline shadow-soft-sm hover:shadow-soft-md transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeFromShortlist(item.id)}
                    aria-label="Remove"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur border border-brand-hairline shadow-soft-md flex items-center justify-center text-brand-ink hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <span className="text-kicker uppercase text-brand-muted-ink font-poppins">
                    {item.type === 'hotel' ? 'Hotel' : 'Package'} · {item.category || '—'}
                  </span>
                  <h3 className="mt-1 text-base font-poppins font-semibold text-brand-ink line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.price > 0 && (
                    <p className="mt-2 text-xl font-poppins font-bold text-brand-orange">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  )}
                  {item.href && (
                    <Link
                      to={item.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-poppins font-semibold text-brand-orange hover:gap-2 transition-all"
                    >
                      View details <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

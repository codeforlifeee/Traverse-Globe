import { ShieldCheck, Users, Star, Headphones } from 'lucide-react';

const DEFAULT_ITEMS = [
  { icon: ShieldCheck, label: 'Secure bookings', sub: 'Razorpay + PayTabs' },
  { icon: Users, label: '10,000+ families', sub: 'served since 2018' },
  { icon: Star, label: '4.8 average rating', sub: 'across Google + WhatsApp' },
  { icon: Headphones, label: '24/7 WhatsApp support', sub: 'in Hindi + Arabic' },
];

/**
 * Full-bleed trust strip below the hero.
 * REVAMP_PLAN §4.1 §3. DESIGN.md §3B.
 */
export default function TrustStrip({ items = DEFAULT_ITEMS, variant = 'canvas' }) {
  const bg = variant === 'ink'
    ? 'bg-brand-scrim text-white border-brand-orange'
    : 'bg-brand-canvas text-brand-ink border-brand-hairline';
  return (
    <div className={`w-full border-y ${bg}`}>
      <div className="container-custom py-4 md:py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 md:gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 md:gap-3 min-w-0">
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${variant === 'ink' ? 'bg-white/10' : 'bg-brand-orange/10'}`}>
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-brand-orange" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] md:text-sm font-poppins font-semibold leading-tight truncate">
                  {item.label}
                </p>
                {item.sub && (
                  <p className={`hidden md:block text-xs font-canva-sans truncate mt-0.5 ${variant === 'ink' ? 'text-white/60' : 'text-brand-muted-ink'}`}>
                    {item.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

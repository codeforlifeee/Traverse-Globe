import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Search, Compass, Waves, Anchor, Ticket, Ship } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { companyInfo } from '../data/companyInfo';
import { getShortlist, subscribeShortlist } from '@/lib/shortlist';
import ThemeToggle from './revamp/ThemeToggle';
import WhatsAppIcon from './icons/WhatsAppIcon';

// The palette carries cmdk and the whole search index. Header is an eager route,
// so it is split out and only fetched the first time search is opened.
const SearchCommand = lazy(() => import('./revamp/SearchCommand'));
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shortlistCount, setShortlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  // Keeps the palette in the tree after its first open so its state (and the
  // close animation) survives, without paying for it on a page nobody searches.
  const [searchMounted, setSearchMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchMounted(true);
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const popularActivities = [
    { name: 'Desert Safari & Quad Biking', slug: 'desert-safari', icon: Compass, desc: 'Dune bashing, camel rides & BBQ' },
    { name: 'Scuba Diving & Snorkeling', slug: 'scuba-diving', icon: Waves, desc: 'Coral reefs & marine exploration' },
    { name: 'Dhow Cruise & Marina Dinner', slug: 'dhow-cruise', icon: Anchor, desc: 'Luxury dinner on waters' },
    { name: 'Theme Parks & Waterparks', slug: 'theme-parks', icon: Ticket, desc: 'Burj Khalifa, Atlantis & Ferrari World' },
    { name: 'Luxury Yacht Rentals', slug: 'yacht-rental', icon: Ship, desc: 'Private charters in Arabian Gulf' },
  ];

  // Some pages have a light background above the fold — never go transparent there.
  // Home has a dark hero image → transparent on load is fine.
  const isDarkHeroPage = location.pathname === '/';

  useEffect(() => {
    // One rAF per frame, and setScrolled only when the boolean actually flips -
    // previously every scroll event queued a state update.
    let frame = 0;
    let last = null;
    const apply = () => {
      frame = 0;
      const next = window.scrollY > 24;
      if (next !== last) {
        last = next;
        setScrolled(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setShortlistCount(getShortlist().length);
    return subscribeShortlist((items) => setShortlistCount(items.length));
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const solid = scrolled || !isDarkHeroPage || isOpen;
  // The primary CTA hands off to WhatsApp rather than the contact form: it is
  // where this audience actually replies, and it is the same number the floating
  // button and every card CTA use.
  const quoteHref = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi ${companyInfo.name}! I'd like a quote for a holiday package.`
  )}`;
  const linkTone = solid ? 'text-brand-ink hover:text-brand-orange' : 'text-white hover:text-white/80';
  // Shared desktop top-level link styling (plain links + the Destinations trigger).
  const topLinkClass = 'nav-link font-poppins text-sm font-medium px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        solid
          ? 'bg-surface/95 backdrop-blur-md border-b border-brand-hairline shadow-soft-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-80 relative w-[130px] md:w-[150px]"
            aria-label={`${companyInfo.name} Home`}
          >
            {/* Dark logo (shown when solid AND in light mode) - Dictates container height */}
            <img
              src="/logo.webp"
              alt={companyInfo.name}
              className={cn(
                'w-full h-auto object-contain transition-opacity duration-300',
                !solid ? 'opacity-0' : 'opacity-100 dark:opacity-0'
              )}
              width="151"
              height="60"
            />
            {/* Alt logo (shown when NOT solid OR in dark mode) */}
            <img
              src="/logo-white-text.png"
              alt={companyInfo.name}
              className={cn(
                'absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300',
                !solid ? 'opacity-100' : 'opacity-0 dark:opacity-100'
              )}
              width="151"
              height="60"
            />
          </Link>

          {/* Desktop nav - Radix NavigationMenu: role=navigation, full keyboard support */}
          <NavigationMenu className="hidden lg:flex" aria-label="Primary">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/packages" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
                    Packages
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/hotels" className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
                    Hotels
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger
                  className={cn(linkTone, solid && 'hover:bg-brand-orange/5', 'data-[state=open]:text-brand-orange')}
                >
                  Activities
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute left-0 top-full mt-2">
                  <div className="bg-surface rounded-2xl p-4 min-w-[340px] border border-brand-hairline shadow-soft-xl">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-brand-hairline">
                      <span className="text-kicker uppercase text-brand-muted-ink font-poppins font-semibold text-xs">
                        Curated Activities
                      </span>
                      <NavigationMenuLink asChild>
                        <Link to="/activities" className="text-xs text-brand-orange hover:underline font-poppins font-medium">
                          All Activities →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-1">
                      {popularActivities.map((act) => {
                        const Icon = act.icon;
                        return (
                          <NavigationMenuLink asChild key={act.slug}>
                            <Link
                              to={`/activities/${act.slug}`}
                              className="group/item flex items-center gap-3 px-3 py-2 rounded-xl text-brand-ink hover:text-brand-orange hover:bg-brand-canvas transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 group-hover/item:bg-brand-orange group-hover/item:text-white transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-poppins font-medium leading-none">{act.name}</p>
                                <p className="text-[11px] text-brand-muted-ink font-canva-sans mt-1">{act.desc}</p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        );
                      })}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {[
                { to: '/blog', label: 'Guides' },
                // About was merged into Contact — one "Contact Us" entry covers both.
                { to: '/contact', label: 'Contact Us' },
              ].map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link to={item.to} className={cn(topLinkClass, linkTone, solid && 'hover:bg-brand-orange/5')}>
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right-side utility */}
          <div className="flex items-center gap-2">
            {/* Search trigger — a labelled pill rather than a bare icon, so the
                affordance (and the ⌘K shortcut) is discoverable without hovering. */}
            <button
              onClick={() => { setSearchMounted(true); setSearchOpen(true); }}
              aria-label="Search packages, hotels and destinations"
              className={cn(
                'hidden md:inline-flex items-center gap-2 h-10 pl-3.5 pr-2 rounded-full border transition-colors',
                solid
                  ? 'border-brand-hairline bg-brand-canvas text-brand-muted-ink hover:border-brand-orange/50 hover:text-brand-orange'
                  : 'border-white/30 bg-white/10 text-white/90 backdrop-blur hover:bg-white/20'
              )}
            >
              <Search className="w-4 h-4 shrink-0" />
              <span className="font-canva-sans text-sm">Search trips…</span>
              <kbd
                className={cn(
                  'hidden lg:inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-poppins font-medium border',
                  solid ? 'border-brand-hairline bg-surface text-brand-muted-ink' : 'border-white/30 bg-white/10 text-white/80'
                )}
              >
                ⌘K
              </kbd>
            </button>

            {/* Mobile: icon-only trigger for the same command palette */}
            <button
              onClick={() => { setSearchMounted(true); setSearchOpen(true); }}
              aria-label="Search"
              className={cn(
                'md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                solid ? 'text-brand-ink hover:text-brand-orange hover:bg-brand-canvas' : 'text-white hover:bg-white/10'
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            {/* Dark mode toggle */}
            <ThemeToggle
              tone={solid ? 'dark' : 'light'}
              className={cn('hidden md:inline-flex')}
            />
            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${shortlistCount})`}
              className={cn(
                'relative hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                solid
                  ? 'text-brand-ink hover:text-brand-orange hover:bg-brand-canvas'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <Heart className="w-5 h-5" />
              {shortlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-orange text-white text-[10px] font-poppins font-semibold flex items-center justify-center"
                >
                  {shortlistCount}
                </motion.span>
              )}
            </Link>

{/* Primary CTA — always brand orange, in both themes and over a dark hero,
                so the one orange element on screen is never ambiguous. */}
            <a
              href={quoteHref}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg font-poppins font-semibold transition-colors shadow-soft-md bg-brand-orange hover:bg-brand-orange-hover text-white hover:shadow-glow-orange"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Get Quote
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg transition-colors',
                solid ? 'text-brand-ink bg-brand-canvas hover:bg-brand-hairline' : 'text-white bg-white/10 hover:bg-white/20 backdrop-blur'
              )}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <ul className="pb-6 pt-2 space-y-1">
                <li><Link to="/" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Home</Link></li>
                <li><Link to="/packages" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Packages</Link></li>
                <li><Link to="/hotels" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Hotels</Link></li>
                <li><Link to="/activities" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Activities</Link></li>
                <li><Link to="/blog" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Guides</Link></li>
                <li><Link to="/contact" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Contact Us</Link></li>
                <li className="pt-3 border-t border-brand-hairline space-y-2">
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="font-poppins font-medium text-brand-ink">Appearance</span>
                    <ThemeToggle tone="auto" showLabel />
                  </div>
                  <Link
                    to="/wishlist"
                    className="flex items-center justify-between px-3 py-3 rounded-lg bg-brand-canvas font-poppins font-medium text-brand-ink"
                  >
                    <span className="inline-flex items-center gap-2"><Heart className="w-4 h-4" /> Wishlist</span>
                    {shortlistCount > 0 && (
                      <span className="min-w-[22px] px-1.5 h-[22px] rounded-full bg-brand-orange text-white text-xs font-semibold flex items-center justify-center">
                        {shortlistCount}
                      </span>
                    )}
                  </Link>
                  <a
                    href={quoteHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-center font-poppins font-semibold shadow-soft-md"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Get Quote
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {searchMounted && (
        <Suspense fallback={null}>
          <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </Suspense>
      )}
    </header>
  );
};

export default Header;

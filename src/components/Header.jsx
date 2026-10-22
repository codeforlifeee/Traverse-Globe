import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { renderingPrerender } from '@/lib/hydration';
import { companyInfo } from '../data/companyInfo';
import { getShortlist, subscribeShortlist } from '@/lib/shortlist';
import ThemeToggle from './revamp/ThemeToggle';
import WhatsAppIcon from './icons/WhatsAppIcon';

// The palette carries cmdk and the whole search index. Header is an eager route,
// so it is split out and only fetched the first time search is opened.
const SearchCommand = lazy(() => import('./revamp/SearchCommand'));

// The desktop menu only renders at lg+. On a desktop the chunk request starts at module
// load, in parallel with first render, so the menu is effectively there on first paint.
const DESKTOP_QUERY = '(min-width: 1024px)';
const loadDesktopNav = () => import('./DesktopNav');
const DesktopNav = lazy(loadDesktopNav);
if (typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches) loadDesktopNav();

function useIsDesktop() {
  // The pre-rendered homepage cannot know the viewport, so it is built without the
  // desktop menu; hydration matches that and the effect adds the menu right after.
  const [isDesktop, setIsDesktop] = useState(() =>
    renderingPrerender() ? false : window.matchMedia(DESKTOP_QUERY).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mql.matches);
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shortlistCount, setShortlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  // Keeps the palette in the tree after its first open so its state (and the
  // close animation) survives, without paying for it on a page nobody searches.
  const [searchMounted, setSearchMounted] = useState(false);
  const location = useLocation();
  const isDesktop = useIsDesktop();

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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300',
        solid
          ? 'bg-surface border-b border-brand-hairline shadow-soft-sm'
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
              src="/logo-320.webp"
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
              src="/logo-white-text.webp"
              alt={companyInfo.name}
              className={cn(
                'absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300',
                !solid ? 'opacity-100' : 'opacity-0 dark:opacity-100'
              )}
              width="151"
              height="60"
            />
          </Link>

          {/* Desktop nav (lg+), lazy so phones never download Radix NavigationMenu */}
          {isDesktop && (
            <Suspense fallback={null}>
              <DesktopNav solid={solid} linkTone={linkTone} />
            </Suspense>
          )}

          {/* Right-side utility */}
          <div className="flex items-center gap-2">
            {/* Search trigger — a labelled pill rather than a bare icon, so the
                affordance (and the ⌘K shortcut) is discoverable without hovering.
                The accessible name starts with the visible text (WCAG 2.5.3) so voice
                users can say what they see; the shortcut is exposed via aria-keyshortcuts. */}
            <button
              onClick={() => { setSearchMounted(true); setSearchOpen(true); }}
              aria-label="Search trips: packages, hotels and destinations"
              aria-keyshortcuts="Control+K Meta+K"
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
                aria-hidden="true"
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

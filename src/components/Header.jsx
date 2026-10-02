import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Plane, MapPin, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getInternationalCategories, getDomesticCategories } from '../data/categoryConfig';
import { companyInfo } from '../data/companyInfo';
import { getShortlist, subscribeShortlist } from '@/lib/shortlist';
import SearchCommand from './revamp/SearchCommand';
import ThemeToggle from './revamp/ThemeToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPackagesDropdown, setShowPackagesDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shortlistCount, setShortlistCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const international = getInternationalCategories();
  const domestic = getDomesticCategories();

  // Some pages have a light background above the fold — never go transparent there.
  // Home & destinations-overview have dark hero images → transparent on load is fine.
  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/destinations';

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
    setShowPackagesDropdown(false);
  }, [location.pathname]);

  const solid = scrolled || !isDarkHeroPage || isOpen;
  const linkTone = solid ? 'text-brand-ink hover:text-brand-orange' : 'text-white hover:text-white/80';

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
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label={`${companyInfo.name} Home`}
          >
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img
                src="/logo.webp"
                alt={companyInfo.name}
                className={cn(
                  'h-10 md:h-11 object-contain transition-all duration-300',
                  'dark:brightness-0 dark:invert',
                  !solid && 'brightness-0 invert'
                )}
                width="151"
                height="60"
                decoding="async"
              />
            </picture>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/destinations', label: 'Destinations', hasMenu: true },
              { to: '/hotels/luxury', label: 'Hotels' },
              { to: '/blog', label: 'Guides' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <li key={item.label} className={item.hasMenu ? 'relative group' : ''}>
                <Link
                  to={item.to}
                  className={cn(
                    'nav-link font-poppins text-sm font-medium px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1',
                    linkTone,
                    solid && 'hover:bg-brand-orange/5'
                  )}
                >
                  {item.label}
                  {item.hasMenu && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.hasMenu && (
                  <div
                    className={cn(
                      'invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 mt-2',
                      'bg-surface rounded-2xl p-6 min-w-[560px] border border-brand-hairline shadow-soft-xl grid grid-cols-2 gap-6'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-brand-hairline">
                        <Plane className="w-4 h-4 text-brand-orange" />
                        <span className="font-poppins font-semibold text-brand-ink text-sm uppercase tracking-wider">International</span>
                      </div>
                      <div className="grid gap-1">
                        {international.map((d) => (
                          <Link
                            key={d.slug}
                            to={`/destinations/international/${d.slug}`}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-brand-ink hover:text-brand-orange hover:bg-brand-canvas font-canva-sans text-sm"
                          >
                            <MapPin className="w-3 h-3 text-brand-muted-ink" />
                            {d.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-brand-hairline">
                        <MapPin className="w-4 h-4 text-brand-orange" />
                        <span className="font-poppins font-semibold text-brand-ink text-sm uppercase tracking-wider">Domestic</span>
                      </div>
                      <div className="grid gap-1">
                        {domestic.map((d) => (
                          <Link
                            key={d.slug}
                            to={`/destinations/domestic/${d.slug}`}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-brand-ink hover:text-brand-orange hover:bg-brand-canvas font-canva-sans text-sm"
                          >
                            <MapPin className="w-3 h-3 text-brand-muted-ink" />
                            {d.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right-side utility */}
          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={cn(
                'hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors',
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
            {/* Shortlist */}
            <Link
              to="/shortlist"
              aria-label={`Shortlist (${shortlistCount})`}
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

            {/* Book Now CTA */}
            <Link
              to="/contact"
              className={cn(
                'hidden md:inline-flex items-center px-5 py-2.5 text-sm rounded-lg font-poppins font-semibold transition-colors shadow-soft-md',
                solid
                  ? 'bg-brand-orange hover:bg-brand-orange-hover text-white hover:shadow-glow-orange'
                  : 'bg-surface text-brand-ink hover:bg-surface/90'
              )}
            >
              Get Quote
            </Link>

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
                <li>
                  <button
                    onClick={() => setShowPackagesDropdown(!showPackagesDropdown)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium"
                  >
                    Destinations
                    <ChevronDown className={cn('w-4 h-4 transition-transform', showPackagesDropdown && 'rotate-180')} />
                  </button>
                  {showPackagesDropdown && (
                    <div className="pl-3 pt-1 pb-2 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 px-3 py-2 text-kicker uppercase text-brand-muted-ink">
                          <Plane className="w-3.5 h-3.5" /> International
                        </div>
                        <ul>
                          {international.map((d) => (
                            <li key={d.slug}>
                              <Link to={`/destinations/international/${d.slug}`} className="block px-6 py-2 rounded-lg text-brand-ink hover:bg-brand-canvas font-canva-sans text-sm">
                                {d.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 px-3 py-2 text-kicker uppercase text-brand-muted-ink">
                          <MapPin className="w-3.5 h-3.5" /> Domestic
                        </div>
                        <ul>
                          {domestic.map((d) => (
                            <li key={d.slug}>
                              <Link to={`/destinations/domestic/${d.slug}`} className="block px-6 py-2 rounded-lg text-brand-ink hover:bg-brand-canvas font-canva-sans text-sm">
                                {d.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                <li><Link to="/hotels/luxury" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Hotels</Link></li>
                <li><Link to="/blog" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Guides</Link></li>
                <li><Link to="/about" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">About</Link></li>
                <li><Link to="/contact" className="block px-3 py-3 rounded-lg text-brand-ink hover:bg-brand-canvas font-poppins font-medium">Contact</Link></li>
                <li className="pt-3 border-t border-brand-hairline space-y-2">
                  <div className="flex items-center justify-between px-3 py-1">
                    <span className="font-poppins font-medium text-brand-ink">Appearance</span>
                    <ThemeToggle tone="auto" showLabel />
                  </div>
                  <Link
                    to="/shortlist"
                    className="flex items-center justify-between px-3 py-3 rounded-lg bg-brand-canvas font-poppins font-medium text-brand-ink"
                  >
                    <span className="inline-flex items-center gap-2"><Heart className="w-4 h-4" /> Shortlist</span>
                    {shortlistCount > 0 && (
                      <span className="min-w-[22px] px-1.5 h-[22px] rounded-full bg-brand-orange text-white text-xs font-semibold flex items-center justify-center">
                        {shortlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-3 rounded-lg bg-brand-orange text-white text-center font-poppins font-semibold shadow-soft-md"
                  >
                    Get Quote
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
};

export default Header;

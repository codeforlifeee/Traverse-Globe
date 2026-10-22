import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';

/**
 * Scroll-triggered soft toast for detail pages — replacement for the removed
 * sitewide 10s popup. REVAMP_PLAN §4.6.
 *
 * Appears once after user has scrolled past `threshold` (default 60%) AND spent
 * `minTime` on the page (default 20s). Dismissable per session.
 */
export default function ScrollToast({
  packageTitle = '',
  threshold = 0.6,
  minTime = 20000,
  storageKey = 'tg_scroll_toast_dismissed',
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Session dismiss check
    try {
      if (window.sessionStorage.getItem(storageKey) === '1') return;
    } catch {}

    let timer = null;
    let shown = false;
    const start = Date.now();

    // scrollHeight/innerHeight are layout reads, so they are measured once (and on
    // resize) instead of on every scroll event, and the handler is coalesced into a
    // single rAF per frame.
    let height = document.documentElement.scrollHeight - window.innerHeight;
    const measure = () => {
      height = document.documentElement.scrollHeight - window.innerHeight;
    };

    let frame = 0;
    const onScroll = () => {
      if (shown || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (shown) return;
        const pct = height > 0 ? window.scrollY / height : 0;
        if (pct >= threshold && Date.now() - start >= minTime) {
          shown = true;
          setVisible(true);
          window.removeEventListener('scroll', onScroll);
        }
      });
    };

    // Fallback: after minTime + 15s, show anyway if user is still on page
    timer = window.setTimeout(() => {
      if (!shown) {
        shown = true;
        setVisible(true);
      }
    }, minTime + 20000);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [threshold, minTime, storageKey]);

  const dismiss = () => {
    try { window.sessionStorage.setItem(storageKey, '1'); } catch {}
    setVisible(false);
  };

  const whatsAppUrl = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hi, I'm looking at "${packageTitle}" on your site. Can you help?`
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40 max-w-sm"
        >
          <div className="bg-surface rounded-2xl shadow-soft-xl border border-brand-hairline p-4 pr-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-poppins font-semibold text-brand-ink leading-snug">
                  Still deciding?
                </p>
                <p className="text-xs text-brand-muted-ink font-canva-sans mt-0.5 leading-snug">
                  Our team can help you pick the right dates + hotel — no obligation.
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-[#128C7E] hover:text-[#25D366]"
                >
                  Chat on WhatsApp →
                </a>
              </div>
              <button
                onClick={dismiss}
                className="w-6 h-6 flex items-center justify-center rounded-md text-brand-muted-ink hover:text-brand-ink hover:bg-brand-canvas-2 flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

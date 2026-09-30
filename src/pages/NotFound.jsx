import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Search, Home } from 'lucide-react';
import Kicker from '../components/revamp/Kicker';
import { Button } from '@/components/ui/button';

/**
 * 404 — playful, on-brand. DESIGN.md §7.
 */
export default function NotFound() {
  return (
    <div className="pt-24 md:pt-28 pb-16 min-h-[calc(100vh-80px)] flex items-center">
      <div className="container-custom w-full">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-orange/10 mb-6">
              <Compass className="w-10 h-10 text-brand-orange" />
            </div>
            <Kicker>404 · Lost signal</Kicker>
            <h1 className="text-display font-poppins font-bold text-brand-ink mt-3">
              Looks like you got <span className="text-brand-orange">lost in the jungle.</span>
            </h1>
            <p className="mt-4 text-body-lg text-brand-muted-ink font-canva-sans max-w-xl mx-auto">
              This page doesn't exist — maybe a retired package, a mistyped URL, or an old link. Let's get you back on track.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" /> Back home
                </Button>
              </Link>
              <Link to="/packages">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" /> Browse packages
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Popular escape hatches */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 pt-8 border-t border-brand-hairline"
          >
            <Kicker className="mb-4 block">Popular right now</Kicker>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'Dubai family trips', to: '/destinations/international/uae' },
                { label: 'Bali honeymoon', to: '/packages/theme/honeymoon' },
                { label: 'Chardham Yatra', to: '/chardham' },
                { label: 'Kerala backwaters', to: '/destinations/domestic/kerala' },
                { label: 'Kashmir winter', to: '/destinations/domestic/kashmir' },
              ].map((chip) => (
                <Link
                  key={chip.label}
                  to={chip.to}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-canvas-2 hover:bg-brand-hairline text-brand-ink text-sm font-poppins transition-colors"
                >
                  {chip.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

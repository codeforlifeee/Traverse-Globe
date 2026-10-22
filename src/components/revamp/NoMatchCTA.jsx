import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import { companyInfo } from '../../data/companyInfo';
import Kicker from './Kicker';

/**
 * The double CTA that closes every filtered listing.
 *
 * Two different dead ends land here, so the copy adapts:
 * - `variant="empty"`  — filters matched nothing at all.
 * - `variant="footer"` — results were shown, but none of them was the one.
 *
 * Either way the visitor gets both exits: widen the filters, or talk to a human.
 * A listing that ends in silence is a lost lead.
 */
export default function NoMatchCTA({ onReset, variant = 'footer', scopeLabel }) {
  const isEmpty = variant === 'empty';

  // Straight to WhatsApp rather than /contact: someone who has just filtered a
  // listing and found nothing should reach a person, not another form.
  const waText = encodeURIComponent(
    `Hi Traverse Globe! I could not find the right ${scopeLabel ? scopeLabel + ' ' : ''}package on your site. Can you build a custom plan for me?`
  );
  const waUrl = `https://wa.me/${String(companyInfo.phone.whatsapp).replace(/\D/g, '')}?text=${waText}`;

  return (
    <div
      className={
        isEmpty
          ? 'rounded-2xl border border-dashed border-brand-hairline bg-surface p-10 text-center'
          : 'mt-10 rounded-2xl border border-brand-hairline bg-brand-canvas-2 p-8 md:p-10 text-center'
      }
    >
      <Kicker>{isEmpty ? 'Nothing matched' : 'Not seeing the right fit?'}</Kicker>

      <h3 className="text-h3 font-poppins font-semibold text-brand-ink mt-2">
        {isEmpty
          ? 'Try widening your filters'
          : 'Tell us what you want and we will build it'}
      </h3>

      <p className="mt-2 text-sm text-brand-muted-ink font-canva-sans max-w-md mx-auto">
        {isEmpty
          ? `Reset the filters, or widen the price range, to see every ${scopeLabel || 'available'} package.`
          : 'Every itinerary here can be rebuilt around your dates, budget and group. Send us the brief and we will come back with a custom quote.'}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset filters
        </Button>
        <a href={waUrl} target="_blank" rel="noreferrer noopener">
          <Button className="w-full sm:w-auto shadow-glow-orange">
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Contact us for a custom plan
          </Button>
        </a>
      </div>
    </div>
  );
}

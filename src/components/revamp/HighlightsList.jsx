import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Highlight chips — 4–6 bullets with icons, per REVAMP_PLAN §4.6.
 */
export default function HighlightsList({ highlights = [], className }) {
  if (!highlights.length) return null;
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-3', className)}>
      {highlights.map((h, idx) => (
        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl border border-brand-hairline bg-white">
          <span className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <p className="text-sm text-brand-ink font-canva-sans leading-snug">{h}</p>
        </div>
      ))}
    </div>
  );
}

import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Two-column ✅ / ❌ truth table for inclusions / exclusions.
 * DESIGN.md §3D, REVAMP_PLAN §4.6.
 */
export default function InclusionsTable({ included = [], excluded = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Column
        title="What's included"
        tone="trust"
        icon={Check}
        items={included}
      />
      <Column
        title="Not included"
        tone="destructive"
        icon={X}
        items={excluded}
      />
    </div>
  );
}

function Column({ title, tone, icon: Icon, items }) {
  const toneCls = tone === 'trust'
    ? 'bg-brand-trust/10 border-brand-trust/20 text-brand-trust'
    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-600 dark:text-rose-400';
  const iconWrap = tone === 'trust' ? 'bg-brand-trust/10 text-brand-trust' : 'bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400';

  return (
    <div className="rounded-2xl border border-brand-hairline bg-surface p-5 md:p-6">
      <div className={cn('inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-poppins font-semibold mb-4', toneCls)}>
        <Icon className="w-3.5 h-3.5" />
        {title}
      </div>
      {items?.length ? (
        <ul className="space-y-2.5">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-ink font-canva-sans leading-relaxed">
              <span className={cn('mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0', iconWrap)}>
                <Icon className="w-2.5 h-2.5" strokeWidth={3} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-brand-muted-ink font-canva-sans italic">Not specified</p>
      )}
    </div>
  );
}

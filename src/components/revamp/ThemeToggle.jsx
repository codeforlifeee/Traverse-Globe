import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

/**
 * Theme toggle. Cycles light -> dark -> system; 'system' follows the OS.
 * State and persistence live in useTheme so every instance stays in sync.
 * DESIGN.md §7 · REVAMP_PLAN §6.5.
 */

const LABEL = {
  light: 'Light theme. Switch to dark',
  dark: 'Dark theme. Switch to system',
  system: 'Following system theme. Switch to light',
};

export default function ThemeToggle({ className, tone = 'auto', showLabel = false }) {
  const { mode, cycle } = useTheme();

  const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      title={LABEL[mode]}
      aria-label={LABEL[mode]}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-colors',
        showLabel ? 'px-3 h-10' : 'w-10 h-10',
        tone === 'light'
          ? 'text-white hover:bg-white/10'
          : 'text-brand-ink hover:text-brand-orange hover:bg-brand-canvas-2',
        className
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {showLabel && (
        <span className="text-sm font-poppins font-medium capitalize">{mode}</span>
      )}
    </button>
  );
}

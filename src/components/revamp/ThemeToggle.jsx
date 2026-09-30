import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Dark mode toggle. Stores choice in localStorage, applies data-theme on <html>.
 * DESIGN.md §7 · REVAMP_PLAN §6.5.
 */
export default function ThemeToggle({ className, tone = 'auto' }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      return window.localStorage.getItem('tg_theme') || 'light';
    } catch { return 'light'; }
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    try { window.localStorage.setItem('tg_theme', theme); } catch {}
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors',
        tone === 'light' ? 'text-white hover:bg-white/10' : 'text-brand-ink hover:text-brand-orange hover:bg-brand-canvas',
        className
      )}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

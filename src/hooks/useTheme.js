import { useCallback, useEffect, useState } from 'react';
import { renderingPrerender } from '@/lib/hydration';

/**
 * Theme state shared by every toggle instance.
 *
 * Two modes: 'light' and 'dark'. Dark is the default for a first-time visitor and
 * for anyone whose stored choice is missing or unreadable. The resolved theme is written to
 * <html data-theme="...">, which is what both Tailwind's `dark:` variant and the CSS
 * variables in src/index.css key off.
 *
 * The storage key and the pre-paint script in index.html must stay in sync with this.
 */

const KEY = 'tg_theme';
const MODES = ['light', 'dark'];
const DARK_THEME_COLOR = '#0c1119';
const LIGHT_THEME_COLOR = '#FF5B04';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

function readStored() {
  try {
    const v = window.localStorage.getItem(KEY);
    return MODES.includes(v) ? v : 'dark';
  } catch {
    return 'dark';
  }
}

// Module-level so every mounted toggle reflects the same value.
let mode = typeof window === 'undefined' ? 'dark' : readStored();
const listeners = new Set();

const resolve = (m) => m === 'dark';

function applyToDocument() {
  if (typeof document === 'undefined') return false;
  const dark = resolve(mode);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
  return dark;
}

function notify() {
  const snapshot = { mode, isDark: resolve(mode) };
  listeners.forEach((fn) => fn(snapshot));
}

// OS watcher is no longer necessary since we don't have a 'system' mode
function attachOsWatcher() {
  return;
}

export function useTheme() {
  // The pre-rendered homepage was built in the default (dark) theme; match it while
  // hydrating, and the effect below switches to the stored theme straight after.
  const [state, setState] = useState(() =>
    renderingPrerender() ? { mode: 'dark', isDark: true } : { mode, isDark: resolve(mode) }
  );

  useEffect(() => {
    attachOsWatcher();
    const fn = (snapshot) => setState(snapshot);
    listeners.add(fn);
    // The pre-paint script in index.html already set the attribute; re-assert in case
    // storage changed in another tab since this component mounted.
    setState({ mode, isDark: applyToDocument() });
    return () => listeners.delete(fn);
  }, []);

  const setMode = useCallback((next) => {
    if (!MODES.includes(next)) return;
    mode = next;
    try {
      window.localStorage.setItem(KEY, next);
    } catch { /* private mode - theme just won't persist */ }
    applyToDocument();
    notify();
  }, []);

  const cycle = useCallback(() => {
    setMode(MODES[(MODES.indexOf(mode) + 1) % MODES.length]);
  }, [setMode]);

  return { mode: state.mode, isDark: state.isDark, setMode, cycle, modes: MODES };
}

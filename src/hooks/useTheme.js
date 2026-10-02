import { useCallback, useEffect, useState } from 'react';

/**
 * Theme state shared by every toggle instance.
 *
 * Three modes: 'light', 'dark', 'system'. 'system' follows prefers-color-scheme and is
 * the default for a first-time visitor. The resolved theme is written to
 * <html data-theme="...">, which is what both Tailwind's `dark:` variant and the CSS
 * variables in src/index.css key off.
 *
 * The storage key and the pre-paint script in index.html must stay in sync with this.
 */

const KEY = 'tg_theme';
const MODES = ['light', 'dark', 'system'];
const DARK_THEME_COLOR = '#0c1119';
const LIGHT_THEME_COLOR = '#FF5B04';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

function readStored() {
  try {
    const v = window.localStorage.getItem(KEY);
    return MODES.includes(v) ? v : 'system';
  } catch {
    return 'system';
  }
}

// Module-level so every mounted toggle reflects the same value.
let mode = typeof window === 'undefined' ? 'system' : readStored();
const listeners = new Set();

const resolve = (m) => m === 'dark' || (m === 'system' && prefersDark());

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

// One OS listener for the whole app, so 'system' mode tracks the OS live.
let osWatcherAttached = false;
function attachOsWatcher() {
  if (osWatcherAttached || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
  osWatcherAttached = true;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    if (mode !== 'system') return;
    applyToDocument();
    notify();
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else mq.addListener(onChange);
}

export function useTheme() {
  const [state, setState] = useState(() => ({ mode, isDark: resolve(mode) }));

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

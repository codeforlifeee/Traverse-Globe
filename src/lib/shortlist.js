/**
 * Shortlist store — per-viewer, localStorage-backed. REVAMP_PLAN §4.12.
 *
 * Data shape: Array<{ id: string, type: 'package'|'hotel', title, price?, image?, slug?, category?, addedAt: number }>
 *
 * Uses a tiny event-emitter so components (HeartIcon, ShortlistTray) can subscribe.
 * localStorage is per-origin, so this survives republishes but never crosses devices.
 */

const KEY = "tg_shortlist_v1";
const listeners = new Set();

function safeRead() {
  try {
    const raw = typeof window !== "undefined" && window.localStorage
      ? window.localStorage.getItem(KEY)
      : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeWrite(items) {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // ignore quota / private mode failures
  }
}

let cache = safeRead();

function emit() {
  listeners.forEach((fn) => {
    try { fn(cache); } catch {}
  });
}

export function getShortlist() {
  return cache;
}

export function isShortlisted(id) {
  return cache.some((item) => item.id === id);
}

export function toggleShortlist(item) {
  if (!item || !item.id) return { toggled: false, added: false };
  const exists = cache.find((x) => x.id === item.id);
  if (exists) {
    cache = cache.filter((x) => x.id !== item.id);
    safeWrite(cache);
    emit();
    return { toggled: true, added: false };
  }
  cache = [{ ...item, addedAt: Date.now() }, ...cache];
  safeWrite(cache);
  emit();
  return { toggled: true, added: true };
}

export function removeFromShortlist(id) {
  cache = cache.filter((x) => x.id !== id);
  safeWrite(cache);
  emit();
}

export function clearShortlist() {
  cache = [];
  safeWrite(cache);
  emit();
}

export function subscribeShortlist(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Cross-tab sync via storage event.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === KEY) {
      cache = safeRead();
      emit();
    }
  });
}

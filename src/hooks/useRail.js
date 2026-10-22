import { useEffect, useRef } from 'react';

/**
 * One behaviour for every horizontal card rail on the site.
 *
 * Wires three things onto a native `overflow-x` scroller:
 *
 *  1. **Drag to slide.** Native horizontal scrollers cannot be dragged with a
 *     mouse — only a trackpad or a visible scrollbar moves them, and the
 *     scrollbars here are hidden. Pointer drag is therefore implemented
 *     directly: press and pull. Touch is left to the browser, which already
 *     does it better, and the click that follows a real drag is swallowed so a
 *     drag never opens the card underneath.
 *
 *  2. **Edge bounce.** Pushing past either end pulls the track and lets it
 *     recoil, which is what tells someone the cards have run out. Fires for
 *     drag, wheel and touch alike.
 *
 *  3. **Progress line.** Written straight to the DOM. A scroll handler that
 *     sets React state re-renders every card on every frame of a drag — which
 *     is what made these bands impossible to slide in the first place.
 *
 * Attach `scrollerRef` to the overflow container, `trackRef` to the inner flex
 * or grid element (transforming the scrollport would move its own scrollbar),
 * and `barRef` to the orange fill inside the progress track.
 *
 * @param {React.RefObject<HTMLElement>} scrollerRef
 * @param {{bounceMax?: number, damping?: number, minThumb?: number}} options
 */
export function useRail(scrollerRef, { bounceMax = 64, damping = 0.4, minThumb = 0.12 } = {}) {
  const trackRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const reduceMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let offset = 0;        // current rubber-band displacement, px
    let frame = 0;
    let releaseTimer = 0;

    const maxScroll = () => Math.max(0, el.scrollWidth - el.clientWidth);

    /**
     * Snap points are measured against the track's own box, so while the track
     * is displaced by the bounce the browser would re-snap mid-recoil and jump.
     * Snapping is suspended for as long as the rail is displaced or being
     * dragged, and restored once it has settled.
     */
    let snapHolds = 0;
    const freezeSnap = () => {
      snapHolds += 1;
      el.style.scrollSnapType = 'none';
    };
    const thawSnap = () => {
      snapHolds = Math.max(0, snapHolds - 1);
      if (snapHolds === 0) el.style.scrollSnapType = '';
    };

    /* ---------- progress line ---------- */

    /**
     * The thumb is sized from the real geometry rather than pinned at a fixed
     * width. It previously sat at a hard-coded 28% of the track however much
     * content the rail held, so its travel bore no relation to the cards' — on a
     * long rail it crawled, on a short one it shot across. Now it behaves like a
     * scrollbar thumb: its length is the fraction of the rail currently on
     * screen, and it traverses exactly the remaining track as the cards move.
     */
    const paintBar = () => {
      const bar = barRef.current;
      if (!bar) return;

      const visible = el.clientWidth;
      const total = el.scrollWidth;
      if (!total || !visible) return;

      // Length = how much of the rail is on screen, with a floor so a rail that
      // barely overflows still shows a grabbable thumb rather than a full bar.
      const pct = Math.max(minThumb, Math.min(1, visible / total)) * 100;
      // `width` is layout, so it is only written when it actually changes —
      // assigning it every frame of a drag would thrash layout (§2.2).
      const key = pct.toFixed(2);
      if (bar.dataset.thumb !== key) {
        bar.style.width = `${key}%`;
        bar.dataset.thumb = key;
      }

      const max = maxScroll();
      const p = max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0;
      // translateX is a percentage of the thumb's OWN width, so the remaining
      // track — (100 - pct)% of it — has to be converted into thumb widths.
      bar.style.transform = `translateX(${p * ((100 - pct) / pct) * 100}%)`;
    };

    /* ---------- rubber band ---------- */

    const paintTrack = () => {
      frame = 0;
      const track = trackRef.current;
      if (track) track.style.transform = offset ? `translate3d(${offset}px, 0, 0)` : '';
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paintTrack);
    };

    const pull = (next) => {
      if (reduceMotion) return;
      const track = trackRef.current;
      if (!track) return;
      const was = offset;
      track.style.transition = '';
      offset = Math.max(-bounceMax, Math.min(bounceMax, next));
      if (!was && offset) freezeSnap();
      schedule();
    };

    const release = () => {
      const track = trackRef.current;
      if (!track || !offset) return;
      const hadOffset = true;
      // A little overshoot in the curve is what makes this read as a recoil
      // rather than a slide back to position.
      track.style.transition = 'transform 540ms cubic-bezier(0.18, 1.5, 0.35, 1)';
      offset = 0;
      if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
      paintTrack();
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => {
        track.style.transition = '';
        if (hadOffset) thawSnap();
      }, 580);
    };

    const nudgeEdge = (delta, autoRelease = true) => {
      pull(offset - delta * damping);
      if (autoRelease) {
        window.clearTimeout(releaseTimer);
        releaseTimer = window.setTimeout(release, 120);
      }
    };

    /* ---------- pointer drag ---------- */

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let pointerId = null;

    const swallowNextClick = () => {
      const kill = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };
      el.addEventListener('click', kill, { capture: true, once: true });
      // If no click follows (the pointer went up outside a link) drop the trap
      // rather than eating a genuine click later.
      window.setTimeout(() => el.removeEventListener('click', kill, true), 50);
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return;   // native touch scrolling is better
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      pointerId = e.pointerId;
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved) {
        if (Math.abs(dx) < 4) return;          // let a plain click through
        moved = true;
        el.setPointerCapture?.(pointerId);
        el.dataset.dragging = 'true';
        // Snapping fights a live drag, and smooth scrolling lags behind it.
        freezeSnap();
        el.style.scrollBehavior = 'auto';
      }
      e.preventDefault();

      const max = maxScroll();
      const desired = startLeft - dx;
      if (desired < 0) {
        el.scrollLeft = 0;
        pull(-desired * damping);
      } else if (desired > max) {
        el.scrollLeft = max;
        pull(-(desired - max) * damping);
      } else {
        el.scrollLeft = desired;
        if (offset) pull(0);
      }
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      if (pointerId !== null && el.hasPointerCapture?.(pointerId)) {
        el.releasePointerCapture(pointerId);
      }
      pointerId = null;
      if (moved) {
        delete el.dataset.dragging;
        el.style.scrollBehavior = '';
        swallowNextClick();
        release();
        // Releasing the drag's own hold lets the rail snap to the nearest card;
        // any hold the bounce took is released when the recoil finishes.
        thawSnap();
      }
      moved = false;
    };

    /* ---------- wheel + touch overscroll ---------- */

    const atStart = () => el.scrollLeft <= 1;
    const atEnd = () => el.scrollLeft >= maxScroll() - 1;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!delta) return;
      if ((delta < 0 && atStart()) || (delta > 0 && atEnd())) nudgeEdge(delta);
    };

    let touchStartX = null;
    let touchEdge = 0;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchEdge = atStart() ? -1 : atEnd() ? 1 : 0;
    };

    const onTouchMove = (e) => {
      if (touchStartX === null || touchEdge === 0) return;
      const dx = e.touches[0].clientX - touchStartX;
      if ((touchEdge === -1 && dx > 0) || (touchEdge === 1 && dx < 0)) pull(dx * damping);
    };

    const onTouchEnd = () => {
      touchStartX = null;
      touchEdge = 0;
      release();
    };

    const onScroll = () => paintBar();

    // CMS cards arrive after mount and change scrollWidth, which changes the
    // thumb's length — without this the thumb keeps its first-paint size.
    let geometryObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      geometryObserver = new ResizeObserver(paintBar);
      geometryObserver.observe(el);
      if (trackRef.current) geometryObserver.observe(trackRef.current);
    }

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove, { passive: false });
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onScroll);

    paintBar();

    return () => {
      geometryObserver?.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      const track = trackRef.current;
      if (track) {
        track.style.transform = '';
        track.style.transition = '';
      }
    };
  }, [scrollerRef, bounceMax, damping, minThumb]);

  return { trackRef, barRef };
}

export default useRail;

/**
 * Shared entrance motion for the landing page.
 *
 * tg-magic-animations §2.1 rules out linear durations in favour of spring
 * physics, and §2.2 limits what may animate to `transform` and `opacity`. Both
 * are encoded here so sections do not each re-declare (and drift from) the
 * curve: one spring, one stagger interval, one travel distance.
 *
 * Usage — the parent orchestrates, the children carry the motion:
 *
 *   <motion.div variants={staggerParent()} initial="hidden" whileInView="show"
 *               viewport={REVEAL_VIEWPORT}>
 *     <motion.h2 variants={riseItem()}>…</motion.h2>
 *     <motion.p  variants={riseItem()}>…</motion.p>
 *   </motion.div>
 *
 * Pass the component's `useReducedMotion()` result to both factories: under that
 * preference the travel is dropped entirely and only a short fade remains, so
 * nothing moves across the screen (§2.5).
 */

/** The canonical spring. Every entrance, tab glide and press settles on this. */
export const SPRING = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };

/** Gap between siblings in a staggered reveal. */
export const STAGGER = 0.08;

/** How far a revealing element travels. Restrained — a reveal, not a slide. */
export const RISE = 24;

/**
 * Shared viewport config. `once` so a section never re-animates on scroll-back,
 * and a negative margin so the reveal starts just before the block is fully in
 * view rather than after the user is already looking at it.
 */
export const REVEAL_VIEWPORT = { once: true, margin: '-80px' };

/** Orchestrating parent. Holds no motion of its own. */
export const staggerParent = (reduceMotion = false, { delayChildren = 0.05 } = {}) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduceMotion ? STAGGER / 2 : STAGGER,
      delayChildren,
    },
  },
});

/** A child that rises into place. */
export const riseItem = (reduceMotion = false) =>
  reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: RISE }, show: { opacity: 1, y: 0, transition: SPRING } };

/** A child that scales up as it fades in — for media and panels rather than text. */
export const scaleItem = (reduceMotion = false) =>
  reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, scale: 0.94 },
        show: { opacity: 1, scale: 1, transition: { ...SPRING, stiffness: 220 } },
      };

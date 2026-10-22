---
name: tg-magic-animations
description: Enforces luxury, 120fps motion design using Magic UI, Framer Motion springs, Lenis smooth scrolling, and 3D Canvas Globing for Traverse Globe.
---

# Traverse Globe "OP" Animation System (Magic UI + Framer Motion)

This skill dictates high-end motion design standards across Traverse Globe. It eliminates rigid, robotic CSS transitions and enforces fluid spring physics, tactile micro-interactions, and 120Hz smooth scrolling.

## 1. Core Component Arsenal (`src/components/magicui/`)

### A. Shimmer Action Button (`<ShimmerButton />`)
- **Use for**: Primary high-value CTAs (e.g., "Connect with an Expert", "Book Now", "Search Packages").
- **Design Rule**: Sweeps a luminous angled beam across the brand orange (`#FF5B04`) surface on idle.
```jsx
import ShimmerButton from '@/components/magicui/ShimmerButton';

<ShimmerButton as="a" href={url} className="px-7 py-4 rounded-2xl">
  Connect with an Expert
</ShimmerButton>
```

### B. Rolling Number Ticker (`<NumberTicker />`)
- **Use for**: Trust numbers, customer ratings, price tags, and counter stats.
- **Design Rule**: Numbers roll smoothly using spring physics (`damping: 40, stiffness: 120`) when scrolled into view.
```jsx
import NumberTicker from '@/components/magicui/NumberTicker';

<NumberTicker value={10000} suffix="+" />
<NumberTicker value={4.8} decimalPlaces={1} suffix="★" />
```

### C. Interactive 3D Flight Globe (`<Globe />`)
- **Use for**: Destination showcases, international corridors, and hero backgrounds.
- **Design Rule**: Lightweight WebGL canvas globe with interactive pointer dragging and pre-configured pins for India (Delhi/Karnal) and UAE (Dubai/Sharjah).
```jsx
import Globe from '@/components/magicui/Globe';

<Globe className="max-w-[500px]" />
```

### D. Velocity Infinite Marquee (`<Marquee />`)
- **Use for**: Customer reviews, partner airlines, destination tags, and trust strips.
- **Design Rule**: Smooth velocity glide with `pauseOnHover={true}`.
```jsx
import Marquee from '@/components/magicui/Marquee';

<Marquee pauseOnHover className="[--duration:30s]">
  {reviews.map(review => <ReviewCard key={review.id} {...review} />)}
</Marquee>
```

---

## 2. Global Motion Guidelines

1. **Spring Physics Over Linear Durations**:
   - Never use generic CSS transitions (`transition: all 0.5s ease-out`).
   - Use spring physics:
     ```js
     { type: "spring", stiffness: 300, damping: 25, mass: 0.8 }
     ```
2. **GPU Acceleration Rule**:
   - Only animate `transform` and `opacity`. Never animate `height`, `width`, `top`, or `margin` to prevent layout thrashing and CLS.
3. **Tab & Filter Morphing (`layoutId`)**:
   - When switching tabs (e.g. Dubai collection tabs or filter categories), wrap the active background pill in:
     ```jsx
     <motion.div layoutId="activePill" className="absolute inset-0 bg-brand-orange rounded-xl" />
     ```
4. **Tactile Buttons**:
   - Buttons must provide tactile spring feedback on tap:
     ```jsx
     <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} />
     ```
5. **Accessibility**:
   - Always honor `prefers-reduced-motion`. Lenis and complex loops must gracefully degrade to static displays.

## 3. Atmospheric Background System (`AestheticBackground` & `DotPattern`)

- **Never use flat opaque solid backgrounds** (e.g. solid `bg-white` or opaque `bg-surface`) across full-width page wrappers.
- The layout is wrapped in `<AestheticBackground />`, providing:
  - Atmospheric **Sunset Orange** (`#FF5B04`) and **Coastal Teal** (`#075056`) ambient blurred orbs.
  - Cartographic travel atlas **`DotPattern`** with radial vignette.
- **Section Translucency Rule**: Sections must use translucent backdrops (`bg-brand-canvas/40 backdrop-blur-[2px]`, `bg-brand-canvas-2/55`, or `bg-transparent`) so the ambient depth shines through naturally between cards and content.


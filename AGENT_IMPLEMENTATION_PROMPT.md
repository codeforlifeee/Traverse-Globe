# PROMPT FOR IMPLEMENTATION AGENT

Copy and paste the exact prompt below into your AI agent (or execute it directly in Antigravity) to implement all the requested changes across Traverse Globe:

---

```markdown
# TASK: Execute Full Website Redesign & Conversion Optimization for Traverse Globe

You are tasked with executing the complete redesign and optimization plan for Traverse Globe based on the master specification in `WEBSITE_REDESIGN_REQUIREMENTS.md`.

## Mandatory Guidelines & Rules:
1. Adhere strictly to the three workspace skills:
   - `tg-ui-system`: Primary CTA `#FF5B04`, never pure `bg-white` (use `bg-brand-canvas`), `font-season` for titles, `font-canva-sans` for body, `font-poppins` for badges. Always use Skeleton loaders.
   - `tg-sanity-data`: GROQ queries strictly in `sanityClient.js`, consume via `src/hooks/queries.js`.
   - `tg-revamp-routing`: Preserve redirects, lazy-load sections with `<Section height={...}>`.
2. Reference the detailed audit document: `WEBSITE_REDESIGN_REQUIREMENTS.md`.

---

## EXECUTION STEPS:

### Step 1: Hero Section & Lead Capture Form
- File: `src/components/HeroSection.jsx`
- Actions:
  1. Remove the `<form onSubmit={onSearch}>` search bar and popular chips.
  2. In place of the search bar, add a high-converting primary CTA button: "Connect with an Expert" (`bg-brand-orange text-white`) and a secondary WhatsApp chat button.
  3. Swap the background image fallback `HERO_FALLBACK_IMAGE` to a luxury Dubai skyline twilight photo (`https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80`). Also update `<link rel="preload">` in `index.html`.
  4. Replace the static "Bali Wellness Retreat" highlight card (lines 136-188) with an embedded **Lead Capture Form** (`src/components/HeroLeadForm.jsx`):
     - Fields: Name, Phone / WhatsApp Number, Destination of Interest (dropdown), Month of Travel, Number of Travelers.
     - Submit Button: "Get Custom Quote & Itinerary" (`bg-brand-orange`).
     - Connects to Google Sheets webhook endpoint (`/api/lead-webhook` or Google Apps Script URL).
     - Success state: Instant confirmation badge + WhatsApp direct message link.
  5. Remove `<TrustStrip variant="ink" />` from the bottom of `HeroSection.jsx`.

### Step 2: Reposition Trust Strip in `Home.jsx`
- File: `src/pages/Home.jsx`
- Action:
  Mount `<TrustStrip variant="canvas" />` immediately below the first package cards/curated destinations section.

### Step 3: Package Card Redesign (Thrillophilia Benchmark)
- File: `src/components/PackageCard.jsx`
- Benchmark: Reference `image12.png` (Thrillophilia base card).
- Layout:
  1. Top image with gallery pagination dots (`• • •`) and discount pill (`SAVE ₹XX,XXX`).
  2. Duration on left (`7D / 6N`), Rating on right (`★ 4.6 (9)`).
  3. Package Title in bold font.
  4. Key Stops pill with subtle background (e.g. `3D Dubai • 2D Abu Dhabi`).
  5. Price block: Strikethrough original price, green discount tag, bold final price (`/ Adult`).
  6. Bottom buttons:
     - Replace "Quick view" button with a dedicated **Call Button** (phone icon square button).
     - Primary button: "View Package" / "Request Callback", with dual quick-view preview modal support.

### Step 4: Streamline Homepage Sections (`src/pages/Home.jsx`)
- File: `src/pages/Home.jsx`
- Actions:
  1. Keep only ONE destination carousel: Retain `<TrendingDestinations />` and remove `<TopDestinations />` (or combine them).
  2. Remove `<HotelCategories />` entirely from `Home.jsx`.
  3. Remove `<CustomerGrid />` (standalone photos section).
  4. Remove `<VideoTestimonialBand />` (video testimonials section).
  5. Reorder: Place `<ExplorePrices />` (packages) *after* `<FeedbackSection />` (reviews).

### Step 5: Upgrade "Why Choose Traverse Globe" (`src/components/WhyChooseUs.jsx`)
- File: `src/components/WhyChooseUs.jsx`
- Actions:
  1. Keep the section. Refine Dubai information to 5–10 high-impact lines highlighting bespoke Dubai family trips, zero hidden fees, and dedicated on-ground support.
  2. Add an orange "Call Our Travel Expert" button below the 3 guarantee badges.
  3. Replace the right-column Swiper slider (`serviceSlider`) with an engaging Adventure/Scuba diving video player (supporting video playback with image poster fallback).

### Step 6: Embed Trip Photos Inside Reviews (`src/components/FeedbackSection.jsx`)
- File: `src/components/FeedbackSection.jsx`
- Action:
  Add thumbnail support (`tripPhotos`) directly inside review cards so customer photos appear alongside their review and rating, eliminating the need for a separate photo carousel.

### Step 7: Add Travel Guides / Blog Section Above FAQ (`src/pages/Home.jsx`)
- Files: Create `src/components/HomeBlogSection.jsx` & update `src/pages/Home.jsx`
- Action:
  Create a 3-card travel guide preview component fetching recent posts via `useBlogPosts(3)` and mount it directly above `<HomeFAQ />` on the homepage.

### Step 8: Replace Traveler Banner with CMS Sales Banner
- Files: Create `src/components/revamp/SalesBanner.jsx`, update `src/pages/Home.jsx`
- Action:
  Replace `VideoHero.jsx` with a responsive promotional sales banner configurable for seasonal campaigns, discounts, and inquiry CTAs.

### Step 9: Add Activities into Navigation & Routes
- Files: `src/components/Header.jsx`, `src/App.jsx`
- Action:
  In the top navigation, add **"Activities"** (with dropdown: Desert Safari, Scuba Diving, Dhow Cruise, Theme Parks) linked to activity packages.

### Step 10: Validation
- Run `npm run build` to verify bundling passes with zero syntax or import errors.
- Confirm clean responsive rendering across mobile and desktop.
```

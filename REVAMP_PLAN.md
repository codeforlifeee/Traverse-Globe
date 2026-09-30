# Traverse Globe — Revamp Plan

**Author:** Principal Frontend Engineer & Product Designer
**Date:** 2026-09-30
**Status:** Decision-ready. Awaiting phase-1 kickoff approval.

---

## Files & Screenshots Reviewed

- `DESIGN.md` — brand constitution (Human UI, orange ecosystem, signature motif)
- `CLAUDE.md` — locked stack + current architecture
- `src/App.jsx` — current routing (37 routes, mostly legacy redirects)
- `src/data/categoryConfig.js` — 12-destination taxonomy (7 international, 5 domestic)
- `src/pages/*` — 17 page files, mostly one-off destination pages that already redirect to the dynamic route
- `sanity-studio/schemas/*.js` — 6 document types (`package`, `hotel`, `destination`, `banner`, `blogPost`, `testimonial`) + 3 inline types
- `competitor_analysis/RaynaTours/homepage.png` — activity-first hierarchy, dark testimonial rail, save-% badges
- `competitor_analysis/MakeMyTrip/homepage.png` — dense mega-search, "Handpicked Collections", deep SEO footer
- `competitor_analysis/Cleartrip_ME/homepage.png` — minimalist hero, one deal carousel, big FAQ
- `competitor_analysis/Cleartrip_IN/homepage.png` — banner strips, About/How/Why long-form SEO
- `competitor_analysis/Almosafer/homepage.png` — cinematic hero, review-cards-as-social-proof, USP grid, trending-destinations SEO grid
- `competitor_analysis/Wego/homepage.png` — signature mascot, single-search focus, price-first destination cards

---

## 1. Executive Summary

### The three biggest problems with today's site

1. **The site sells nothing above the fold.** The hero is a spinning loader → carousel → generic "Where to?" search. Nothing on screen tells a family from Delhi or Sharjah why they should trust Traverse Globe over MakeMyTrip. No headline argument. No signature. No price hook.
2. **The information architecture is destination-first, but the buyer is theme-first.** A family shopping for "Honeymoon in December" or "5-day school-break trip under ₹80k" has no entry point. Every path forces them through a country-first funnel that only serves people who already know where they want to go.
3. **The detail pages read like brochures, not conversion surfaces.** No sticky booking widget. No urgency signals. No trust ladder. The lead-capture modal is time-triggered globally at 10 seconds — an interruption pattern that trains users to dismiss it before they know what you sell.

### The three biggest bets in the new design

1. **A dual-entry homepage** — "Where to?" (destination search) AND "What kind of trip?" (theme + budget + duration) as two co-equal paths. This is the single biggest lift for the mid-tier family segment on both sides of the Gulf.
2. **A signature motif that carries the brand** — the "kicker + rule + ampersand" pattern (small uppercase label, thin gray divider, headline with one orange phrase). Applied consistently across every section, this replaces the generic-template smell that most Sanity+Tailwind sites suffer from.
3. **A conversion-native detail page** — sticky right-rail widget, day-by-day timeline, inclusion/exclusion truth table, "still deciding?" WhatsApp escape hatch, and lead-capture that opens on real intent signals (scroll depth + time on page), not a timer.

### Why this will convert families better than the current build

Mid-tier families (₹50k–₹2L / AED 2k–8k trip budgets) buy on **trust + clarity + speed of answer**. They are not booking flights on impulse — they are researching a big-ticket family purchase over 5–14 days across 6–10 sessions. The current site optimises for the impulse browser (heavy carousels, timed popup, thin content). The new build optimises for the returning researcher (persistent shortlist, comparable cards, itinerary transparency, WhatsApp continuity), while still giving the impulse browser a fast path via the dual-entry hero and prominent "packages under ₹X" strip.

---

## 2. Competitor Teardown

| Insight | Steal / Leave | Source |
|---|---|---|
| Activity-first navigation chips (Activities / Holidays / Visas) above the search bar. Compact, gives users a mental map before they type. | **Steal**, adapted to Packages / Destinations / Themes / Hotels / Chardham. | `RaynaTours/homepage.png` |
| Save-% badge on the corner of every card (`Save 11.6%`) + inline rating pill (`4.6`). Reduces "is this a good deal?" cognitive load. | **Steal** — add to `PackageCard`. Replace strike-through with badge + strike. | `RaynaTours/homepage.png` |
| Dark testimonial rail with named-avatar cards and store-badge (Play/App Store) — reads as verified social proof. | **Steal the dark rail**. **Leave the store badges** (we have no app). Substitute with "Verified WhatsApp booking" pill. | `RaynaTours/homepage.png`, `Almosafer/homepage.png` |
| MakeMyTrip's mega-search with 12+ tabs + student/GST/armed-forces sub-toggles. Cluttered, high-cognitive-load, screams B2C aggregator. | **Leave.** Wrong signal for a curated-packages boutique. | `MakeMyTrip/homepage.png` |
| MakeMyTrip's "Handpicked Collections for You" strip (`Top 8 Stays in & Around Delhi`, `Top 11 Beach Destinations`). Themed curation beats geographic filters for family shoppers. | **Steal** as "Themes" section — Honeymoon, Family with Kids, Adventure, Pilgrimage, Beach Escape, Hill Retreat. | `MakeMyTrip/homepage.png` |
| Cleartrip's disciplined minimal hero (`Book Flights & Hotels` + one search box, everything else below fold). High trust, low noise. | **Steal the discipline**. Our hero is asymmetric (per DESIGN.md), but the message hierarchy must be this clean. | `Cleartrip_ME/homepage.png` |
| Cleartrip's Exclusive Deals carousel with code + `HONGKONG` chip inline on each card. Turns offers into shoppable inventory. | **Steal** as "Live Offers" strip — SEASON20, EARLYBIRD, etc. | `Cleartrip_ME/homepage.png` |
| Almosafer's "Top hotels" section showing **destinations** (not hotels) with a hotel name underneath. Clever double-duty — sells the city and the hotel. | **Steal the pattern**. Our "Top hotels" strip = destination image + featured hotel from Sanity + starting price. | `Almosafer/homepage.png` |
| Almosafer's "Why book with Almosafer" USP grid (Saudi Arabia's #1, Deals You Won't Find, Pay Your Way, Book Now Pay Later). Concrete promises, not adjectives. | **Steal the pattern, not the copy.** Our USPs: Family-first curation / Fixed prices, no hidden fees / WhatsApp support in Hindi + Arabic / Pay in INR or AED. | `Almosafer/homepage.png` |
| Almosafer's Trending Hotels / Trending Flights / Trending Airlines link farm — massive SEO grid at the bottom. | **Steal** for SEO — a "Popular Searches" grid: `Dubai packages under ₹50,000`, `5-day Kerala honeymoon`, `Chardham from Delhi`. Data-driven, deep-linked. | `Almosafer/homepage.png` |
| Wego's mascot + single-input search. Personality > polish; competes on brand feel, not feature count. | **Adapt the principle**, not the mascot. Our signature is the kicker + hairline rule, not a character. | `Wego/homepage.png` |
| Wego's "700+ travel websites. One simple search." positioning line. Direct promise, no adjectives. | **Steal the writing style**. Our line: "Handpicked family trips. One WhatsApp away." | `Wego/homepage.png` |
| Cleartrip IN's endless long-form "About/How/Why/FAQ" wall of text at bottom. Necessary for SEO in this vertical. | **Steal**, but structure it as accordions per DESIGN.md, not raw prose. | `Cleartrip_IN/homepage.png` |
| Every competitor: hero uses one strong image or subtle video, never a stacked carousel that pushes content below the fold. | **Steal the discipline.** Our current 3-slide hero pushes trust signals below the fold on mobile. Single hero image + subtle Ken Burns motion. | All six |

---

## 3. Information Architecture & Routing

### New sitemap

```
/
├── /packages                            (all packages, filter/sort)
│   ├── /packages/:slug                  (canonical package detail — new)
│   └── /packages/theme/:theme           (honeymoon, family, adventure, pilgrimage, beach, hills)
├── /destinations                        (overview grid — kept)
│   ├── /destinations/international      (kept)
│   ├── /destinations/domestic           (kept)
│   ├── /destinations/:type/:category    (listing — kept as canonical)
│   └── /destinations/:type/:category/:slug   (kept, but 301s to /packages/:slug over 2 releases)
├── /hotels                              (all hotels — new, was /hotels/:category only)
│   ├── /hotels/city/:city               (city-scoped, new — Almosafer pattern)
│   ├── /hotels/:category                (kept — luxury / budget / resort etc)
│   └── /hotels/:category/:slug          (kept — but canonicalise via <link rel="canonical">)
├── /guides                              (new — SEO content hub)
│   ├── /guides/:slug                    (blog post detail — replaces /blog/:slug)
│   └── /guides/destination/:category    (destination guide, e.g. "Dubai in December")
├── /chardham                            (new — first-class landing; currently hidden inside domestic)
├── /trust                               (new — one page with reviews, refund policy, team, licences)
├── /contact                             (kept)
├── /about                               (kept, rewritten)
├── /search?q=…                          (new — sitewide search results)
├── /shortlist                           (new — persistent localStorage-backed compare tray)
└── /404                                 (new — playful, per DESIGN.md)
```

### Route change table

| Old URL | New URL | Redirect | Rationale |
|---|---|---|---|
| `/services` → `About` component (silent alias) | Remove; link `/about` directly | 301 → `/about` | Nobody types `/services`; it's misleading. |
| `/uae-packages`, `/thailand-packages`, … (10 legacy roots) | `/destinations/international/:category` | 301 (already exists via `LegacyRedirect`) | Keep. Working. |
| `/uae-packages/:slug`, … (10 legacy slugs) | `/packages/:slug` | 301 | New canonical package URL is shorter, shareable, and doesn't leak the taxonomy on WhatsApp shares. |
| `/package/:slug` | `/packages/:slug` | 301 | Plural + canonical. |
| `/destinations/:type/:category/:slug` | `/packages/:slug` | 301 (soft — keep both live for 90 days) | Same reason. **Do not break Google indexing** — announce canonical via `<link rel="canonical">` for 30 days before flipping the 301. |
| `/hotels/:category` | Kept, plus `/hotels/city/:city` alias | New route | Users search by city (`hotels in Dubai`), not by star-tier. Both must resolve. |
| `/hotels/:category/:slug` | Kept | `<link rel="canonical">` to `/hotels/:slug` (future) | Prepare for a future flat hotel URL. Don't ship the flat URL yet — no need. |
| `/blog` | `/guides` | 302 first (60 days), then 301 | "Guides" outperforms "Blog" on click-through for travel intent queries. `/blog` is developer language. |
| `/blog/:slug` | `/guides/:slug` | 302 → 301 | Same. |
| (none) | `/packages/theme/:theme` | New | Theme-first entry — the biggest missing surface today. |
| (none) | `/guides/destination/:category` | New | Content SEO. Each of 12 destinations gets a long-form guide. |
| (none) | `/chardham` | New (also reachable at `/destinations/domestic/chardhamyatra`) | This is a spiritual-tourism product that needs first-class positioning, not a footer link. UAE families are a large market for this. |
| (none) | `/trust`, `/shortlist`, `/search` | New | Trust page = one-stop credibility. Shortlist = compare tray. Search = universal search across packages+hotels+guides. |
| `path="*"` → `<Navigate to="/">` | Real `/404` page | Replace | Silent redirects to `/` hurt SEO and confuse users. |

**Redirect rule:** any redirect must be a 301 in production (via `_redirects` for Netlify or `.htaccess` since this project uses FTP hosting per CLAUDE.md). Client-side `<Navigate>` is not indexed as a redirect by Google.

### Why keep `/destinations/:type/:category` when we're moving packages to `/packages/:slug`?

The **listing** page still deserves the taxonomy in the URL — `/destinations/international/uae` reads like a section, gets bookmarked, and links well from search. The **detail** page doesn't need it, because a package is a product, and product URLs should be flat and shareable. This split matches how Amazon (category browse + flat product URLs), Booking.com (city browse + property URLs), and Rayna Tours (activity type + flat activity URLs) all resolve the same tension.

---

## 4. Page-by-Page Wireframe Plan

### 4.1 `/` — Home

**Purpose:** In 3 seconds, tell a family what we sell, why we're trustworthy, and give them two paths in — search or browse-by-theme.

**Section order:**

1. **Header** — transparent-on-load nav that turns solid white on scroll (per DESIGN.md §7). Logo left, mega-menu centre (Packages / Destinations / Themes / Hotels / Guides), phone + WhatsApp + shortlist icon right.
2. **Hero (asymmetric, 70/30 split)** — left column: kicker "CURATED FAMILY TRIPS · INDIA + UAE", headline "Your Genuine, Affordable, **First-to-Go** Travel Partner." ("First-to-Go" in orange, per DESIGN.md §7). Below: dual search — one tab "Where to?" (autocomplete), one tab "Plan by budget & vibe" (theme dropdown + budget slider + duration). Right column: hero image, subtle Ken Burns motion, single overlaid highlight card ("Dubai · 5N · From ₹49,900 · Save 12%") pulled forward to break the grid.
3. **Trust strip** — full-bleed strip, off-white background, 4 items with icons: `10,000+ Happy Families served` · `Secure payments (Razorpay/PayTabs)` · `24/7 WhatsApp support in Hindi + Arabic` · `Fixed prices, no hidden fees`. Per DESIGN.md §3B.
4. **Featured packages ("Pick the Winner" row of 3)** — middle card 20% larger, orange kicker "OUR PICK THIS WEEK" above it. Others read as supporting cast.
5. **Browse by theme** — 6 large tiles: Honeymoon · Family with Kids · Adventure · Pilgrimage · Beach Escape · Hill Retreat. Each tile = photo + count ("128 packages"). This is the biggest new IA surface.
6. **Destinations rail — horizontal scroll** — image cards with destination name + starting price, MakeMyTrip / Wego pattern. Tap → `/destinations/international/uae` etc.
7. **Live Offers strip** — Cleartrip pattern: 4 cards, each with promo code chip + one-line offer + destination. Copy code inline.
8. **Featured hotels ("Top stays" — Almosafer pattern)** — destination photo + featured hotel + starting price. Doubles as destination promotion.
9. **Traverse Globe Guides** — 3 latest guide cards. "Dubai in December: Family Weekend Guide" style.
10. **Testimonials — dark section** (Rayna pattern) — dark navy `#0f172a` background, 4 named review cards, each with source pill ("Verified via WhatsApp booking" / "Verified Google Review"). Photo of family where consent given.
11. **The USP grid** — Almosafer pattern, 4 cards: Curated by hand · Fixed all-inclusive prices · WhatsApp continuity · Pay in ₹ or AED. Icons, no marketing adjectives.
12. **Popular Searches SEO grid** — flat text-link grid, categorised: Popular packages, Popular destinations, Popular themes, Popular hotels. Directly linkable, indexed by Google.
13. **Long-form About + FAQ accordion** — per Cleartrip pattern, needed for SEO in this vertical. Accordions, not walls of text.
14. **Footer** — dark navy, four columns, licence badges bottom row.

**Dominant Human UI rule:** Sharpen the Message (§6.1) + Pick the Winner (§6.4). The headline commits, the featured card row visibly hierarchies.

**Data:** `banner` (Sanity, category=general), `package[featured==true]`, `destination[active==true]`, `hotel[featured==true]`, `testimonial[featured==true]`, `blogPost[order by publishedAt desc][0..2]`.

**Mobile:**
- Hero collapses to single-column stack; highlight card sits below hero image, not overlaid.
- Dual-search becomes a big pill button `[Search family trips]` that opens a full-screen modal with the two tabs (per DESIGN.md §4).
- Themes reduce from 6-tile grid → horizontal snap-scroll.
- Bottom sticky nav appears: Home · Search · Shortlist · WhatsApp · Menu.

---

### 4.2 `/packages` — All Packages (new consolidated listing)

**Purpose:** Universal package browse. Absorbs today's per-destination pages when a user wants breadth.

**Section order:**

1. Breadcrumb + H1 "All Family Packages · India + UAE"
2. Sticky sub-filter bar (mobile: bottom sheet trigger)
3. Two-column layout:
   - **Left rail (25%):** Filters — Price range (shadcn Slider), Duration (chips), Destination (multi-select checkboxes), Theme, Star rating, "Free cancellation" toggle. Per DESIGN.md §3C.
   - **Right (75%):** Sort dropdown + result count + grid of `PackageCard`s. Middle card in every row of 3 is elevated ("Pick the Winner" — DESIGN.md §7).
4. Urgency badges on individual cards: "🔥 High demand", "⚡ Only 2 seats", "🎉 Just launched" (DESIGN.md §3C).
5. Sold-out packages stay visible, grayscale filter + `NOT AVAILABLE` badge (DESIGN.md §7).
6. Load-more button with shimmering skeleton on load (not spinner).

**Dominant rule:** Pick the Winner + Give Color Meaning. Only the "Book Now" CTA is orange; every other affordance is neutral.

**Data:** `package[active==true][filters]`. Facet counts computed client-side from initial GROQ fetch (project is small enough).

**Mobile:** Filter rail becomes a full-screen "Filters" sheet triggered from a sticky top button. Sort becomes a small pill next to it.

---

### 4.3 `/packages/theme/:theme` — Themed collection

**Purpose:** Second-largest new surface. Entry point for buyers who know what kind of trip, not where.

**Themes:** `honeymoon`, `family`, `adventure`, `pilgrimage`, `beach`, `hills`.

**Sections:**

1. **Editorial hero** — big theme photo, kicker "THEME · HONEYMOON", H1 "Honeymoon Packages for the Genuinely-in-Love", 1-sentence sub. **Not** the search bar hero.
2. **Curated picks** — 6 packages with editorial notes ("Why we picked this: private Bali villa, no group activities").
3. **Explore by destination within theme** — chips: `Dubai (12)` `Kerala (8)` `Andaman (5)`.
4. Standard filters + grid (as in 4.2).
5. **Related guides** — 3 `guides/*` pieces.

**Data:** Requires a new `themes` field on `package` schema (array of strings — see §5 Schema changes).

**Dominant rule:** Sharpen the Message + Build the Argument.

**Mobile:** Editorial hero shrinks; picks and grid follow the same pattern as 4.2.

---

### 4.4 `/destinations` — Overview (kept, restyled)

**Purpose:** Visual entry into geographic browse.

**Sections:**

1. Kicker + headline "12 destinations. Every one tested by an actual family."
2. Toggle: International (7) / Domestic (5) — segmented control.
3. Grid of destination cards: image, name, package count, starting price, one-line teaser. `rounded-2xl`, hover lift.
4. "New this season" callout for Chardham + Vietnam.

**Data:** `destination[active==true]` from Sanity, `package[category==X]` count grouped client-side.

---

### 4.5 `/destinations/:type/:category` — Listing (kept)

Same as `/packages` but pre-filtered to one destination, with a destination-specific header (hero image, "About Dubai" 2-liner, "Best time to visit" chip). Reuses the same `PackageCard` grid.

---

### 4.6 `/packages/:slug` — Package Detail (new canonical) — **the highest-conversion surface**

**Purpose:** Convert a shortlist to a lead.

**Sections (top to bottom):**

1. **Sticky header on scroll** — condensed nav appears with package title + "Get quote on WhatsApp" button.
2. **Breadcrumb** — `Home > Packages > Dubai > 5N Dubai Family Special`.
3. **Hero gallery** — MakeMyTrip-style: 1 large image left, 2×2 grid right, "+8 photos" overlay on last tile → opens full-screen lightbox. `aspect-[16/9]`.
4. **Title block** — kicker "FAMILY · UAE", H1 title, rating pill (`⭐ 4.6 (128)`), duration chip, "Save 12%" badge, share + heart icons.
5. **Two-column body (60/40):**
   - **Left (main):**
     - Highlights — 4–6 bullet chips with icons.
     - Overview — 2–3 paragraphs, expandable "read more".
     - **Itinerary** — vertical timeline stepper, one node per day, with expand-to-read pattern (DESIGN.md §3D). Framer Motion collapse.
     - **Inclusions / Exclusions** — two-column truth table, ✅ green + ❌ red (DESIGN.md §3D).
     - **Hotels featured** — small cards from `hotelInfo.options[]`, each linking to `/hotels/:slug` if it exists in the hotel doc.
     - **Cancellation & refund policy** — accordion.
     - **Reviews** — 3–5 testimonials filtered by `package` reference (needs new `packageRef` field on `testimonial` — see §5).
     - **FAQ** — accordion.
     - **Related packages** — 3-card row from same destination.
   - **Right (sticky booking widget) — stays fixed as user scrolls:**
     - Price with strike-through + "SAVE 12%" chip.
     - "Starts from ₹" prominent.
     - Date-of-travel picker (optional; we don't have inventory yet — pre-fills the lead).
     - Number of travellers stepper (adults, kids, infants).
     - **Primary CTA:** `Get Quote` (opens BookingModal, prefilled).
     - **Secondary CTA:** `Chat on WhatsApp` (deep link with package name).
     - Trust row: "No payment now · Fixed price · Free cancellation up to X days".
     - Small "Prefer PDF? Download itinerary" link — the DESIGN.md §7 secondary CTA.
6. **Footer trust strip** — refund policy highlighted (DESIGN.md §7).

**Dominant rule:** Build the Argument (§6.3). Sections deliberately sequenced: who → what → what included → what's not → what people said → still deciding? → book.

**Data:** `package[slug.current==$slug]`, `testimonial[references(^._id)]`, related packages by `category`.

**Lead-capture change:** the global 10-second timed popup is **removed sitewide**. On this page only, a soft "still deciding?" toast slides in at 60% scroll depth with `Get quote on WhatsApp` — a scroll-triggered offer, not an interruption.

**Mobile:**
- Two-column collapses to single column.
- Sticky booking widget becomes a **bottom sticky bar**: price + "Get Quote" button. Tapping opens the full booking modal.
- Gallery = swipeable Swiper carousel.
- Itinerary stays a timeline, days become collapsible.

---

### 4.7 `/hotels` and `/hotels/city/:city` and `/hotels/:category` — Hotel browse

**Purpose:** Hotel-only inventory, separate from packages. Almosafer-style.

**Sections:** same shape as `/packages` — filter rail (price, star rating, amenities, city), grid of `HotelCard`. City header when scoped.

**Data:** `hotel[active==true][filters]`.

---

### 4.8 `/hotels/:category/:slug` — Hotel Detail

Structurally mirrors 4.6 (Package Detail), but with hotel-specific sections: room types table with per-room prices, amenities grid, check-in/check-out times, cancellation policy, nearby attractions with distance, embedded Google Maps (link only, no iframe — for performance).

**Sticky widget** shows per-night price from selected room type, date range picker, "Get Quote" CTA.

---

### 4.9 `/guides` and `/guides/:slug` and `/guides/destination/:category`

**Purpose:** Content SEO. Top-of-funnel intent — "best time to visit Kerala", "Dubai with toddlers", "Chardham Yatra checklist".

**Sections (listing):** kicker + hero, category tabs (Travel Tips / Destination Guide / Travel Stories / News per Sanity schema), grid of guide cards with author + date + read-time estimate.

**Sections (detail):** long-form article layout, sticky table-of-contents left rail on desktop, related packages CTA every ~3 sections ("Ready to book Kerala? See our 5N Munnar package").

---

### 4.10 `/chardham` — Dedicated landing

**Purpose:** This is a spiritual product with a distinct audience (UAE-based NRIs, senior Hindu families). Deserves its own room.

**Sections:** cinematic hero with Kedarnath imagery, kicker "SACRED YATRA · 4 DHAMS", "12,000+ pilgrims travelled with us since 2020" stat, itinerary map, per-dham detail cards, "What we handle for you" (permits, medical, oxygen, food), packages, testimonials from prior yatris, FAQ.

**Data:** `package[category=="chardhamyatra"]` + destination-scoped testimonials + a dedicated guide.

---

### 4.11 `/trust` — New credibility page

**Purpose:** One URL to send to a hesitant customer. Lifetime value > cost of building it.

**Sections:** team photo + names, licences + IATA/ministry registrations, refund policy in plain English, payment security explainer, 20+ testimonials (long-form), press mentions if any, "meet the founders" video slot, WhatsApp CTA.

---

### 4.12 `/shortlist` — Persistent compare tray

**Purpose:** Family shoppers hoard tabs. Give them a per-device shortlist so returning sessions resume where they left off.

**Sections:** grid of shortlisted packages/hotels with side-by-side comparison table (price, duration, inclusions), "Send my shortlist to WhatsApp" button (bundles everything as a formatted message).

**Data:** `localStorage['tg_shortlist']` (array of `{id, type, addedAt}`). No auth needed.

**Micro-feature:** heart icon on every card sitewide → toggles shortlist membership with a small toast + framer-motion pulse. This is the DESIGN.md §7 heart/save-icon requirement, actually wired to something.

---

### 4.13 `/search` — Universal search results

**Purpose:** One search input in the header, matches packages + hotels + destinations + guides.

**Sections:** grouped results with type tabs (All / Packages / Hotels / Destinations / Guides), skeleton loaders per group, "no results" state with 3 suggested trending searches.

**Data:** GROQ query with `[_type in ["package","hotel","destination","blogPost"] && title match $q]`.

---

### 4.14 `/about`, `/contact`, `/404` — kept, rewritten

- `/about` — rewritten to the Build the Argument pattern (§6.3). Founders' story, why families, why India+UAE, what we don't do.
- `/contact` — form + WhatsApp + phone + India office + UAE office (if applicable). Prominent office hours in both timezones.
- `/404` — playful copy "Looks like you got lost in the jungle." with a search box and 3 popular packages. DESIGN.md §7.

---

## 5. Component Inventory

### 5.1 New shared components to build

| Component | Purpose | Props sketch | Used on |
|---|---|---|---|
| `Kicker` | The signature uppercase label above every H1/H2. | `{ children, color = "muted" }` | Every page. **The signature motif.** |
| `SectionRule` | The thin hairline gray divider between sections — the second half of the signature. | `{ variant = "default" \| "orange" }` | Every page. |
| `DualSearch` | Home hero dual-tab search: destination autocomplete + theme+budget+duration. | `{ onSearch, defaultTab }` | Home only. |
| `FilterRail` | Left-rail filters with Price slider, chips, checkboxes. | `{ facets, values, onChange }` | Packages, Themes, Hotels listings. |
| `MobileFilterSheet` | Full-screen bottom sheet wrapper around `FilterRail`. | `{ open, onClose, children }` | Mobile listings. |
| `PackageCard` | **Refactor of existing.** Add: heart icon, save-% badge, urgency badge, sold-out treatment. Middle-of-row size variant. | `{ pkg, size = "default" \| "large" \| "compact", showBadges }` | Everywhere. |
| `HotelCard` | Matches `PackageCard`'s visual language. | `{ hotel, size, showBadges }` | Hotels listing, hotel-in-package rows. |
| `ThemeTile` | Big tile for "browse by theme" on home. | `{ theme, count, image }` | Home. |
| `StickyBookingWidget` | Right-rail widget on detail pages, desktop. | `{ item, itemType }` | Package + hotel detail. |
| `MobileBookingBar` | Bottom sticky price + CTA on mobile detail pages. | Same as above. | Package + hotel detail, mobile. |
| `ItineraryTimeline` | Vertical stepper with day nodes. | `{ days }` | Package detail. |
| `InclusionsTable` | ✅/❌ truth table. | `{ included, excluded }` | Package detail. |
| `HeartIcon` | Toggle for shortlist. `localStorage` + optimistic UI + framer pulse. | `{ id, type }` | Every card. |
| `ShortlistTray` | Floating bottom-right widget with shortlist count. | `{ }` | Sitewide. |
| `ImageWithFallback` | Broken-image fallback per DESIGN.md §2. | `{ src, alt, className, fallback }` | Sitewide, replaces raw `<img>`. |
| `Kicker` + `SectionRule` compound in a `<Section>` layout | Standardises section headers. | `{ kicker, title, action, children }` | Every page. |
| `TrustStrip` | The 4-item horizontal trust bar. | `{ items }` | Home, detail pages. |
| `USPGrid` | 4-card promises grid. | `{ items }` | Home, about, trust. |
| `PopularSearchesGrid` | SEO link farm at bottom of home. | `{ groups }` | Home, category pages. |
| `AccordionFAQ` | Accessible accordion for FAQs. | `{ items }` | Home, detail, guides. |
| `SkeletonCard`, `SkeletonList`, `SkeletonDetail` | Named skeleton primitives that compose `<Skeleton />`. | — | Every fetching state. |
| `LiveOffersStrip` | Cleartrip-style offer carousel with copyable codes. | `{ offers }` | Home. |
| `BreadcrumbTrail` | Semantic breadcrumbs with structured data JSON-LD. | `{ items }` | All listing + detail. |
| `Motion.FadeInUp` | Wrapped framer-motion primitive with the standard easing. | `{ delay, children }` | Sitewide. Standardises animation vocabulary. |

### 5.2 Existing components to refactor vs delete

**Refactor:**
- `PackageCard.jsx` — add heart, save-%, urgency, sold-out, size variant.
- `HeroSection.jsx` — replace 3-slide carousel with single asymmetric hero + Ken Burns.
- `BookingModal.jsx` — remove global 10-second timer trigger (`TimedSitewideFormPopup` in `App.jsx`); accept richer prefill (package, dates, travellers, source-page).
- `Header.jsx` — add transparent-on-load-scrolled-to-solid pattern, mega-menu, shortlist icon.
- `Footer.jsx` — restructure to 4-column dark navy with licence badges.
- `FloatingButtons.jsx` — keep WhatsApp button but adopt DESIGN.md §7 gentle bounce; add a shortlist counter chip.

**Delete after migration:**
- `TimedSitewideFormPopup` in `App.jsx` — replaced by scroll-triggered soft toast on detail pages only.
- `src/pages/UAEPackages.jsx`, `BaliPackages.jsx`, `ThailandPackages.jsx`, `SingaporePackages.jsx`, `SriLankaPackages.jsx`, `VietnamPackages.jsx`, `LaosPackages.jsx`, `AndamanPackages.jsx`, `JaipurPackages.jsx`, `KeralaPackages.jsx`, `KashmirPackages.jsx` — these are 11 dead files. All requests already redirect to `/destinations/:type/:category` via `LegacyRedirect`. Deleting them shrinks the bundle graph and removes maintenance drag.

### 5.3 shadcn/ui primitives needed beyond the four already added

Already added: `Button`, `Slider`, `Checkbox`, `Skeleton`.

Add during Phase 1: `Dialog` (for BookingModal replacement + gallery lightbox), `Sheet` (mobile filter drawer + mega-menu drawer), `Accordion` (FAQ, itinerary), `Tabs` (dual search, guide categories), `Badge` (save-%, urgency, category chips), `Popover` (share, date picker anchor), `Toast` (shortlist added), `Command` (search palette — universal search), `Separator`, `Tooltip`, `Select`, `Input`, `Label`.

### 5.4 New Sanity schema fields (light additions, no breaking changes)

- `package.themes`: `array of string` from a fixed list (`honeymoon`, `family`, `adventure`, `pilgrimage`, `beach`, `hills`). **Multi-select.** Enables `/packages/theme/:theme`.
- `package.urgency`: `string` from `["", "high-demand", "few-seats", "just-launched", "sold-out"]`. Optional. Drives the card badge.
- `package.savingsPercent`: `number` (computed field displayable in Studio, or store manually). Optional; falls back to strike-price math.
- `package.freeCancellationDays`: `number`. Optional. Enables "Free cancellation up to X days" trust chip.
- `testimonial.packageRef`: `reference` to `package`. Optional. Enables per-package testimonial filtering.
- `hotel.themes`: same as `package.themes` where sensible.
- New document type `offer`: `{ code: string, title: string, discount: string, destination: reference, validUntil: date, image: url }` for the Live Offers strip.
- New document type `themeContent`: `{ theme, hero, editorial, faqs }` for the `/packages/theme/:theme` hero content.

None of these are breaking. All are additive optionals.

---

## 6. Signature & Style System

### 6.1 The signature motif

Every section on the site opens with the same three-element pattern:

```
UPPERCASE KICKER LABEL              (14px, letter-spacing 0.12em, slate-500)
Section Heading with One Orange Word    (28–48px, weight 700)
─────────────────────────────────── (1px hairline, slate-200, 40% width)
```

This is our **fingerprint** (DESIGN.md §6.7). Applied consistently, it makes an AI-generated Sanity+Tailwind site look hand-designed by one editorial eye.

### 6.2 Type scale (rem, mobile-first)

| Token | Mobile | Desktop | Weight | Use |
|---|---|---|---|---|
| `display` | 2.25rem (36px) | 3.5rem (56px) | 700 | Hero headline, once per page |
| `h1` | 1.75rem (28px) | 2.25rem (36px) | 700 | Page titles |
| `h2` | 1.5rem (24px) | 1.875rem (30px) | 700 | Section titles |
| `h3` | 1.25rem (20px) | 1.5rem (24px) | 600 | Card titles, block titles |
| `body-lg` | 1.0625rem (17px) | 1.125rem (18px) | 400 | Detail-page prose |
| `body` | 1rem (16px) | 1rem (16px) | 400 | Everything |
| `caption` | 0.875rem (14px) | 0.875rem (14px) | 400 | Meta lines |
| `kicker` | 0.75rem (12px) | 0.875rem (14px) | 600 | The signature kicker; `text-slate-500`, `tracking-widest`, uppercase |

Enforced via Tailwind config additions and a `<Text variant="…">` component. **The largest text on any page must be the most important text on that page** (DESIGN.md §6.5) — no exceptions.

### 6.3 Spacing rhythm

- Section vertical padding: `py-16 md:py-24` (fixed rhythm).
- Grid gutters: `gap-4 md:gap-6 lg:gap-8`.
- Container: `max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8` (kept from existing).
- **Two exceptions permitted:** hero (custom asymmetric), trust strip (full-bleed, `py-8`).

### 6.4 Colour system (locking DESIGN.md palette to Tailwind tokens)

Update `tailwind.config.js` to add:
```
'primary-orange': '#f97316'   // DESIGN.md §1 — CTA + one word in headlines only
'ink':            '#0f172a'   // DESIGN.md §1 — headings + footer
'canvas':         '#f8fafc'   // main bg — never pure white
'canvas-2':       '#f1f5f9'   // alternating section bg
'trust':          '#10b981'   // success/trust chips only
```

The existing `orange: '#FF5B04'` is retained as a legacy alias for one release, then removed. The new orange is `#f97316` per DESIGN.md §1. **This is a subtle brand shift — decision needed from stakeholder (see §10).**

### 6.5 Dark mode

DESIGN.md §7 requires dark mode. Approach: toggle stored in `localStorage`, controlled via `data-theme="dark"` on `<html>`. Every colour token defined twice (`:root` and `:root[data-theme="dark"]`). shadcn CSS variables already support this. Ship dark mode in **Phase 3** — don't let it block conversion work.

### 6.6 Motion vocabulary

| Motion | Curve | Duration | Where |
|---|---|---|---|
| Fade-in-up | `[0.22, 1, 0.36, 1]` (easeOutQuad-ish) | 400ms | Every above-fold section entry |
| Hover lift on cards | ease-out | 300ms | Cards sitewide |
| Modal / sheet enter | spring `{stiffness: 260, damping: 24}` | ~350ms | BookingModal, filters sheet, lightbox |
| Ripple on button click | Framer scale 0.98 → 1 | 150ms | Primary CTAs only |
| WhatsApp float bounce | Infinite `{repeat: Infinity, repeatType: "reverse"}`, 1.2s | Continuous | Floating button |
| Shortlist heart pulse | Spring `{scale: [1, 1.3, 1]}` | 300ms | On add to shortlist |

Standardised in `<Motion.FadeInUp>`, `<Motion.CardHover>`, `<Motion.Ripple>` wrappers so the vocabulary is consistent, not ad-hoc per component.

---

## 7. New Features Ranked by Leverage

| # | Feature | Impact (1–5) | Effort (1–5) | Ratio | Notes |
|---|---|---|---|---|---|
| 1 | **Sticky booking widget on detail pages + mobile bottom bar** | 5 | 2 | 2.50 | The single biggest conversion lift. Table stakes for this vertical. |
| 2 | **Themes IA (`/packages/theme/:theme`)** | 5 | 2 | 2.50 | Opens the biggest missing buyer path. Requires schema field + 6 theme pages. |
| 3 | **Shortlist + heart icons + WhatsApp share** | 4 | 2 | 2.00 | Family shoppers hoard tabs. Also feeds WhatsApp lead flow — high commercial value. |
| 4 | **Remove sitewide 10s popup, replace with scroll-triggered soft toast on detail** | 4 | 1 | 4.00 | Highest ratio on the list. Interrupts one bad pattern with one better one. |
| 5 | **Universal search (`Command` palette + `/search`)** | 4 | 2 | 2.00 | Also enables home dual-search. |
| 6 | **Live Offers strip driven by new `offer` schema** | 3 | 2 | 1.50 | Small effort, drives WhatsApp opens. |
| 7 | **Guides revamp + destination guides for SEO** | 4 | 3 | 1.33 | Slow burn, compounds over 6 months. Cheap once template exists. |
| 8 | **Dedicated `/chardham` landing** | 4 | 2 | 2.00 | Underrated market — UAE-based NRI Hindu families. Small dev work, big positioning. |
| 9 | **Compare tray on `/shortlist`** | 3 | 2 | 1.50 | Continues the shortlist promise. |
| 10 | **Universal `<Kicker>` + `<SectionRule>` motif** | 5 | 1 | 5.00 | Highest single-signature lift for perceived design quality. |
| — | **Wildcard: WhatsApp itinerary bot** | 5 | 4 | 1.25 | A user asks "send me Bali packages under 60k" on WhatsApp, gets a formatted reply. Uses Zapier + Sanity. Different bet — build only after Phase 2 metrics validate the WhatsApp channel. |

Total prioritised list, sorted by ratio (top 5 first): **#10, #4, #1, #2, #3, #5, #8, #6, #9, #7, wildcard**.

Interpret: the signature motif and the popup surgery are the fastest visible upgrades; the sticky widget, themes, and shortlist are the largest conversion moves. Guides is a slow SEO investment. The wildcard is a Phase-4 bet, not Phase 1.

---

## 8. Micro-interaction & Motion Spec

**Three moments of delight** that define the brand feel:

1. **Card hover on desktop** — the card floats 4px up, its shadow softens (soft-md → soft-xl), the image inside performs a subtle 1.05× zoom, and the CTA colour deepens. All 300ms, all easeOut. It should feel like a card lifting toward your fingertip, not a bounce.

2. **Adding to shortlist** — the heart icon fills orange, a satisfying scale pulse (`1 → 1.3 → 1` spring), a small toast fades in bottom-right with "Added to your shortlist" + a "View shortlist" link. Framer's `AnimatePresence` handles the toast enter/exit. This is the interaction that convinces users the site remembers them.

3. **Section reveal on scroll** — every section fades and slides up 24px as it enters the viewport, staggered by 60ms per child card. Uses `useInView` from `react-intersection-observer` (already installed) + framer-motion. It creates rhythm without feeling gimmicky.

Where framer-motion **must not** appear:

- Text content that a user needs to read immediately (no fade-in on itinerary body copy).
- Anything above the fold that would delay LCP (hero image renders instantly, motion applies to its overlay card only).
- Buttons except the ripple and hover-lift; never a full animated re-render.

---

## 9. Phased Execution Plan

Three phases. Each ships a demonstrable improvement on its own — no phase blocks a release.

### Phase 1 — Foundation & Signature (≈ 8 working days)

**Goal:** the site looks and feels like the finished product, even if half the new pages aren't built.

**Scope:**
- Establish `<Kicker>`, `<SectionRule>`, `<Section>`, `<Text>` primitives.
- Lock the type scale + colour tokens in `tailwind.config.js`.
- Build `<ImageWithFallback>`, refactor sitewide `<img>` usage.
- Refactor `Header` to the transparent-on-load / mega-menu pattern.
- Refactor `Footer` to the 4-column dark navy layout.
- Refactor `PackageCard` with heart, save-%, urgency, sold-out, size variants.
- Add `<HeartIcon>` + `<ShortlistTray>` + `localStorage` layer (compare tray page can come later).
- Add named skeleton primitives (`SkeletonCard`, `SkeletonList`, `SkeletonDetail`), replace every existing spinner.
- Rebuild `HeroSection` — single asymmetric hero + Ken Burns + overlaid highlight card + dual-search stub (destination tab only for now).
- Add trust strip beneath hero.
- Remove `TimedSitewideFormPopup` from `App.jsx`.
- Add `<BreadcrumbTrail>` with JSON-LD.

**Exit criteria:**
- Home + one destination listing + one package detail page use the new visual language.
- Lighthouse mobile ≥ 90 on all three (perf, accessibility, best-practices, SEO).
- Old pages continue to render (no regression).
- Every card sitewide is a `<PackageCard>` — no orphan card styles.

**Ship-ability:** the site looks materially different and better after Phase 1 alone.

### Phase 2 — Conversion Surfaces (≈ 10 working days)

**Goal:** move the leading indicators (add-to-shortlist, WhatsApp opens, form starts).

**Scope:**
- Build `StickyBookingWidget` + `MobileBookingBar`.
- Rebuild package detail (`/packages/:slug`) with new sections + widget.
- Add `<ItineraryTimeline>`, `<InclusionsTable>`, related-packages row.
- Ship `/packages` universal listing with `<FilterRail>` + `<MobileFilterSheet>` + shadcn primitives.
- Add urgency badges, sold-out treatment.
- Ship `/packages/theme/:theme` (schema field + 6 theme pages).
- Add Sanity `themes`, `urgency`, `freeCancellationDays` fields; run one-time migration to backfill `themes`.
- Add `<LiveOffersStrip>` + new `offer` schema.
- Add scroll-triggered detail-page soft toast (replacement for sitewide popup).
- Universal search: `<CommandK>` palette + `/search` results page.
- Set up canonical `<link>` tags on old `/destinations/:type/:category/:slug` pointing to new `/packages/:slug` (start the 30-day pre-redirect window).

**Exit criteria:**
- Package detail conversion (form-start / visit) up ≥ 40% in an A/B window (measurable via GA event).
- Zero pages still using the old spinner or old card style.
- Sanity Studio ships the schema additions and content team has backfilled themes on ≥ 80% of live packages.

### Phase 3 — Surfaces, Polish & Signature (≈ 8 working days)

**Goal:** finish the site's outer edges + the pieces that compound.

**Scope:**
- Ship `/hotels` universal listing + `/hotels/city/:city` alias.
- Rebuild hotel detail page (`/hotels/:category/:slug`) to match package detail's conversion pattern.
- Ship `/guides` and `/guides/:slug` (migrate blog data, add per-destination guides).
- Ship `/chardham` dedicated landing.
- Ship `/trust` credibility page.
- Ship `/shortlist` compare tray + WhatsApp share.
- Add `<PopularSearchesGrid>` + long-form home FAQ.
- Flip the canonical redirects to 301 on old package URLs.
- Delete the 11 dead `src/pages/*Packages.jsx` files.
- Ship dark mode toggle.
- Ship 404 page.

**Exit criteria:**
- All routes in the new sitemap live.
- All legacy routes 301 to canonicals.
- No `src/pages/*Packages.jsx` files remain.
- Home + detail + listing scores on Lighthouse mobile ≥ 92.
- Content team has published ≥ 5 destination guides.

**Wildcard for Phase 4 (not in scope now):** WhatsApp itinerary bot, real online checkout, multi-currency toggle in header.

---

## 10. Risks & Open Questions (Decisions I need from you)

1. **Orange shift: `#FF5B04` → `#f97316`?**
   DESIGN.md §1 specifies `#f97316`. The codebase and PWA manifest ship `#FF5B04`. They are visually close but not identical. **Recommendation:** switch to `#f97316` in Phase 1 and update the PWA manifest — the DESIGN.md decision has already been made. Confirm.

2. **Legacy package URL migration timeline.**
   Moving from `/destinations/:type/:category/:slug` to `/packages/:slug` will churn any indexed URLs. **Recommendation:** ship `<link rel="canonical">` in Phase 2 (30-day window), flip 301 in Phase 3. Accept a temporary 5–10% dip in ranking during the transition, recovered within 60 days. Do you have inbound links or ad campaigns pointing at the old URLs? If yes, we align the flip with your next ad-refresh cycle.

3. **Two homepages, one brand — or unified?**
   Indian + UAE families both. Recommend a single home with subtle localisation: currency toggle in header (INR default for `.in`/India IP, AED default for UAE IP), Hindi + Arabic mention in the WhatsApp promise line, guide content that names both starting points. **Alternative:** split into `/in` and `/ae` sub-paths with duplicated home. Adds SEO complexity, splits the domain authority. **Recommendation:** unified home, localised via IP → default currency + language of testimonial excerpts. Confirm.

4. **The 11 dead destination-page files.**
   `src/pages/UAEPackages.jsx` and 10 siblings are unreachable (already redirected via `LegacyRedirect`). Delete in Phase 3? Any reason they still exist you're aware of? If a team member was in mid-refactor, we salvage; if pure debt, we delete.

5. **Chardham as top-level route vs. under domestic.**
   `/chardham` is a strong positioning move but adds one route we'll never move again. Alternative: promote it inside `/destinations/domestic` with a large hero card + skip a dedicated route. **Recommendation:** top-level route. This audience isn't browsing by geography — they're searching "chardham yatra from delhi" and never opening a destinations index. Confirm.

---

**Which phase should we start executing first?**

# Landing Page Enhancement Plan — All 5 Tiers Combined

> Status: **Planning · Not yet started**
> Branch (to create): `feature/landing-tempting-v2` (off `feature/complete-frontend-revamp`)
> Estimated effort: **12-16 working days** across 4 phased sprints

---

## Diagnosis

The current home page has all the right sections (hero, trust strip, themes, offers, FAQ) but it reads like a **checklist, not a journey**. Visitors scan sections top-to-bottom without any emotional hook that says "I need to book NOW." The revamp fixed the *structure*; this plan injects **desire + urgency + humanity**.

---

## Phase 0 · Prep & Asset Inventory (1 day)

Before writing code, we need to gather/produce:

| Asset | Where From | Fallback If Missing |
|-------|-----------|--------------------|
| 4-6 drone video loops (10-15s each) | Coverr, Pexels, Mixkit (free) | Free stock placeholders, swap later |
| 12-20 real customer photos | Your Instagram DMs / past trip WhatsApp | Permission-quoted Google Reviews |
| 1-2 video testimonials (30-60s) | Reach out to 3 recent happy customers | Text testimonials with headshots |
| Founder photo + story (100 words) | You write it | Company logo + tagline |
| Press mentions (real) | Media kit | Skip strip if none exist |
| Certifications (IATA/TAAI numbers) | Business docs | Skip if not registered |

**Deliverable:** Populated Sanity documents + `/public/videos/`, `/public/customers/` folders

---

## Phase 1 · Emotional Hooks (3-4 days)

**Goal:** Make first 5 seconds feel like a movie.

| Component | File Path | Complexity |
|-----------|-----------|-----------|
| Video hero (autoplay muted loop, poster fallback) | `src/components/revamp/VideoHero.jsx` | Medium |
| Live activity ticker (cycles 20 real+anonymized bookings) | `src/components/revamp/LiveActivityTicker.jsx` | Small |
| Countdown deal cards (real timers) | `src/components/revamp/CountdownDealCard.jsx` | Medium |
| Customer Instagram grid (hover reveals city+dates) | `src/components/revamp/CustomerGrid.jsx` | Medium |
| Video testimonial band | `src/components/revamp/VideoTestimonialBand.jsx` | Medium |

**Sanity schema additions:**
- `heroVideo` document (mp4Url, posterUrl, altText)
- New `travelStory` document type with `customerPhoto[]`
- Add `videoUrl` field to existing `testimonial` type

---

## Phase 2 · Trust & Humanity (2-3 days)

**Goal:** Make visitors think "these are real people who care."

| Component | File Path | Complexity |
|-----------|-----------|-----------|
| Press mentions strip (grayscale logos, colorize on hover) | `src/components/revamp/PressStrip.jsx` | Small |
| Founder story block (photo + handwritten-style quote) | `src/components/revamp/FounderStory.jsx` | Small |
| Animated stats counter (counts up on scroll into view) | `src/components/revamp/AnimatedStats.jsx` | Small |
| Certifications row (IATA, TAAI, MoT badges) | `src/components/revamp/CertificationsRow.jsx` | Small |

**Dependencies:** `react-intersection-observer` for scroll-triggered counter animation.

---

## Phase 3 · Interactive Discovery (3-4 days)

**Goal:** Make visitors *play* with the site, not just scroll.

| Component | File Path | Complexity |
|-----------|-----------|-----------|
| Trip Finder Quiz (4-step wizard → filtered results) | `src/components/revamp/TripFinderQuiz.jsx` | Large |
| Interactive destinations map | `src/components/revamp/DestinationsMap.jsx` | Large |
| Trending chips with surge % | `src/components/revamp/TrendingChips.jsx` | Small |
| Curator's monthly pick | `src/components/revamp/CuratorsPick.jsx` | Small |

**Trip Finder Quiz flow:**
1. Who's traveling? (Solo · Couple · Family · Group)
2. Vibe? (Beach · Adventure · Cultural · Pilgrimage · Luxury)
3. Budget/person? (Slider ₹20K → ₹2L)
4. When? (Next 30 days · 1-3 months · Later)
→ Renders 3 matching packages + optional email capture for full list

**Map tech choice:** `react-simple-maps` (lightweight, SVG-based, no API key). Pins clickable → destination modal.

**Sanity additions:**
- `destination.trendScore` (0-100)
- `destination.trendChange` (percent)
- New `curatorPick` document type

---

## Phase 4 · Micro-Interactions + Content Depth (3-4 days)

**Goal:** Polish + SEO/conversion depth.

### Micro-interactions (edit existing components)
- `PackageCard.jsx` → add subtle 3D tilt on hover (framer-motion `useMotionValue`)
- `Skeletons.jsx` → replace generic loading with "Packing your bags..." messages
- Section reveals → apply `whileInView` fade-up to every `<Section>` (fires once)
- New `IdleWhatsAppNudge.jsx` → fires after 30s of inactivity

### New content sections

| Component | File Path | Purpose |
|-----------|-----------|---------|
| Where your money goes (pie chart) | `src/components/revamp/PriceTransparency.jsx` | Trust via honesty |
| WhatsApp chat proof | `src/components/revamp/WhatsAppProof.jsx` | Shows response speed |
| 48-hour mini-guides | `src/components/revamp/MiniGuides.jsx` | SEO longtail |
| TG vs. others comparison | `src/components/revamp/ComparisonTable.jsx` | Anchor value |

**Dependency:** `recharts` for pie chart.

---

## Final Home.jsx Structure

```jsx
<VideoHero />                     // Phase 1
<TrustStrip />                    // existing
<LiveActivityTicker />            // Phase 1
<TrendingChips />                 // Phase 3
<CountdownDealCard grid />        // Phase 1
<ThemesShowcase />                // existing
<TripFinderQuiz />                // Phase 3 (mid-scroll dopamine hit)
<CustomerGrid />                  // Phase 1
<CuratorsPick />                  // Phase 3
<VideoTestimonialBand />          // Phase 1
<DestinationsMap />               // Phase 3
<AnimatedStats />                 // Phase 2
<PriceTransparency />             // Phase 4
<FounderStory />                  // Phase 2
<PressStrip />                    // Phase 2
<CertificationsRow />             // Phase 2
<WhatsAppProof />                 // Phase 4
<MiniGuides />                    // Phase 4
<ComparisonTable />               // Phase 4
<PopularSearchesGrid />           // existing
<HomeFAQ />                       // existing
<IdleWhatsAppNudge />             // Phase 4 (floating)
```

---

## Effort Summary

| Phase | Days | New Components | Sanity Changes |
|-------|------|----------------|----------------|
| 0 · Prep | 1 | 0 | 3 new doc types |
| 1 · Emotional | 3-4 | 5 | Video + testimonial fields |
| 2 · Trust | 2-3 | 4 | Founder/press docs |
| 3 · Interactive | 3-4 | 4 | trendScore, curatorPick |
| 4 · Polish | 3-4 | 4 + edits | Mini-guide doc |
| **Total** | **12-16 days** | **17 new components** | **6 schema updates** |

---

## What NOT to Add

- Fake chatbots pretending to be human
- Auto-playing audio (universally hated)
- Pop-ups within 5 seconds of landing
- Stock photos of generic "happy families"
- Fake countdown timers that reset

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Video weight (4 x 2MB = 8MB) | Lazy-load, use `<video preload="none">`, poster image, `<source media="…">` for mobile |
| Ticker feels shady if fake bookings discovered | Use real bookings older than 24h, anonymized (first name + city only) |
| Quiz/map are heavy | Code-split with `React.lazy`, only load below fold |
| Sanity CORS on new schemas | Test on feature branch deploy before merge to main |
| Missing customer assets | Every phase has a fallback path — no phase is blocked |

---

## Success Metrics (Post-Launch)

- Time on landing page: 25s → 60s+
- Scroll depth: 40% → 80%+
- "Get quote" click-through rate: 2x baseline
- Bounce rate: -20%
- Quiz completion rate: target 15% of visitors
- Video hero play-through rate: target 40%+

---

## Suggested Git Strategy

- Branch off `feature/complete-frontend-revamp` → `feature/landing-tempting-v2`
- One commit per phase (4 total)
- Screenshot-verify at 3 viewports after each phase
- PR back to `feature/complete-frontend-revamp`, review, then push → auto-deploys to Vercel

---

## Rollout Sequence

**Sprint 1 · Emotional shift (Phase 0 + 1)**
Video hero, live ticker, countdown deals, customer grid, video testimonial

**Sprint 2 · Trust layer (Phase 2)**
Press strip, founder story, animated stats, certifications

**Sprint 3 · Interactive layer (Phase 3)**
Trip Finder Quiz, destinations map, trending chips, curator's pick

**Sprint 4 · Polish & depth (Phase 4)**
Micro-interactions, price transparency, WhatsApp proof, mini-guides, comparison table, idle nudge

---

## Open Questions (Answer Before Starting)

1. Use **free stock video placeholders** (Coverr/Pexels) to start, swap real footage later? Or wait for real footage before beginning Phase 1?
2. Comfortable with schema edits in `sanity-studio/schemas/*` and running `sanity deploy` from studio folder?
3. Do we have any real press mentions, IATA/TAAI certifications, or should we skip those strips?
4. Any preference on the quiz UX — full-screen modal or inline mid-page section?

---

## Reference Docs

- `DESIGN.md` — foundational design tokens and principles
- `CLAUDE.md` — project architecture and conventions
- Existing revamp components live in `src/components/revamp/`

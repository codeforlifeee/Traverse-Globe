# Traverse Globe — Website Redesign & Optimization Specification

> **Target Audience**: AI Coding Agents & Frontend Engineers  
> **Repository**: `Traverse-Globe`  
> **Source Document**: `Untitled document (2).docx` & Live Site Audit (`traverseglobe.com`)  
> **Design System Compliance**: Enforces `tg-ui-system`, `tg-sanity-data`, and `tg-revamp-routing`

---

## 1. Executive Summary & Goals

This specification outlines the exact UI/UX, content, and architectural changes required for **Traverse Globe** (`traverseglobe.com`). The core objective is **Conversion Rate Optimization (CRO)**, removing friction points (e.g. redundant search bars, duplicate carousels, unneeded video sections), establishing a direct **Lead Capture Form** connected to Google Sheets, and upgrading the **Package Card** architecture using **Thrillophilia** as the primary visual benchmark.

---

## 2. Global Design & Technical Rules

Any agent implementing these changes MUST adhere to the existing Traverse Globe design tokens:
1. **Primary Brand CTA Color**: Always `#FF5B04` (`bg-brand-orange`, hover: `#E04E00` / `hover:bg-brand-orange-hover`).
2. **Backgrounds**: Never use pure `bg-white` for main section canvases. Use `bg-brand-canvas` (`#F8FAFC` to `#F1F5F9`), `bg-brand-canvas-2`, or `bg-surface`.
3. **Typography**:
   - Display & Section Titles: `font-season` or `font-poppins font-bold`.
   - Body & Paragraphs: `font-canva-sans`.
   - Subheadings & Badges: `font-poppins`.
4. **Loading States**: Never use generic spinning circles (`animate-spin`) or blank layouts. Use Skeleton loaders (`SkeletonCard`, `SkeletonList`, `SkeletonDetail`).
5. **Data Flow**:
   - Do not call `@sanity/client` directly inside components; use React Query hooks in `src/hooks/queries.js`.
   - Respect lazy loading in `src/pages/Home.jsx` with `<Section height={...}>` to prevent Cumulative Layout Shift (CLS).

---

## 3. Master Change Matrix & Visual Redlines

| # | Feature / Area | DOCX Instruction | Visual Reference | Target File(s) | Action |
|---|----------------|------------------|------------------|----------------|--------|
| **1** | Hero CTA | Remove search bar, add "Connect with an Expert" | `image9.png` | `src/components/HeroSection.jsx` | Remove search form, replace with primary consultation CTA |
| **2** | Hero Right Card | Replace Bali retreat card with embedded Lead Capture Form | Lines 136-188 in `HeroSection.jsx` | `src/components/HeroSection.jsx`, new `src/components/HeroLeadForm.jsx` | Replace static card with Google Sheet-connected lead form |
| **3** | Hero Banner | Swap background image of banner | Fallback in `HeroSection.jsx` & `index.html` | `src/components/HeroSection.jsx`, `index.html` | Swap coral/underwater image with iconic Dubai/family skyline |
| **4** | Trust Strip | Remove from hero, place below cards section | `image2.png` | `src/components/HeroSection.jsx`, `src/pages/Home.jsx` | Move `<TrustStrip />` immediately below main package cards |
| **5** | Destination Carousels | Keep only one section of the two | `image15.png` | `src/pages/Home.jsx`, `src/components/TrendingDestinations.jsx` | Remove duplicate carousel; retain single unified destination section |
| **6** | Package Card Redesign | Overhaul card design using Thrillophilia as base reference | `image12.png` (Base), `image14.png` (Current) | `src/components/PackageCard.jsx` | Implement image gallery dots, discount pills, Call button, dual package action |
| **7** | Hotel Section | Completely remove hotel section from homepage | `image7.png` | `src/pages/Home.jsx`, `src/components/HotelCategories.jsx` | Remove `<HotelCategories />` from Home page |
| **8** | Dubai Information | Refine Dubai information to 5–10 crisp lines | `WhyChooseUs.jsx` copy | `src/components/WhyChooseUs.jsx` | Condense Dubai focus copy into high-impact value proposition |
| **9** | CMS Sales Banner | Replace travelers banner with CMS-driven promotional banner | `image13.png` | `src/components/revamp/VideoHero.jsx`, new `SalesBanner.jsx` | Replace static video banner with dynamic CMS sales/promo banner |
| **10** | Filter Pill Strip | Remove horizontal filter strip | `image1.png` | `src/components/PackageCategories.jsx` or listing | Remove redundant filter pills strip |
| **11** | Section Reordering | Show packages after reviews section | Page flow in `Home.jsx` | `src/pages/Home.jsx` | Move package grid/carousel below customer review section |
| **12** | Customer Photos | Remove standalone photo grid; embed photos in reviews | `image5.png` | `src/pages/Home.jsx`, `src/components/FeedbackSection.jsx` | Remove `CustomerGrid`, embed photos inside review cards |
| **13** | Video Testimonials | Remove video testimonials section | `image4.png` | `src/pages/Home.jsx`, `src/components/revamp/VideoTestimonialBand.jsx` | Remove `VideoTestimonialBand` from homepage |
| **14** | Why Choose Us CTA | Keep section, add "Call Us" / "Call an Expert" button | `image3.png` | `src/components/WhyChooseUs.jsx` | Add orange Call button below trust checkmarks |
| **15** | Why Choose Us Media | Replace right slider with Video (Scuba/Adventure/Travel) | `image6.png` | `src/components/WhyChooseUs.jsx` | Replace Swiper slider with responsive video card |
| **16** | Blog / Travel Guides | Add Blog section above FAQs on homepage | `image11.png` | `src/pages/Home.jsx`, new `src/components/HomeBlogSection.jsx` | Render 3–4 recent guide cards above `HomeFAQ` |
| **17** | Activities Architecture | Add Activities after Hotels in nav, with packages | `image10.png` | `src/components/Header.jsx`, routes, `Activities.jsx` | Add Activities menu & packages (Desert Safari, Scuba, etc.) |

---

## 4. In-Depth Technical Implementation Specifications

### 4.1. Hero Section Transformation (`src/components/HeroSection.jsx`)

#### Current Issues:
- Desktop hero contains a redundant search input (`Where to? Dubai, Bali...`) that diverts intent instead of driving direct contact.
- Right-hand side features a static "Bali Wellness Retreat" card that yields low interactive engagement.
- Background image shows an underwater reef scene (`photo-1512100356356-de1b84283e18`) rather than Traverse Globe's primary signature destination (UAE / Dubai / Family vacations).
- The `TrustStrip` directly hugs the hero, adding visual clutter above the fold.

#### Requirements:
1. **Remove Search Bar & Replace with CTA Button**:
   - Delete the `<form onSubmit={onSearch}>` and `<input>` element.
   - Insert a high-contrast primary CTA button:
     ```jsx
     <div className="flex flex-wrap items-center gap-4 mt-6">
       <button
         onClick={() => setShowConsultationModal(true)}
         className="inline-flex items-center justify-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-4 rounded-2xl font-poppins font-semibold text-base shadow-glow-orange transition-all duration-200 transform hover:-translate-y-0.5"
       >
         <PhoneCall className="w-5 h-5" />
         Connect with an Expert
       </button>
       <a
         href="https://wa.me/919999999999?text=Hi%20Traverse%20Globe,%20I%20would%20like%20to%20plan%20a%20trip"
         target="_blank"
         rel="noreferrer"
         className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white px-6 py-4 rounded-2xl font-poppins font-medium text-base backdrop-blur-md transition-all"
       >
         <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
         Chat on WhatsApp
       </a>
     </div>
     ```

2. **Embedded Hero Lead Capture Form (Right Column)**:
   - Replace the static Bali card (lines 136–188) with an interactive **Lead Capture Card**:
     - **Fields**:
       1. Traveler Name (`text`, required)
       2. Phone / WhatsApp Number (`tel`, required with country code support)
       3. Destination of Interest (`select` or `text`, e.g., Dubai, Bali, Thailand, Kashmir, Other)
       4. Travel Month / Dates (`select` or datepicker)
       5. Number of Travelers (`number` or select: 1-2, 3-5, 6+)
     - **Action**: "Get Custom Quote & Itinerary" (`bg-brand-orange text-white w-full py-3.5 rounded-xl font-semibold`).
     - **Integration**: Send POST request to Google Sheets Webhook (via Google Apps Script web app endpoint or `/api/lead-webhook`).
     - **Feedback**: Inline success message with green checkmark and immediate option to connect over WhatsApp.

3. **Banner Background Swap**:
   - Change `HERO_FALLBACK_IMAGE` in `HeroSection.jsx` and `<link rel="preload">` in `index.html` to a luxury Dubai skyline twilight photo:
     `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80` (or similar high-resolution Dubai cityscape).

4. **Trust Strip Relocation**:
   - Remove `<TrustStrip variant="ink" />` from `HeroSection.jsx`.
   - Place `<TrustStrip variant="canvas" />` in `src/pages/Home.jsx` directly below the first package carousel or package cards grid.

---

### 4.2. Package Card Architecture Overhaul (`src/components/PackageCard.jsx`)

#### Base Reference: Thrillophilia Card Design (See `image12.png`)

```
+-------------------------------------------------------+
|  [ IMAGE CAROUSEL / SLIDER ]                          |
|  - Top Left / Overlay: "SAVE INR 75,900 on this trip" |
|  - Center Hover / CTA: [ Connect with an Expert ]    |
|  - Bottom Pagination Dots:  •  •  •  •  •             |
+-------------------------------------------------------+
|  7 days & 6 nights                         ★ 4.6 (9)  |
|                                                       |
|  Scenic Iceland With Diamond Circle                   |
|                                                       |
|  [ 3D Reykjavík • 4D Akureyri ] (Light cream pill)    |
|                                                       |
|  INR 3,06,372  [ SAVE INR 75,900 ]                    |
|  INR 2,30,472 / Adult                                 |
|                                                       |
|  +-------+  +--------------------------------------+  |
|  | [📞]  |  |           Request Callback           |  |
|  +-------+  +--------------------------------------+  |
+-------------------------------------------------------+
```

#### Detailed Element Specifications:
1. **Top Media Header**:
   - Multi-image support (Swiper or simple stateful image index with pagination dots `• • •`).
   - Badge at top: If discount exists, display `SAVE ₹XX,XXX` or `% OFF` prominently in a pill.
   - Quick image hover CTA: "Connect with an Expert" or "Quick View".
2. **Meta & Title**:
   - Line 1: Duration on left (`{nights}N / {days}D`), Star rating + review count on right (`★ 4.8 (24)`).
   - Line 2: Package title in bold `font-poppins text-brand-ink text-base md:text-lg line-clamp-2`.
   - Line 3: Itinerary stops / highlights pill with subtle background:
     `bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300 text-xs px-2.5 py-1 rounded-md inline-block mt-2`.
3. **Pricing Block**:
   - Strikethrough original price: `line-through text-xs text-brand-muted-ink`.
   - Savings indicator: `bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded`.
   - Final Price: `text-xl md:text-2xl font-bold font-poppins text-brand-ink` with `/ Person` or `/ Adult`.
4. **Bottom Button Layout**:
   - Left Button: **Call Button**
     - Square button (`w-11 h-11 flex items-center justify-center rounded-xl border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors`).
     - Directly initiates a phone call `tel:+919999999999` or opens a quick callback request popup.
   - Right Button: **View Package / Request Callback**
     - Flexible dual capability: Primary action navigates to `/destinations/:type/:category/:slug` (or `/packages/:slug`), with secondary quick-view modal trigger accessible via the image or an icon button.

---

### 4.3. Homepage Pruning & Layout Restructuring (`src/pages/Home.jsx`)

#### Current Order in `Home.jsx`:
```jsx
<HeroSection />
<Section height={1200}><TrendingDestinations /></Section>   {/* DUPLICATE DESTINATIONS */}
<Section height={1400}><PackageCategories /></Section>
<Section height={1200}><TopDestinations /></Section>        {/* DUPLICATE DESTINATIONS */}
<Section height={800}><HotelCategories /></Section>         {/* TO REMOVE */}
<Section height={560}><VideoHero /></Section>               {/* TO REPLACE WITH CMS SALES BANNER */}
<Section height={1000}><FeedbackSection /></Section>        {/* REVIEWS */}
<Section height={900}><CustomerGrid /></Section>            {/* STANDALONE PHOTOS - TO REMOVE */}
<Section height={700}><VideoTestimonialBand /></Section>    {/* TESTIMONIAL VIDEOS - TO REMOVE */}
<Section height={900}><ExplorePrices /></Section>
<Section height={900}><WhyChooseUs /></Section>             {/* UPDATE WITH VIDEO & CALL CTA */}
<Section height={600}><PopularSearchesGrid /></Section>
<Section height={700}><HomeFAQ /></Section>
```

#### Revised Target Order in `Home.jsx`:
```jsx
<HeroSection />

{/* 1. Single Unified Top Destinations Section (keep only one) */}
<Section height={650}><TrendingDestinations /></Section>

{/* 2. Trust Strip repositioned below initial cards */}
<TrustStrip variant="canvas" />

{/* 3. New Activities Showcase (Desert Safari, Watersports, etc.) */}
<Section height={650}><ActivitiesShowcase /></Section>

{/* 4. CMS Promotional / Sales Banner */}
<Section height={400}><SalesBanner /></Section>

{/* 5. Customer Reviews (FeedbackSection with embedded photo support) */}
<Section height={750}><FeedbackSection /></Section>

{/* 6. Packages Section (Positioned AFTER Reviews) */}
<Section height={950}><ExplorePrices /></Section>

{/* 7. Why Choose Traverse Globe (with Scuba/Adventure Video + Call Us CTA) */}
<Section height={700}><WhyChooseUs /></Section>

{/* 8. Travel Guides / Blog Section (Positioned ABOVE FAQ) */}
<Section height={650}><HomeBlogSection /></Section>

{/* 9. FAQ Section */}
<Section height={600}><HomeFAQ /></Section>
```

---

### 4.4. Detailed Component Updates

#### 1. Why Choose Traverse Globe (`src/components/WhyChooseUs.jsx`)
- **Dubai Information**: Retain and refine the left-hand text to 5–10 punchy lines:
  > *"At Traverse Globe, we specialize in authentic Dubai experiences. From private desert safaris across golden dunes to luxury marina yachts and family-friendly theme park packages, our local presence in UAE ensures insider rates, zero hidden fees, and dedicated 24/7 on-ground support."*
- **Call CTA**: Below the badges (`Best Price Guarantee`, `24/7 Support`, `Expert Guidance`), add:
  ```jsx
  <div className="mt-8">
    <a
      href="tel:+919999999999"
      className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-hover text-white px-6 py-3.5 rounded-xl font-poppins font-semibold shadow-soft-md transition-all hover:-translate-y-0.5"
    >
      <Phone className="w-4 h-4" />
      Call an Expert Now
    </a>
  </div>
  ```
- **Replace Right Slider with Video**:
  - Delete `Swiper` and `services.map(...)` slider in the right column.
  - Implement a modern Video Player container:
    ```jsx
    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-ink shadow-soft-xl border border-brand-hairline group">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
        className="w-full h-full object-cover"
      >
        <source src="/assets/videos/scuba_adventure.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-scrim/80 via-transparent to-transparent flex items-end p-6">
        <div>
          <span className="text-brand-orange text-xs font-semibold uppercase tracking-wider">Unmatched Adventures</span>
          <h4 className="text-white font-poppins font-bold text-lg mt-1">Deep Sea Scuba & Desert Excursions</h4>
        </div>
      </div>
    </div>
    ```

#### 2. Reviews Section with Embedded Photos (`src/components/FeedbackSection.jsx`)
- Remove the standalone `CustomerGrid` section from the homepage.
- In `FeedbackSection.jsx`, update the review card schema to include an optional `tripPhotos: string[]` array.
- In each review card, if `review.tripPhotos` exists, render a compact thumbnail row (1–3 small rounded images, `w-14 h-14 object-cover rounded-lg border border-brand-hairline cursor-pointer hover:opacity-90`).

#### 3. New Blog / Travel Guides Section (`src/components/HomeBlogSection.jsx`)
- Positioned directly above `HomeFAQ` in `Home.jsx`.
- Fetches top 3 articles using `useBlogPosts(3)` from `src/hooks/queries.js`.
- Renders:
  - Header: Kicker "Insider Knowledge", Title "Latest Travel Guides & Tips".
  - 3-column card grid: Featured image, Reading time / Date, Title, Excerpt, "Read Guide →".
  - Link to `/blog` at the bottom ("View All Guides").

#### 4. Activities Navigation & Showcase (`src/components/Header.jsx` & `src/pages/Activities.jsx`)
- Update `Header.jsx`:
  - Add `Activities` to main navigation with a dropdown containing popular activities:
    - Desert Safari & Quad Biking
    - Scuba Diving & Snorkeling
    - Dhow Cruise & Water Canal
    - Theme Parks & Waterparks
    - Luxury Yacht Rentals
- Create `ActivitiesShowcase.jsx` on the homepage featuring curated activity cards with prices and instant booking inquiries.

---

## 5. Google Sheets Lead Capture Integration Architecture

To fulfill item 2 ("embed lead capture form with basic detail connected via google sheet"):

```
[ User Submits Form ]
         |
         v
[ Client-side Validation ]
  (Name, Tel, Destination, Travelers)
         |
         v
[ POST to Webhook Endpoint ] 
  Option A: Direct to Google Apps Script Web App (CORS mode 'no-cors' or jsonp)
  Option B: Local backend proxy endpoint `api/lead-webhook.js`
         |
         v
[ Append Row in Google Sheet ]
  Columns: [Timestamp, Name, Phone, Destination, Travelers, Month, Status]
         |
         v
[ Instant UI Success State + WhatsApp Quick Connect ]
```

### Google Apps Script Reference Code:
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.destination || '',
      data.travelers || '',
      data.notes || '',
      'New'
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 6. Implementation Phase Plan for the Executing Agent

### Phase 1: Hero & Conversion Hook
1. Modify `src/components/HeroSection.jsx`:
   - Strip out search input and chips.
   - Insert primary "Connect with an Expert" CTA button.
   - Build and embed the `HeroLeadForm` connected to the Google Sheets webhook.
   - Swap the hero background image in `HeroSection.jsx` and `index.html`.
   - Remove `<TrustStrip />` from `HeroSection.jsx`.

### Phase 2: Package Card Upgrade (Thrillophilia Benchmark)
1. Overhaul `src/components/PackageCard.jsx`:
   - Implement image slider with dot pagination.
   - Add discount pill and highlights tag.
   - Replace "Quick view" button with a dedicated Call icon button.
   - Re-architect primary CTA with seamless navigation and quick consultation triggers.

### Phase 3: Homepage Clean-Up & Reordering
1. Update `src/pages/Home.jsx`:
   - Remove `<TopDestinations />` (keeping `<TrendingDestinations />` as the single destination section).
   - Insert `<TrustStrip />` below destination/package cards.
   - Remove `<HotelCategories />`.
   - Remove `<CustomerGrid />` (photos section).
   - Remove `<VideoTestimonialBand />` (video testimonials).
   - Reorder so that `<ExplorePrices />` appears after `<FeedbackSection />`.

### Phase 4: Media, Content & Guide Additions
1. Update `src/components/WhyChooseUs.jsx`:
   - Refine Dubai copy to 5–10 crisp lines.
   - Add "Call an Expert" button.
   - Replace Swiper slider with Scuba / Adventure video player.
2. Update `src/components/FeedbackSection.jsx`:
   - Add trip photo thumbnails to review cards.
3. Create `src/components/HomeBlogSection.jsx` and insert above `<HomeFAQ />` in `Home.jsx`.
4. Create `src/components/revamp/SalesBanner.jsx` to replace `VideoHero.jsx`.

### Phase 5: Activities Expansion & Navigation
1. Update `src/components/Header.jsx` to include `Activities` in the navigation bar.
2. Add activities category routes and package associations.

### Phase 6: Quality Assurance & Build Verification
1. Run `npm run build` to ensure 0 bundling errors.
2. Test responsive layouts on mobile (375px, 425px) and desktop (1024px, 1440px).
3. Verify all telephone (`tel:`) and WhatsApp links.
4. Verify lead form submissions cleanly land in Google Sheets.

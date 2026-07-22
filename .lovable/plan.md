Two changes, both content/presentation only. No design system, colors, or animations altered.

## 1. Book a call form on `/example` (bottom CTA)

Replace the current "Bring us your version" CTA button row with a proper booking form, styled to match the existing Contact form (same TiltCard, inputs, gold focus, metallic submit).

**Form fields**
- Name (required)
- Email (required)
- Company
- Preferred date + time (date + time inputs, side-by-side on sm+)
- Timezone (text input, placeholder "e.g. GMT, CET, EST")
- What would you like to discuss? (short textarea, 3 rows)
- Submit button: "Book a call"

**Behavior:** client-side only, sonner toast on submit ("Call request received. We'll confirm a time within one business day."), form resets. Same pattern as `Contact.tsx`.

**Below the form:** small centered line — "Prefer to email? [Send us a message here](/contact)" — link styled in gold, underline on hover.

**Keep** the section heading "Bring us your version." and intro paragraph. Remove the two old buttons ("Book a discovery call" / "See real projects") since the form replaces them.

**File:** `src/routes/example.tsx` — extract the form into a small local component or inline it in the last `<section>`.

## 2. Mobile + tablet optimization pass

Sweep the site for the responsive issues that make it "look awful" on narrow widths. Only spacing, sizing, and layout classes change — no visual redesign.

**Global patterns to fix**
- Oversized display type on mobile: reduce `text-6xl`/`text-7xl` headings to `text-4xl` base, scaling up at `sm:`/`md:`. Applies to `PageHeader`, `Hero`, `Contact`, and section H2s using `text-5xl md:text-6xl`.
- Excessive vertical padding on mobile: `py-32` / `py-24` → `py-16 md:py-24 lg:py-32` in section wrappers (Contact, ExploreBand, Signal, BeforeAfterSection, example CTA, etc.).
- Wide tracking on tiny text: `tracking-[0.5em]` eyebrows shrink to `tracking-[0.35em]` on mobile so they don't wrap awkwardly.
- Horizontal overflow: audit sections with fixed pixel widths (blur orbs `w-[500px]`, marquee row) and add `overflow-hidden` on the parent `<section>` where missing.
- Grid → single column earlier: two-column grids in `/example` brief+scope (`md:grid-cols-[1fr_1.2fr]`) already stack; verify PriceCard, EngagementTimeline, ExploreBand, Projects, Services, FAQ stack cleanly at mobile with proper gap.

**Component-specific checks (read + adjust as needed)**
- `SiteNav.tsx`: ensure mobile menu works and links wrap; add hamburger if the current nav overflows.
- `Hero.tsx`: CTA button row should wrap and buttons should be full-width on mobile (`w-full sm:w-auto`).
- `Signal.tsx`: metric grid stacks 1-col mobile, 2-col sm, 4-col lg; marquee container gets `overflow-hidden`.
- `BeforeAfterSection.tsx` slider: verify the compare toggle chips wrap and the drag handle stays inside bounds at ~360px width.
- `Projects.tsx`: project card image aspect ratio stays intact; tech tag row uses `flex-wrap`.
- `Testimonials.tsx`, `FAQ.tsx`, `ExploreBand.tsx`: card grids stack cleanly, padding trims on mobile (`p-8` → `p-6 sm:p-8`).
- `PageHeader.tsx`: reduce top padding on mobile (`pt-40` → `pt-28 sm:pt-40`).
- `Contact.tsx`: form padding `p-8 sm:p-12` → `p-6 sm:p-10 md:p-12`.
- `SiteFooter.tsx`: columns stack, contact info readable.

**Method**
- Read each section file, apply Tailwind responsive-prefix adjustments only.
- Verify with Playwright at 375px (mobile), 768px (tablet), and 1280px (desktop) — screenshot the homepage, `/example`, `/work`, and `/contact` at each width and confirm no overflow, no clipped text, no oversized headings.

## Files touched

- `src/routes/example.tsx` (form + CTA)
- `src/components/site/PageHeader.tsx`
- `src/components/site/SiteNav.tsx` (only if it overflows)
- `src/components/site/SiteFooter.tsx`
- `src/components/site/sections/Hero.tsx`
- `src/components/site/sections/Contact.tsx`
- `src/components/site/sections/Services.tsx`
- `src/components/site/sections/Projects.tsx`
- `src/components/site/sections/BeforeAfterSection.tsx`
- `src/components/site/sections/Signal.tsx`
- `src/components/site/sections/Testimonials.tsx`
- `src/components/site/sections/ExploreBand.tsx`
- `src/components/site/sections/FAQ.tsx`
- `src/components/site/sections/EngagementTimeline.tsx`
- `src/components/site/sections/PriceCard.tsx`

No new dependencies. No route or backend changes.
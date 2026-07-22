## Goal

Keep the home page mostly intact — trim each heavy section down to a teaser with a "see more" link into a deeper page. Add the new subpages, the `/example` engagement page, and prominent home CTAs to the key routes.

## Home page — teaser pattern

The home page stays the anchor. Every section that currently shows a full grid gets trimmed to 1–2 items plus a gold "see more" link. No section is removed outright.

Home order (unchanged except for trims and two new bits):

1. Intro animation
2. Hero — **add secondary CTA** "See an example engagement" → `/example`
3. Services (unchanged)
4. Signal (unchanged)
5. **Projects — trim to 2 featured** + "See all work →" link to `/work`
6. **Before / After — keep only 1 slider** (the bank one) + "See more transformations →" link to `/work#before-after`
7. Testimonials — **trim to 2 quotes** + "Read more →" link to `/trust` (or keep 3, small trim)
8. **NEW: Explore band** — 3 tilt cards linking to the top subpages (see below)
9. **FAQ — keep top 3 questions** + "See all FAQs →" link to `/contact#faq`
10. Contact form (unchanged, or optionally trimmed to a CTA card that links to `/contact` — default is keep it)
11. Footer

## New "Explore" band on home

Three tilt cards, gold-accented, sit between Testimonials and FAQ:

- **See a real engagement** → `/example` — badge "Timeline & price"
- **View all our work** → `/work` — badge "Case studies + before/after"
- **How we work** → `/approach` — badge "Methodology"

Final section CTAs on home also link out: "Book a discovery call" → `/contact`, with a secondary "or see an example engagement first" → `/example`.

## New routes

```text
/work        Full Projects grid + all Before/After sliders
/approach    Methodology, process, engagement models, guarantees
/example     NEW — mid-range project walkthrough
/trust       Client logos (placeholders), certifications, team credentials, full testimonials
/insights    3–4 article stubs (no detail routes yet)
/contact     Contact form + full FAQ
```

Nav links: Work · Approach · Example · Trust · Insights · Contact. Gold underline on active.

## `/example` page — mid-range engagement

1. **Header** — "A mid-range engagement, end to end." Sub: 6–10 week builds, one product surface, one team.
2. **The brief** — fictional Series A fintech needing a customer portal (auth, dashboard, Stripe billing).
3. **Scope card** — design system, 8 screens, auth, billing, admin, analytics, deployment.
4. **Timeline** — vertical gold-accented timeline, 4 phases:
   - Week 1 — Discovery & design system
   - Weeks 2–4 — Core build (auth, dashboard, billing)
   - Weeks 5–7 — Admin, analytics, polish
   - Week 8 — QA, launch, handover
5. **Price card** — **€28,000–€38,000** fixed-scope, what's in/out, 30/40/30 schedule, "indicative range, final quote after discovery" note.
6. **Also available** — smaller cards: Retainer (from €4.5k/mo) and Staff augmentation (from €8k/mo per engineer).
7. **CTA** — "Book a discovery call" → `/contact`.

## Technical notes

- New route files under `src/routes/`: `work.tsx`, `approach.tsx`, `example.tsx`, `trust.tsx`, `insights.tsx`, `contact.tsx`. Each with its own `head()` (unique title/description/og).
- Existing section components stay authoritative. Home imports them with a `variant="teaser"` prop (or a `limit` prop) so `Projects`, `BeforeAfterSection`, `Testimonials`, and `FAQ` render either the full grid or the trimmed version. `/work`, `/contact`, `/trust` re-mount the same components with full data — no duplicated markup.
- New home component `ExploreBand.tsx` for the 3-card row.
- New `/example` components: `EngagementTimeline.tsx`, `PriceCard.tsx`.
- `SiteNav.tsx`: real `<Link to="...">` for each new route.
- Intro animation stays on `/` only.
- Build check with tsgo; walk every home CTA to confirm it lands on the right route.

## Out of scope

- Real blog CMS / MDX for insights
- Careers page
- Real client logos on `/trust` (placeholder wordmarks until you provide them)

## Open questions

1. Currency for the price example — **EUR**, USD, or something else?
2. `/trust` — placeholder wordmarks for now, or leave logo wall empty until you supply real clients?
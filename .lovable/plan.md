## 1. Fix the Before/After "Compare" toggle alignment

In `src/components/site/BeforeAfter.tsx` the segmented control has three modes (Before / Compare / After), but the "Compare" mode doesn't render the slider correctly — the divider handle and the clipped "After" image get out of sync with the segmented state, so the toggle looks broken.

Fixes:
- Ensure `mode === "compare"` (a.k.a. "slide") drives both the clip-path on the After layer AND the handle position from the same `pos` state, without stale transforms left over from Before/After modes.
- Reset `pos` to 50% when entering compare mode so the handle starts centered instead of wherever the last drag left it.
- Remove any `transition` on the clip-path while the user is dragging (transition should only apply when snapping between modes, not while pointer-moving) so the divider tracks the cursor 1:1.
- Make sure the handle, the divider line, and the clip edge all read from the same percentage variable so they align to the same pixel column.

No visual redesign — same look, same gold handle, just correct behavior.

## 2. Expand the "More Transformations" page (`/work` or the transformations route)

Add more Before/After pairs covering diverse domains, devices, and disciplines. Target 8–10 total (keeping the existing 3). New pairs to generate + wire in:

1. **ML pipeline dashboard** — dated Jupyter/matplotlib screenshots → modern monitoring dashboard with charts, model drift indicators.
2. **AI chat interface** — clunky 2020-era chatbot UI → refined conversational interface with streaming, citations.
3. **Healthcare patient portal** (desktop) — dense hospital table UI → clean patient-first layout.
4. **E-commerce product page** (desktop) — busy discount-heavy layout → editorial premium product page.
5. **Mobile fitness app** (mobile) — cluttered stats screen → focused single-metric hero.
6. **Data annotation tool** (desktop, ML-adjacent) — spreadsheet-style labeler → keyboard-first labeling interface.
7. **Analytics dashboard for AI ops** — raw log tables → visual model performance dashboard.

For each: generate a Before and After image with the premium model, add to `src/assets/before-after/`, and register in the transformations page's data array.

All items reuse the existing `BeforeAfter` slider component (post-fix) — no new component work.

## 3. New Case Studies page

Create a dedicated route for full write-ups (currently `/work` shows short project cards; case studies are longer-form).

- New route: `src/routes/case-studies.tsx` — index page listing case study cards.
- New dynamic route: `src/routes/case-studies.$slug.tsx` — detail page for each case study.
- Data source: a single `src/lib/case-studies.ts` file exporting a typed array. Seed it with 1 placeholder entry ("Coming soon") so the page renders now; you'll drop real ones in later by adding entries to that file.
- Each case study supports: title, client, category, hero image, summary, challenge, approach, outcome (metrics), tech stack, gallery images, testimonial (optional).
- Add "Case Studies" to the main nav (`SiteNav.tsx`) and add a small teaser card / link on the home page near the Projects section.
- Consistent styling with existing PageChrome / PageHeader / TiltCard / gold-metallic tokens. No new design system.

### Technical notes
- Slider fix is behavior-only inside `BeforeAfter.tsx` — no API change to callers.
- Case-study slugs use `$slug` param per TanStack routing conventions; `Link to="/case-studies/$slug" params={{ slug }}`.
- Each case study route sets its own `head()` meta (title, description, og:title, og:description, and og:image from the hero).
- Image generation uses `premium` tier with prompts optimized for legible text and realistic UI, matching the existing before/after style.

### Question before I build

Two things worth confirming:

1. **Where do the extra transformations live?** The current "more transformations" surface is the `/work` page. Should I keep them there, or create a dedicated `/transformations` (or `/before-after`) route so `/work` stays focused on project cards?
2. **Case study slugs** — happy for me to invent slugs like `/case-studies/trenfotball`, or do you want a specific slug scheme?

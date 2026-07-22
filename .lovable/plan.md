Content-only edits. No changes to layout, typography, colour tokens, animations, or component structure beyond adding a small `Badge` element that reuses the existing tech-tag styling.

## 1. `src/components/site/sections/Projects.tsx`

Rewrite the `projects` array (order matters — TrenFotball first) and add an optional `badge` field. Inside the card JSX, render the badge next to the category label using the exact same class string as the existing tech tags (rounded-full, gold border, uppercase tracking) so no new styling is introduced.

New array (in order):

1. **TrenFotball** — `badge: "Client work"`, label `"Client work · Sports platform"`, description "A video-driven training platform for a Norwegian football coaching business. Custom video pipeline, structured session library, and a CMS the client manages themselves.", bullets ["Next.js and TypeScript throughout", "Vimeo-backed video delivery", "Client-managed content, no developer dependency"], tags ["Next.js", "TypeScript", "Vimeo API", "Tailwind"]. Image: reuse `meridian.jpg` as a temporary placeholder (no new asset generation — content-only change) OR reuse `orbit.jpg`; pick `meridian.jpg` since it reads as a polished product screen.
2. **Sentinel AI** — `badge: "In development"`, label `"Studio project · In development"`, keep pitch and tags, change last bullet to `"In active development"`.
3. **Meridian** — `badge: "Concept"`, title `"Meridian"`, label `"Concept build · Financial services"`, description "A refined marketing platform concept for a private wealth firm — editorial, fast, and CMS-driven.", keep bullets and tags.
4. **Orbit** — unchanged.
5. **Lumen** — unchanged.

Badge markup (reuses existing tag classes, placed inline with the category eyebrow):

```tsx
{p.badge && (
  <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">
    {p.badge}
  </span>
)}
```

Homepage uses `<Projects limit={2} />` which will now show TrenFotball + Sentinel — a good honest lead.

## 2. `src/components/site/sections/BeforeAfterSection.tsx`

Change only the props passed to the bank `<BeforeAfter>`:
- `title="Financial services — homepage concept"`
- `caption="A dated 2012 template reimagined as a refined editorial identity."`
- `beforeAlt="Dated financial services website"`, `afterAlt="Refined editorial financial services website"`

Dashboard slider unchanged.

## 3. `src/components/site/sections/Testimonials.tsx`

- Change section eyebrow `"Kind words"` → `"How we work"`.
- Replace `quotes` array with three trust statements: title + body, no name/role. Reuse the exact card layout:
  - Keep the big gold `"` mark.
  - Body text = the statement.
  - The bottom block (currently name + role) becomes the title in `font-display` + a short qualifier in the gold uppercase style already used for `role`.
- Data:
  1. `"Direct with the engineer"` / `"You work with the person building your product. No account managers, no handoffs."`
  2. `"Fixed price, agreed upfront"` / `"Scope and cost settled before a line of code. No hourly surprises."`
  3. `"Yours to keep"` / `"Full source, full ownership, documented handover. No lock-in."`
- Grid already switches to 3 columns when `items.length >= 3` — no layout change needed. Homepage `limit={2}` will show the first two; `/trust` shows all three.
- Rename the field names in-file from `{quote, name, role}` to `{body, title, tag}` (or similar) so the JSX reads honestly; visual output identical.

## 4. `src/components/site/SiteFooter.tsx`

- `hello@athera.io` → `contact@athera-intelligence.com`
- `Remote · Worldwide` → two `<li>` entries: `London, UK` and `Trondheim, Norway`

## 5. Grep for other occurrences

Content-only sweep for any remaining `hello@athera.io` or `Remote · Worldwide` strings in `src/` (likely only in SiteFooter, but check Contact-related copy and any route metadata). Replace as above. No design changes.

## Files touched

- `src/components/site/sections/Projects.tsx`
- `src/components/site/sections/BeforeAfterSection.tsx`
- `src/components/site/sections/Testimonials.tsx`
- `src/components/site/SiteFooter.tsx`
- Any other file where the two contact strings appear (verified before editing)

## Not touched

Design tokens, animations, `TiltCard`, `IntroAnimation`, `PageChrome`, nav, routes, images, styles.css, and the `/example` pricing/timeline copy (separate outstanding thread).

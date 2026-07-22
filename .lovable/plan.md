## Scope

Two things in this turn:

1. Build the TrenFotball case study page using the uploaded design as visual reference.
2. Wire the Contact form and Book-a-call form to send email notifications via Lovable Emails to `contact@athera-intelligence.com`, with success states.

Calendar time-slot booking and further mobile CTA polish stay out of scope for now — email wiring first, calendar next turn.

## 1. TrenFotball case study

Route: `/case-studies/trenfotball` (already scaffolded via `$slug`). Add the entry to `src/lib/case-studies.ts` and expand `src/routes/case-studies.$slug.tsx` so it renders a richer layout when the entry provides structured fields.

Content (from the copy you sent), translated into structured blocks:

- **Header**: eyebrow "Case study", title "TrenFotball", one-line subtitle: "A video-driven training platform built to an exact client vision — precision over interpretation."
- **Meta row** (matching your reference screenshot's Rolle / Plattform / Status pattern): Role — Design & development · Platform — Web, responsive · Status — In development · Stack — Next.js, TypeScript, Vimeo API, Tailwind
- **Hero image**: the uploaded reference screenshot, used as the case-study cover (imported as a Lovable Asset from the upload).
- **Narrative sections** (kept as your text, lightly formatted):
  - The Brief
  - The Challenge
  - The Approach
  - The Product — mentions the drill library, homepage, component system
  - The Outcome
- **Pull quote** styled in gold: "When a client already knows what they want, the job is precision, not opinion."
- **CTA footer**: "Have a spec this exact? Let's talk." → links to `/contact`.

Design: reuses existing tokens, TiltCard, gold accents, Cormorant/Inter typography. No new design system.

The homepage TrenFotball project card and the `/work` page card both link to `/case-studies/trenfotball`.

## 2. Lovable Emails wiring

Prerequisite (handled by tooling, surfaced to you as a domain setup dialog): configure the sender domain for `athera-intelligence.com`. Until DNS verifies, sends will fail with a clear error — that's expected and only needs your DNS action once.

Implementation:

- Scaffold app-email templates (one-time setup).
- Add two React Email templates in `src/lib/email-templates/`:
  - `contact-inquiry.tsx` — inbound message from the general contact form (name, email, company, message).
  - `booking-request.tsx` — booking request from `/example` (name, email, company, preferred date, time, timezone, topic).
- Register both in the template registry.
- Add two server routes under `src/routes/api/`:
  - `POST /api/contact` — validates with Zod, sends the `contact-inquiry` template to `contact@athera-intelligence.com`.
  - `POST /api/book-a-call` — same pattern with `booking-request`.
- Wire the existing `Contact.tsx` form and the `BookACallSection` form on `/example` to `fetch` these endpoints, disable the submit button while pending, and show an inline success card ("Thanks — we'll be in touch within one business day.") or an error message on failure. No layout shift: the success/error state replaces the form body inside the same card.
- Keep the "Prefer to email?" fallback link unchanged.

No confirmation email to the sender in this pass (can add later); notifications go to you only.

## Out of scope this turn

- Calendar time-slot picker with real availability (planned next after email is live).
- Further mobile CTA polish (already tightened last pass; revisit after email lands).
- Additional case studies beyond TrenFotball.

## Technical notes

- Case study data model in `src/lib/case-studies.ts` gets optional `sections: { heading, body }[]`, `pullQuote`, `meta: { role, platform, status, stack }`, and `cover` (asset URL). Detail route renders the rich layout when present, falls back to current placeholder otherwise.
- Uploaded image saved via `lovable-assets` from `/mnt/user-uploads/trenfotball-case-study.png` into `src/assets/case-studies/trenfotball-cover.png.asset.json`, imported by the detail route.
- Email domain check runs first; if not configured, the setup dialog appears once and I continue after you complete it. Server routes use `sendTemplateEmail` from the scaffolded helper — no queues, no DB tables.

# Athera Intelligence — Website Plan

Dark, corporate-modern marketing site with metallic gold accents, a cinematic particle intro that resolves into the "ATHERA" wordmark, 3D-tilt cards, and subtle gold glows throughout.

## Visual direction

- Palette (dark + metallic gold):
  - Background near-black `oklch(0.14 0.01 80)` with warm undertone
  - Surface/card `oklch(0.18 0.012 80)` with 1px gold-tinted border
  - Gold primary `oklch(0.78 0.14 85)`; gold glow `oklch(0.85 0.16 88)`
  - Warm gray text `oklch(0.72 0.02 80)`
- Typography: `Cormorant Garamond` (display, ATHERA wordmark + section titles) + `Inter` (body). Loaded via `<link>` in `__root.tsx`.
- Metallic feel: gradient-gold text fills on headings, thin gold hairlines, soft radial gold glows behind hero and CTAs.
- Motion: restrained. Fade-ins, gentle floats, hover-driven 3D tilt on cards.

## Sections (single-page, anchored nav)

Home route `/`:
1. **Intro overlay** — full-screen black canvas, ~3.5–4s. Gold particles drift, converge into "ATHERA" (pixel-sampled letterforms), "Intelligence" subtitle fades in, overlay fades out. Skippable on click / key. Runs once per session (sessionStorage). Respects `prefers-reduced-motion`.
2. **Hero** — Large gradient-gold wordmark, tagline "Engineering intelligent software.", two CTAs. Ambient gold radial glow + faint circuit SVG background.
3. **Services** — 6 3D-tilt cards: Custom Coding, Product Development, Web & Mobile Apps, AI Development, Cloud & DevOps, Consulting.
4. **Projects** — 4 real, named case-study cards (see below), each with a generated hero image, tags, and a short outcome blurb.
5. **Before & After** — separate section from Projects. 3 comparison cards, each with a draggable divider (or hover reveal) showing a generated "before" and "after" image side-by-side.
6. **Testimonials** — 3 3D-tilt quote cards with name, role, company; gold quotation glyph.
7. **FAQ** — Accordion (shadcn) with 6 questions: process, pricing model, timelines, tech stack, ownership/IP, support.
8. **Contact** — 3D-tilt form card: name, email, company, message. Client-side toast on submit (no backend this iteration).
9. **Footer** — Gold hairline top border, minimal links, copyright.

Sticky top nav with anchor links + gold underline on hover.

## Projects (real content, generated images)

Each rendered as a 3D-tilt card with a generated 16:9 image (dark, metallic-gold aesthetic to match the site), title, one-line problem, one-line outcome, and tech tags.

1. **Sentinel AI — Deepfake & AI-Content Detection**
   - Detects AI-generated images, video frames, and text with a real-time scoring API and browser extension.
   - Tags: AI, Python, PyTorch, FastAPI, Chrome Extension
   - Image prompt: dark analytics dashboard with a face scan overlay, waveform/heatmap graphs, gold accents on a black UI.

2. **Meridian — Corporate Website Platform**
   - Rebuilt a financial firm's marketing site: sub-second loads, CMS-driven pages, +38% lead conversion.
   - Tags: Next.js, TypeScript, Headless CMS, Edge
   - Image prompt: elegant dark corporate website mockup on a laptop, gold serif headings, muted UI, studio lighting.

3. **Orbit — Cross-Platform Fitness App**
   - iOS + Android app with workout tracking, wearable sync, and offline-first data.
   - Tags: React Native, Expo, Swift, HealthKit
   - Image prompt: two dark-mode phone mockups floating on a black surface, showing a training dashboard with gold graph lines.

4. **Lumen — Enterprise RAG Assistant**
   - Private knowledge assistant for a legal team; ingests 40k+ documents with cited answers.
   - Tags: LLMs, Vector DB, RAG, Streaming
   - Image prompt: dark chat interface with cited sources panel, subtle circuit background, gold highlight on active citation.

## Before & After (separate section)

Interactive comparison slider (draggable vertical divider) per item. Each item ships with a generated matched pair (same framing/angle, only styling changes) so the slider reads clearly.

- **Regional bank landing page** — dated 2010s corporate stock-photo layout → refined dark editorial redesign with gold accents.
- **SaaS admin dashboard** — cluttered light-mode dashboard with dense tables → clean dark dashboard, clear hierarchy, gold data highlights.
- **Restaurant mobile app** — flat pastel app screen with generic icons → premium dark app screen, elegant typography, gold detailing.

Each before/after uses two generated images at the same aspect ratio; component overlays them and clips the top one to the slider position. Includes a "Drag to compare" hint that fades after first interaction.

## Key components

- `IntroAnimation.tsx` — Canvas 2D. ~180 gold particles; phase 1 drift, phase 2 ease toward sampled pixel coordinates of "ATHERA", phase 3 hold + subtitle fade, phase 4 overlay fade. `prefers-reduced-motion` skips to the wordmark reveal.
- `TiltCard.tsx` — Pointer-driven `rotateX/rotateY` (max ~10°) with `transform-style: preserve-3d` and `perspective`. Inner layers translate on Z; cursor-following gold radial glow.
- `BeforeAfter.tsx` — Two stacked images, draggable divider handle, pointer + touch support, keyboard-accessible (arrow keys).
- `GoldGlow.tsx`, `CircuitBackdrop.tsx`, `SiteNav.tsx`, `SiteFooter.tsx`.
- Section files under `src/components/site/sections/`.

## Files to create / modify

- `src/routes/index.tsx` — replace placeholder; compose sections; mount `IntroAnimation`.
- `src/routes/__root.tsx` — set head() (title "Athera Intelligence — AI, Apps & Software Engineering", description, og/twitter), add Google Fonts `<link>`s, add `className="dark"` on `<html>`.
- `src/styles.css` — dark metallic palette as default; register `--font-display` / `--font-sans`; add gold glow shadow tokens and `@utility text-gold-metallic` for gradient text.
- `src/components/site/*` — components above.
- `src/assets/projects/` — 4 generated project images (16:9).
- `src/assets/before-after/` — 3 pairs of generated images (matched framing).
- Add shadcn `accordion`, `sonner`, `input`, `textarea`, `label` in build phase if missing.

## Technical notes

- Tailwind v4 tokens in `@theme inline` + `:root`; new `--color-gold`, `--color-gold-glow`, `--shadow-gold`.
- 3D tilt: pure CSS + small `useRef` handler (no external lib).
- Contact form: client-only toast for now.
- Only one route (`/`); all sections are anchor-scrolled.

## Out of scope (ask if you want them)

- Backend for contact form (needs Lovable Cloud).
- Blog / case-study detail pages.
- CMS integration.

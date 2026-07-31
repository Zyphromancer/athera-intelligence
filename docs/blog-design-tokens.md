# Blog design tokens — reference

The `/blog` and `/blog/$slug` pages don't define their own tokens. They
reuse the exact same CSS custom properties, fonts, and components as the
rest of athera-intelligence.com (`src/styles.css`, `PageChrome`,
`PageHeader`, `gold-hairline`, `surface-card`, `text-gold-metallic`) so
there is a single source of truth and nothing can visually drift out of
sync with the main site. This file documents what those real tokens are.

## Where this differs from the original brief

The request specified flat hex colors and "JetBrains Mono" as the utility
font. Checked against what's actually implemented in `src/styles.css`:

| Requested | Actual, verified in code | Note |
| --- | --- | --- |
| Lacquer Black `#0A0908` | `--background: oklch(0.14 0.012 80)` ≈ `#0C0905` | Effectively the same color |
| Ivory `#EDE6D8` | `--foreground: oklch(0.94 0.015 85)` ≈ `#F0EBE0` | Effectively the same color |
| Bullion Gold `#B8923B` | `--gold` / `--primary: oklch(0.82 0.14 86)` ≈ `#ECBD4A` | The real gold is noticeably brighter/more saturated than `#B8923B` — closer to a bright metallic gold than a muted bullion tone |
| JetBrains Mono | **Not used anywhere in the codebase.** All type is `--font-sans: "Inter"` (body/labels) or `--font-display: "Cormorant Garamond"` (headings). Small uppercase "eyebrow" labels use Inter at `10–12px` with `tracking-[0.3em]`–`tracking-[0.5em]`, not a monospace font | Using JetBrains Mono for the blog would make it visually inconsistent with every other page |
| "Monogram seal animations" | No such component exists. Closest real equivalents: `CircuitBackdrop` (ambient background on page headers), `gold-hairline` (gradient divider), `animate-fade-up` (entrance animation) | The blog uses these existing elements rather than a new one-off animation |

The blog was built against the verified tokens, not the brief's hex/font
assumptions, since the goal was to match the real site exactly.

## Real tokens (from `src/styles.css`)

| Token | Value | Tailwind/CSS usage |
| --- | --- | --- |
| Background | `oklch(0.14 0.012 80)` | `bg-background` |
| Foreground (text) | `oklch(0.94 0.015 85)` | `text-foreground` |
| Muted foreground | `oklch(0.68 0.02 82)` | `text-muted-foreground` |
| Gold / primary | `oklch(0.82 0.14 86)` | `text-[oklch(0.82_0.14_86)]`, `border-[oklch(0.82_0.14_86_/_0.4)]` etc. |
| Gold glow (brighter accent) | `oklch(0.9 0.15 90)` | `text-[oklch(0.9_0.15_90)]` — used for links/hover states |
| Gold deep (gradient end) | `oklch(0.6 0.13 70)` | used in CTA gradients |
| Display font | `"Cormorant Garamond"` | `font-display` |
| Body/label font | `"Inter"` | `font-sans` (default) |

## Reusable utilities

- `.text-gold-metallic` — gradient-fill gold text, used for headings
- `.gold-hairline` — horizontal gradient divider (fades in/out at the edges) — used between blog list entries
- `.surface-card` — subtle gradient card background with a gold hairline border — used for the blog's empty state
- `.article-body` — new, added in this change (`src/styles.css`) — styles the raw HTML injected from `outrank-webhook-service` (headings, links, blockquotes, lists, images, inline code) using the tokens above, so Outrank-authored content typography matches the rest of the site without needing a client-side markdown/rich-text renderer

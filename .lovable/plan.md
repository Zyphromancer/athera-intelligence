# Fix: unreadable / nonsense image content

## Root cause
The current images were generated with the fast tier and prompts that implied UI screenshots (dashboards, websites, apps). Fast image models render fake text as gibberish, which is exactly what you're seeing on the project cards and the before/after screenshots.

## Approach
Regenerate all 10 images with two rules:
1. **Use the premium tier** (`premium`), which is the only tier that renders legible text and clean UI.
2. **Avoid text wherever possible.** Where a "UI" is needed, prompt for abstract/blurred UI, macro shots, textures, or product photography instead of literal screens with copy. Where text is unavoidable (before/after), keep it to a single short brand-style wordmark and lorem-style bars, not sentences.

## Images to regenerate

**Projects (4)** — swap literal UI screenshots for premium editorial/conceptual imagery, no readable text:
- `sentinel.jpg` — Abstract AI-detection visual: dark studio macro of a face fragment overlaid with faint gold wireframe scan lines and particle grid. No text.
- `meridian.jpg` — Moody architectural shot of a modern corporate lobby in warm gold-and-black tones. No screens, no text.
- `orbit.jpg` — Cinematic product shot of a smartphone on dark marble with soft gold rim light. Screen shows only an abstract dark gradient, no UI text.
- `lumen.jpg` — Macro shot of stacked leather-bound books with gold foil edges under a warm spotlight, faint particle overlay. No text.

**Before / After (6)** — premium tier, minimal/no text, so the "before vs after" reads visually (layout, color, polish) instead of via unreadable copy:
- `bank-before.jpg` / `bank-after.jpg` — Website mockups shown as flat design comps on a dark surface. Before: cluttered 2010s layout with grey blocks and placeholder bars (no readable words). After: refined dark editorial layout with a single short serif wordmark ("Meridian") and gold accents.
- `dashboard-before.jpg` / `dashboard-after.jpg` — Admin dashboard renders using only charts, sparklines, and bar placeholders — no labels or numbers that need to be legible. Before: harsh light mode, cramped. After: dark, spacious, gold highlights.
- `restaurant-before.jpg` / `restaurant-after.jpg` — Phone-in-hand product shots. Screens use only photography and abstract shapes, no menu text. Before: pastel cartoonish. After: dark editorial with gold.

## Technical details
- Tool: `imagegen--generate_image` with `model: "premium"`.
- Overwrite the existing files at `src/assets/projects/*.jpg` and `src/assets/before-after/*.jpg` so no code changes are needed — imports stay identical.
- Keep the same dimensions (16:9 for projects and bank/dashboard, 3:4 for restaurant).
- Prompts will explicitly include "no text, no letters, no words, no logos" for the four project images and the dashboard/restaurant pairs, and limit the bank pair to a single short wordmark.

No component, layout, or copy changes — only the 10 image files are replaced.

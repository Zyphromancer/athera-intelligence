## Plan

1. **Rebuild the Projects section with real, readable content**
   - Keep the four project categories: AI detection system, website dev, app dev, AI dev.
   - Each card shows: project name, category tag, one-line pitch, 3 measurable outcomes (with real numbers), tech stack chips, and a "View case" link.
   - Redesign card layout so text is the hero: large project name, gold hairline divider, structured outcome list — not just an image with a caption.

2. **Replace project images with premium, text-legible mockups (AI-generated, high quality)**
   - Use `google/gemini-3-pro-image` (premium tier) since it renders text far more reliably than the earlier models. Prompts will specify short, real English words at large sizes.
   - Target compositions:
     - **Sentinel AI**: dark forensic UI panel showing a face with an "AUTHENTIC 96%" score badge, small labeled bars ("Face", "Audio", "Metadata"), gold accents.
     - **Meridian**: laptop mockup of a dark financial site with clear "MERIDIAN CAPITAL" wordmark, nav ("About  Insights  Contact"), and a hero headline.
     - **Orbit**: two phones side by side, one showing "ORBIT" splash + "Today's Workout", the other a stat screen with "12,480 steps" and "Heart 72 bpm".
     - **Lumen**: dark enterprise assistant UI with visible "LUMEN" wordmark, a search bar reading "Ask your knowledge base…", and a cited answer block.
   - All text kept short, high-contrast, in Inter/SF-style sans-serif so it renders cleanly.

3. **Rebuild Before & After as premium design-audit visuals with readable text**
   - Generate new before/after images with `gemini-3-pro-image`, prompts written to keep text minimal and legible (real short words, not lorem-ipsum shapes).
   - Three comparisons:
     - **Corporate site**: BEFORE = 2010s blue banking template with headline "Welcome to First National", cluttered widgets. AFTER = dark editorial layout, headline "Banking, refined.", gold accents.
     - **SaaS dashboard**: BEFORE = bright cluttered admin with labels "Users / Revenue / Tickets" and dense tables. AFTER = dark focused dashboard, big KPIs "MRR $184K", clean gold charts.
     - **Mobile app**: BEFORE = pastel restaurant app labeled "Bella's Kitchen" with cartoon food. AFTER = dark premium app "MAISON" with plated dish photo, "Reserve a table" CTA.
   - Keep the existing draggable slider component; only swap the images and captions.

4. **Polish and verify**
   - Update card copy so every card reads as a real case study a client would recognise.
   - Load the preview, scroll through Projects and Before/After, and confirm: all 4 project cards render with images, all 3 comparisons render, text in the generated images is legible and on-brand.

### Technical notes
- Regenerate 4 project JPGs (`src/assets/projects/*.jpg`) and 6 before/after JPGs (`src/assets/before-after/*.jpg`) using the premium image model with prompts engineered for text legibility (short words, large type, high contrast, sans-serif).
- Update `Projects.tsx` layout and copy; update `BeforeAfterSection.tsx` captions to match new visuals.
- No changes to routing, theme tokens, or the intro animation.
Fix the email identity so every outbound email uses the full company name instead of the project slug.

Current state: both transactional (`send-email.ts`) and auth (`webhook.ts`, `preview.ts`) email configs set `SITE_NAME = "athera-intelligence-core"`, which becomes the display From name in inboxes. The internal notification templates (`contact-notification.tsx`, `book-call-notification.tsx`) also carry no company branding in their body text.

Changes:

1. **From name fix (transactional emails)**
   - In `src/lib/email-templates/send-email.ts`, change `SITE_NAME` from `"athera-intelligence-core"` to `"Athera Intelligence"`.
   - This makes the contact and book-a-call notifications arrive as `Athera Intelligence <noreply@athera-intelligence.com>`.

2. **From name fix (auth emails + preview)**
   - In `src/routes/lovable/email/auth/webhook.ts`, change `SITE_NAME` from `"athera-intelligence-core"` to `"Athera Intelligence"`.
   - In `src/routes/lovable/email/auth/preview.ts`, change `SITE_NAME` from `"athera-intelligence-core"` to `"Athera Intelligence"`, and update `SAMPLE_PROJECT_URL` to `https://athera-intelligence.com`.
   - Auth templates (signup, recovery, magic link, invite, email change) already render `siteName` in subject and body, so they will automatically show the company name once the constant is updated.

3. **Company name in notification body text**
   - Add a small brand sign-off to `src/lib/email-templates/contact-notification.tsx` (e.g., a footer line reading "Athera Intelligence").
   - Add the same small brand sign-off to `src/lib/email-templates/book-call-notification.tsx`.
   - Keep the existing layout, colours, and typography unchanged.

4. **Verify**
   - Run the TypeScript check (`tsgo` or `bun run build`) to confirm no import/typing regressions.
   - Test a send from the contact or book-a-call form and check that the received email shows `From: Athera Intelligence` and the company name in the message body.

No other files need to change; the email routes and registry remain as-is.
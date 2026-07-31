# Outrank webhook service

Receives Outrank webhook content, stores it in Supabase, and exposes it as a
small JSON API that the athera-intelligence.com `/blog` pages read from.

This is a standalone service — it is **not** part of the athera-intelligence
Vite/TanStack Start app and has its own `package.json`. Deploy it separately,
then point the main site at it via `OUTRANK_API_URL` (see the main repo's
`.env.example`).

## Endpoints

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/webhook/outrank` | `OUTRANK_ACCESS_TOKEN` | Receives an article from Outrank, upserts it into Supabase |
| `GET` | `/api/articles` | none | List all articles (summaries, no body HTML) |
| `GET` | `/api/articles/:slug` | none | Single article, including body HTML |
| `GET` | `/health` | none | Liveness check |

### Webhook payload

The exact field names Outrank sends aren't independently verified here —
check Outrank's own webhook documentation and adjust `normalizePayload()` in
`src/routes/webhook.js` if it differs. As shipped, it accepts:

```json
{
  "title": "string, required",
  "content_html": "string (HTML), required — content/body/body_html also accepted",
  "slug": "string, optional — derived from title if omitted",
  "meta_description": "string, optional — description/summary also accepted",
  "tags": ["string"],
  "cover_image": "https://... (optional)"
}
```

Auth: send the token either as `Authorization: Bearer <token>` or
`X-Outrank-Access-Token: <token>` — whichever Outrank's webhook config supports.

Webhook content is sanitized (`sanitize-html`) before it's stored, since it's
third-party content that ends up rendered on the public site.

## Storage: Supabase

Articles live in the `articles` table of the same Supabase project as the
main athera-intelligence site (`supabase/config.toml` at the repo root).
This is a real, durable database — no local filesystem involved, so it works
identically whether this service runs standalone (Railway/Render) or as
Netlify Functions.

**Before running this service for the first time**, create the table:

```bash
# From the repo root, with the Supabase CLI linked to the project:
supabase db push

# Or manually: open the Supabase dashboard -> SQL Editor -> paste the
# contents of supabase/migrations/20260731100000_create_articles.sql -> Run
```

The table has row-level security enabled with no policies — only the
`SUPABASE_SERVICE_ROLE_KEY` this service uses can read or write it. The
browser-facing anon/publishable key (used elsewhere in the main app) has no
access to it at all.

## Setup

```bash
cd outrank-webhook-service
npm install
cp .env.example .env
# edit .env: OUTRANK_ACCESS_TOKEN, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
npm run dev
```

## Deploy — Netlify Functions

1. Create a **new, separate** Netlify site from this same repo.
2. In that site's build settings, set **Base directory** to
   `outrank-webhook-service`. `netlify.toml` in this directory handles the
   rest (function bundling + redirects).
3. Set environment variables on that Netlify site: `OUTRANK_ACCESS_TOKEN`,
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optionally `ALLOWED_ORIGINS`.
4. Deploy. Endpoints are then served at the site's root, e.g.
   `https://<this-netlify-site>.netlify.app/webhook/outrank`.
5. Configure the deployed URL as `OUTRANK_API_URL` and `VITE_OUTRANK_API_URL`
   in the main site's env (see the root repo's `.env.example`).
6. In Outrank's webhook settings, set the URL to
   `https://<this-netlify-site>.netlify.app/webhook/outrank` and the access
   token to match `OUTRANK_ACCESS_TOKEN`.

## Deploy — standalone Node host (Railway, Render, a VM)

Also fully supported if you'd rather not use Netlify Functions: root
directory `outrank-webhook-service`, build command `npm install`, start
command `npm start`. Same environment variables as above (`PORT` is usually
set for you automatically). No persistent volume needed — storage is Supabase,
not the local disk.

## Test the webhook

```bash
curl -i -X POST http://localhost:3001/webhook/outrank \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OUTRANK_ACCESS_TOKEN" \
  -d '{
    "title": "Why we research before we build",
    "content_html": "<p>Everything we ship starts as a question we investigate first.</p>",
    "meta_description": "A short note on the lab'"'"'s research-first approach.",
    "tags": ["Research", "Engineering"]
  }'
```

Then:

```bash
curl http://localhost:3001/api/articles
curl http://localhost:3001/api/articles/why-we-research-before-we-build
```

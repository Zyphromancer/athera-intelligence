# Outrank webhook service

Receives Outrank webhook content, stores it, and exposes it as a small JSON
API that the athera-intelligence.com `/blog` pages read from.

This is a standalone service — it is **not** part of the athera-intelligence
Vite/TanStack Start app and has its own `package.json`. Deploy it separately,
then point the main site at it via `OUTRANK_API_URL` (see the main repo's
`.env.example`).

## Endpoints

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/webhook/outrank` | `OUTRANK_ACCESS_TOKEN` | Receives an article from Outrank, stores it, writes a markdown copy |
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

## ⚠️ Storage caveat — read before choosing where to deploy

Article storage is a local JSON file (`data/articles.json`), exactly as
asked for in the MVP scope. That works cleanly on a host with a persistent
disk. It does **not** work reliably on Netlify Functions (or any serverless
platform): the deployed filesystem is read-only except for `/tmp`, and
`/tmp` is not persisted or shared across invocations or instances — a
webhook POST can land on a different instance than a later GET, and
everything is wiped on redeploy/cold start.

**Recommendation:** deploy this service to Railway or Render (or any VM) for
real use. The Netlify Functions path is included because it was asked for,
and is fine for kicking the tyres, but don't rely on it to durably hold
content. If you outgrow the JSON file, the main site already has a Supabase
project connected (`src/integrations/supabase` in the root repo) — swapping
`src/lib/db.js` for a `articles` table there is the natural next step and
would also fix the Netlify Functions persistence problem.

## Setup

```bash
cd outrank-webhook-service
npm install
cp .env.example .env
# edit .env: set OUTRANK_ACCESS_TOKEN to a long random value
npm run dev
```

## Deploy — Option A: Railway / Render (recommended)

1. Push this repo (or just this subdirectory) to your host of choice.
2. Set the **root/base directory** to `outrank-webhook-service`.
3. Build command: `npm install`. Start command: `npm start`.
4. Set environment variables: `OUTRANK_ACCESS_TOKEN` (required), `ALLOWED_ORIGINS`
   (optional), `PORT` (most hosts set this for you automatically).
5. Attach a persistent volume mounted so `outrank-webhook-service/data` and
   `outrank-webhook-service/content` survive redeploys (Railway: add a volume
   at `/app/data` and `/app/content` if you want the markdown copies to
   persist too; Render: use a persistent disk the same way).
6. Configure the deployed URL as `OUTRANK_API_URL` in the main site's env
   (see the root repo's `.env.example`).
7. In Outrank's webhook settings, set the URL to
   `https://<your-deploy-url>/webhook/outrank` and the access token to match
   `OUTRANK_ACCESS_TOKEN`.

## Deploy — Option B: Netlify Functions

1. Create a **new, separate** Netlify site from this same repo.
2. In that site's build settings, set **Base directory** to
   `outrank-webhook-service`. `netlify.toml` in this directory handles the
   rest (function bundling + redirects).
3. Set the `OUTRANK_ACCESS_TOKEN` and (optionally) `ALLOWED_ORIGINS`
   environment variables on that Netlify site.
4. Deploy. Endpoints are then served at the site's root, e.g.
   `https://<this-netlify-site>.netlify.app/webhook/outrank`.
5. Re-read the storage caveat above before relying on this for real content.

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

const express = require("express");
const { requireOutrankToken } = require("../lib/auth");
const { upsertArticle, getArticleBySlug } = require("../lib/db");
const { slugify, sanitizeArticleHtml, estimateReadingMinutes, buildExcerpt } = require("../lib/content");

const router = express.Router();

// Outrank's exact payload shape isn't independently verified here — this
// accepts the field names their docs describe (title/content/meta_description
// plus a few common aliases) and normalizes them. If Outrank changes their
// schema, this is the only place that needs to change.
function normalizePayload(body) {
  const title = body.title || body.article_title || body.headline;
  const contentHtml = body.content_html || body.content || body.body_html || body.body;
  const slugInput = body.slug || title;
  const metaDescription = body.meta_description || body.description || body.summary;
  const tags = Array.isArray(body.tags) ? body.tags : Array.isArray(body.keywords) ? body.keywords : [];
  const coverImage = body.cover_image || body.image_url || body.hero_image;

  return { title, contentHtml, slugInput, metaDescription, tags, coverImage };
}

router.post("/outrank", requireOutrankToken, async (req, res) => {
  const { title, contentHtml, slugInput, metaDescription, tags, coverImage } = normalizePayload(req.body || {});

  if (!title || !contentHtml) {
    return res.status(400).json({ error: "Payload must include a title and content/content_html" });
  }

  const slug = slugify(slugInput);
  if (!slug) {
    return res.status(400).json({ error: "Could not derive a URL slug from the payload" });
  }

  try {
    const cleanHtml = sanitizeArticleHtml(contentHtml);
    const existing = await getArticleBySlug(slug);
    const now = new Date().toISOString();

    const article = {
      slug,
      title: String(title).trim(),
      contentHtml: cleanHtml,
      excerpt: metaDescription ? String(metaDescription).trim() : buildExcerpt(cleanHtml),
      tags,
      coverImage: coverImage || null,
      readingMinutes: estimateReadingMinutes(cleanHtml),
      publishedAt: existing?.publishedAt || now,
      updatedAt: now,
      source: "outrank",
    };

    await upsertArticle(article);

    return res.status(existing ? 200 : 201).json({
      success: true,
      slug: article.slug,
      updated: Boolean(existing),
    });
  } catch (err) {
    console.error("[webhook] Failed to store article:", err.message);
    return res.status(502).json({ error: "Failed to store article" });
  }
});

module.exports = router;

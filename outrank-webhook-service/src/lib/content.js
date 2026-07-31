const sanitizeHtml = require("sanitize-html");

function slugify(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

// Outrank-authored content is semi-trusted (gated by the access token) but
// still third-party input rendered on the public site, so it's sanitized
// before it's ever stored — this is the single point of control the blog
// frontend relies on.
function sanitizeArticleHtml(html) {
  return sanitizeHtml(html || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

function estimateReadingMinutes(html) {
  const text = String(html || "").replace(/<[^>]*>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function htmlToPlainText(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildExcerpt(html, maxLength = 200) {
  const text = htmlToPlainText(html);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

module.exports = {
  slugify,
  sanitizeArticleHtml,
  estimateReadingMinutes,
  buildExcerpt,
};

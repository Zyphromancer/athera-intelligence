const fs = require("fs");
const path = require("path");
const sanitizeHtml = require("sanitize-html");

const POSTS_DIR = path.join(__dirname, "..", "..", "content", "posts");

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
// before it's ever stored — this is the single point of control other
// consumers (the blog frontend, the generated markdown file) rely on.
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

// Frontmatter escaping for the handful of characters that break a naive
// YAML scalar (colon, quotes, newlines) — good enough for machine-generated
// titles/descriptions, not a general YAML serializer.
function yamlString(value) {
  return `"${String(value ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ")}"`;
}

function writeMarkdownFile(article) {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });

  const frontmatter = [
    "---",
    `title: ${yamlString(article.title)}`,
    `slug: ${yamlString(article.slug)}`,
    `date: ${yamlString(article.publishedAt)}`,
    `description: ${yamlString(article.excerpt)}`,
    "source: outrank",
    "---",
    "",
  ].join("\n");

  const filePath = path.join(POSTS_DIR, `${article.slug}.md`);
  fs.writeFileSync(filePath, frontmatter + article.contentHtml + "\n", "utf8");
  return filePath;
}

module.exports = {
  slugify,
  sanitizeArticleHtml,
  estimateReadingMinutes,
  buildExcerpt,
  writeMarkdownFile,
};

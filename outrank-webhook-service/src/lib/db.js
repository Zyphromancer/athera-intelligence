const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const DB_FILE = path.join(DATA_DIR, "articles.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]\n", "utf8");
}

function readAll() {
  ensureStore();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("[db] Failed to read/parse articles.json, starting empty:", err.message);
    return [];
  }
}

function writeAll(articles) {
  ensureStore();
  fs.writeFileSync(DB_FILE, JSON.stringify(articles, null, 2) + "\n", "utf8");
}

function listArticles() {
  return readAll()
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function getArticleBySlug(slug) {
  return readAll().find((a) => a.slug === slug);
}

// Upserts by slug: a re-delivered webhook for the same slug replaces the
// existing entry (Outrank retries webhooks on timeout, so this must be
// idempotent) but keeps the original createdAt/publishedAt.
function upsertArticle(article) {
  const all = readAll();
  const idx = all.findIndex((a) => a.slug === article.slug);
  if (idx === -1) {
    all.push(article);
  } else {
    all[idx] = { ...all[idx], ...article, publishedAt: all[idx].publishedAt };
  }
  writeAll(all);
  return article;
}

module.exports = { listArticles, getArticleBySlug, upsertArticle };

const { getSupabase } = require("./supabase");

function rowToArticle(row) {
  return {
    slug: row.slug,
    title: row.title,
    contentHtml: row.content_html,
    excerpt: row.excerpt,
    tags: row.tags || [],
    coverImage: row.cover_image,
    readingMinutes: row.reading_minutes,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    source: row.source,
  };
}

function articleToRow(article) {
  return {
    slug: article.slug,
    title: article.title,
    content_html: article.contentHtml,
    excerpt: article.excerpt,
    tags: article.tags,
    cover_image: article.coverImage,
    reading_minutes: article.readingMinutes,
    published_at: article.publishedAt,
    updated_at: article.updatedAt,
    source: article.source,
  };
}

async function listArticles() {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw new Error(`[db] listArticles failed: ${error.message}`);
  return (data || []).map(rowToArticle);
}

async function getArticleBySlug(slug) {
  const { data, error } = await getSupabase()
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`[db] getArticleBySlug failed: ${error.message}`);
  return data ? rowToArticle(data) : undefined;
}

// Upserts by slug: a re-delivered webhook for the same slug replaces the
// existing entry (Outrank retries webhooks on timeout, so this must be
// idempotent) but keeps the original publishedAt.
async function upsertArticle(article) {
  const existing = await getArticleBySlug(article.slug);
  const row = articleToRow({
    ...article,
    publishedAt: existing?.publishedAt || article.publishedAt,
  });

  const { error } = await getSupabase().from("articles").upsert(row, { onConflict: "slug" });

  if (error) throw new Error(`[db] upsertArticle failed: ${error.message}`);
  return { ...article, publishedAt: row.published_at };
}

module.exports = { listArticles, getArticleBySlug, upsertArticle };

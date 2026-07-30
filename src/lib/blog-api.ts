export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  coverImage: string | null;
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  source: string;
};

export type Article = ArticleSummary & {
  contentHtml: string;
};

// Same dual-env pattern as src/integrations/supabase/client.ts: Vite
// replaces import.meta.env.VITE_* at build time for the browser bundle,
// process.env is used for SSR. Unset by default — the blog degrades to an
// empty state rather than failing the build when the Outrank backend
// (outrank-webhook-service/) hasn't been deployed yet.
function getApiUrl(): string | undefined {
  const url = import.meta.env.VITE_OUTRANK_API_URL || process.env.OUTRANK_API_URL;
  return url ? url.replace(/\/+$/, "") : undefined;
}

export async function fetchArticles(): Promise<ArticleSummary[]> {
  const apiUrl = getApiUrl();
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/api/articles`);
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);
    const data = (await res.json()) as { articles: ArticleSummary[] };
    return data.articles;
  } catch (err) {
    console.error("[blog-api] Failed to fetch articles:", err);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | undefined> {
  const apiUrl = getApiUrl();
  if (!apiUrl) return undefined;

  try {
    const res = await fetch(`${apiUrl}/api/articles/${encodeURIComponent(slug)}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`Backend returned ${res.status}`);
    const data = (await res.json()) as { article: Article };
    return data.article;
  } catch (err) {
    console.error(`[blog-api] Failed to fetch article "${slug}":`, err);
    return undefined;
  }
}

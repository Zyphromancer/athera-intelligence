import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { fetchArticleBySlug, type Article } from "@/lib/blog-api";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const article = await fetchArticleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — Athera Intelligence" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData as { article: Article };
    const title = `${article.title} — Athera Intelligence`;
    const meta = [
      { title },
      { name: "description", content: article.excerpt },
      { property: "og:title", content: title },
      { property: "og:description", content: article.excerpt },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (article.coverImage) {
      meta.push({ property: "og:image", content: article.coverImage });
      meta.push({ name: "twitter:image", content: article.coverImage });
    }
    return { meta };
  },
  notFoundComponent: () => (
    <PageChrome>
      <PageHeader
        crumb="Blog"
        eyebrow="Not found"
        title="This article isn't available."
        intro="It may have been renamed or removed. Head back to the index to see everything we've published."
      />
      <div className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <Link to="/blog" className="text-sm uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)] hover:underline">
          Back to blog →
        </Link>
      </div>
    </PageChrome>
  ),
  component: BlogArticlePage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function BlogArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };

  return (
    <PageChrome>
      <PageHeader
        crumb="Blog"
        eyebrow={`${formatDate(article.publishedAt)} · ${article.readingMinutes} min read`}
        title={article.title}
      />

      {article.coverImage && (
        <section className="relative pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <div className="surface-card overflow-hidden rounded-2xl shadow-[var(--shadow-gold)]">
              <img src={article.coverImage} alt={article.title} className="w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>
      )}

      <section className="relative pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {article.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2 border-b border-[oklch(0.82_0.14_86_/_0.15)] pb-8">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {/* article.contentHtml is sanitized server-side (sanitize-html) before storage in outrank-webhook-service */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
        </div>
      </section>

      <section className="relative pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)] hover:underline"
          >
            ← Back to all field notes
          </Link>
        </div>
      </section>
    </PageChrome>
  );
}

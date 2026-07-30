import { createFileRoute, Link } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { fetchArticles, type ArticleSummary } from "@/lib/blog-api";

export const Route = createFileRoute("/blog/")({
  loader: () => fetchArticles(),
  head: () => ({
    meta: [
      { title: "Blog — Athera Intelligence" },
      { name: "description", content: "Research notes and field reports from Athera Intelligence, the research-led technology lab." },
      { property: "og:title", content: "Blog — Athera Intelligence" },
      { property: "og:description", content: "Research notes and field reports from the lab." },
    ],
  }),
  component: BlogIndexPage,
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function BlogIndexPage() {
  const articles = Route.useLoaderData() as ArticleSummary[];

  return (
    <PageChrome>
      <PageHeader
        crumb="Blog"
        eyebrow="From the lab"
        title="Field notes."
        intro="Research notes, product updates, and field reports — written as we ship, not after."
      />

      <section className="relative pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {articles.length === 0 ? (
            <div className="surface-card rounded-2xl p-10 text-center sm:p-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.82_0.14_86)]">Coming soon</p>
              <h2 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
                The first field notes are on their way.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                Check back shortly, or read what we're building on the Research and Products pages.
              </p>
            </div>
          ) : (
            <div>
              {articles.map((a, i) => (
                <div key={a.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: a.slug }}
                    className="group flex items-start gap-5 py-8 first:pt-0 sm:gap-8"
                  >
                    <span className="pt-1 font-display text-xl text-[oklch(0.82_0.14_86)] tabular-nums sm:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:tracking-[0.35em]">
                        {formatDate(a.publishedAt)} · {a.readingMinutes} min read
                      </p>
                      <h2 className="mt-2 font-display text-2xl text-foreground transition-colors group-hover:text-gold-metallic sm:text-3xl">
                        {a.title}
                      </h2>
                      {a.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                      )}
                    </div>
                    <span
                      aria-hidden
                      className="hidden pt-2 text-[oklch(0.82_0.14_86)] transition-transform group-hover:translate-x-1 sm:inline"
                    >
                      →
                    </span>
                  </Link>
                  {i < articles.length - 1 && <div className="h-px gold-hairline" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageChrome>
  );
}

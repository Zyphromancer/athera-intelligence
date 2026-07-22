import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";
import { getCaseStudy, type CaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Case study not found — Athera Intelligence" }, { name: "robots", content: "noindex" }] };
    }
    const { study } = loaderData;
    const title = `${study.title} — Athera Intelligence`;
    const description = study.summary;
    const meta = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (study.hero && /^https?:\/\//.test(study.hero)) {
      meta.push({ property: "og:image", content: study.hero });
      meta.push({ name: "twitter:image", content: study.hero });
    }
    return { meta };
  },
  notFoundComponent: () => (
    <PageChrome>
      <PageHeader
        crumb="Case studies"
        eyebrow="Not found"
        title="This case study isn't available."
        intro="It may have been renamed or removed. Head back to the index to see everything we've published."
      />
      <div className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <Link to="/case-studies" className="text-sm uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)] hover:underline">
          Back to case studies →
        </Link>
      </div>
    </PageChrome>
  ),
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };

  return (
    <PageChrome>
      <PageHeader
        crumb="Case studies"
        eyebrow={study.category}
        title={study.title}
        intro={study.summary}
      />

      {study.hero && (
        <section className="relative pb-8">
          <div className="mx-auto max-w-5xl px-6">
            <div className="surface-card overflow-hidden rounded-2xl shadow-[var(--shadow-gold)]">
              <img src={study.hero} alt={study.title} className="w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {study.status === "coming-soon" && (
        <section className="relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <TiltCard intensity={4}>
              <div className="p-8 sm:p-12 text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.82_0.14_86)]">Coming soon</p>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl text-foreground">Write-up in progress</h2>
                <p className="mt-4 text-muted-foreground">
                  This case study is being prepared. In the meantime, browse other engagements on the Work page.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <Link to="/work" className="inline-flex items-center justify-center rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-foreground hover:bg-[oklch(0.82_0.14_86_/_0.08)]">
                    See our work
                  </Link>
                  <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)]">
                    Start a project
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>
      )}

      {study.status !== "coming-soon" && (
        <>
          {study.meta && (
            <section className="relative pb-8">
              <div className="mx-auto max-w-5xl px-6">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {study.meta.role && <MetaItem label="Role" value={study.meta.role} />}
                  {study.meta.platform && <MetaItem label="Platform" value={study.meta.platform} />}
                  {study.meta.status && <MetaItem label="Status" value={study.meta.status} />}
                  {study.meta.stack && study.meta.stack.length > 0 && (
                    <MetaItem label="Stack" value={study.meta.stack.join(" · ")} />
                  )}
                </div>
              </div>
            </section>
          )}

          {study.sections && study.sections.length > 0 && (
            <section className="relative py-12 md:py-16">
              <div className="mx-auto max-w-3xl space-y-10 px-6">
                {study.sections.map((s) => (
                  <div key={s.heading}>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.82_0.14_86)]">
                      {s.heading}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {study.pullQuote && (
            <section className="relative py-12 md:py-16">
              <div className="mx-auto max-w-3xl px-6 text-center">
                <p className="font-display text-2xl italic leading-relaxed text-gold-metallic sm:text-3xl md:text-4xl">
                  "{study.pullQuote}"
                </p>
              </div>
            </section>
          )}

          <section className="relative py-12 md:py-16">
            <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
              {study.challenge && <StorySection label="Challenge" body={study.challenge} />}
              {study.approach && <StorySection label="Approach" body={study.approach} />}
              {study.outcome && <StorySection label="Outcome" body={study.outcome} />}
            </div>
          </section>

          {study.metrics && study.metrics.length > 0 && (
            <section className="relative py-12 md:py-16">
              <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="surface-card rounded-2xl p-6 text-center">
                      <div className="font-display text-4xl text-gold-metallic">{m.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {study.stack && study.stack.length > 0 && (
            <section className="relative py-12">
              <div className="mx-auto max-w-5xl px-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Stack</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((s) => (
                    <span key={s} className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {study.gallery && study.gallery.length > 0 && (
            <section className="relative py-12 md:py-16">
              <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {study.gallery.map((src, i) => (
                    <div key={src} className="surface-card overflow-hidden rounded-2xl">
                      <img src={src} alt={`${study.title} — image ${i + 1}`} className="w-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {study.testimonial && (
            <section className="relative py-16 md:py-24">
              <div className="mx-auto max-w-3xl px-6 text-center">
                <p className="font-display text-2xl sm:text-3xl text-foreground italic leading-relaxed">
                  "{study.testimonial.quote}"
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">
                  {study.testimonial.author} · {study.testimonial.role}
                </p>
              </div>
            </section>
          )}

          <section className="relative py-16">
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="mb-6 font-display text-2xl text-foreground sm:text-3xl">
                Have a spec this exact? Let's talk.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.02]">
                Start a project
              </Link>
            </div>
          </section>
        </>
      )}
    </PageChrome>
  );
}

function StorySection({ label, body }: { label: string; body: string }) {
  return (
    <TiltCard intensity={3}>
      <div className="p-6 sm:p-8 h-full">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.82_0.14_86)]">{label}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">{body}</p>
      </div>
    </TiltCard>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm text-foreground sm:text-base">{value}</p>
    </div>
  );
}
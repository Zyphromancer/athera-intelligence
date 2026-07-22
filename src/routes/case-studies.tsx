import { createFileRoute, Link } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case studies — Athera Intelligence" },
      { name: "description", content: "Long-form case studies from Athera Intelligence — the brief, the trade-offs, the outcome." },
      { property: "og:title", content: "Case studies — Athera Intelligence" },
      { property: "og:description", content: "Long-form case studies from Athera Intelligence — the brief, the trade-offs, the outcome." },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Case studies"
        eyebrow="The full story"
        title="Case studies."
        intro="Deeper than a project card — the brief, the constraints, the trade-offs, and the outcome, one engagement at a time."
      />
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((c) => (
              <TiltCard key={c.slug} intensity={5}>
                <Link
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">{c.category}</p>
                    {c.status === "coming-soon" && (
                      <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl text-foreground group-hover:text-[oklch(0.92_0.14_88)] transition-colors">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">
                    Read case study
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
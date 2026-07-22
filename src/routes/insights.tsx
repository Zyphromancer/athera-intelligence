import { createFileRoute } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Athera Intelligence" },
      { name: "description", content: "Short essays on AI readiness, engineering craft, and what to look for when choosing a development partner." },
      { property: "og:title", content: "Insights — Athera Intelligence" },
      { property: "og:description", content: "Short essays on AI, engineering craft, and choosing a development partner." },
    ],
  }),
  component: InsightsPage,
});

const articles = [
  { tag: "AI", read: "6 min", date: "Sep 2026", t: "AI readiness in four questions", d: "Most companies aren't ready for AI — but not for the reasons vendors sell. A short checklist before you commit to a model." },
  { tag: "Craft", read: "8 min", date: "Aug 2026", t: "Design systems in code, from day one", d: "Why we start every engagement from tokens and primitives rather than screens, and how it compounds by week four." },
  { tag: "Hiring", read: "5 min", date: "Jul 2026", t: "How to choose a development partner", d: "Six questions that separate senior engineering shops from prettified offshore relays." },
  { tag: "Engineering", read: "7 min", date: "Jun 2026", t: "The case against status decks", d: "Weekly working demos will tell you more about a project's health than any slide will." },
];

function InsightsPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Insights"
        eyebrow="Insights"
        title="Notes from the workshop."
        intro="Short essays on AI, engineering craft, and what actually separates good software work from theatre."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <TiltCard key={a.t} intensity={5}>
                <article className="flex h-full flex-col p-8">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
                    <span className="rounded-full border border-[oklch(0.82_0.14_86_/_0.3)] bg-[oklch(0.82_0.14_86_/_0.06)] px-3 py-1 text-[oklch(0.9_0.15_90)]">{a.tag}</span>
                    <span className="text-muted-foreground">{a.date} · {a.read}</span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-foreground">{a.t}</h3>
                  <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
                  <span className="mt-6 inline-flex w-fit rounded-full border border-[oklch(0.82_0.14_86_/_0.2)] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Coming soon
                  </span>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
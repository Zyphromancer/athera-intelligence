import { Link } from "@tanstack/react-router";
import { TiltCard } from "@/components/site/TiltCard";

const cards = [
  {
    to: "/example" as const,
    badge: "Timeline & price",
    title: "See a real engagement",
    body: "A mid-range project, end to end — scope, four-phase timeline, and an honest price example.",
  },
  {
    to: "/work" as const,
    badge: "Case studies + before/after",
    title: "View all our work",
    body: "The full grid of recent engagements across AI, web and native, plus every before/after transformation.",
  },
  {
    to: "/approach" as const,
    badge: "Methodology",
    title: "How we work",
    body: "Our engineering process, engagement models, guarantees, and what it looks like to work with us.",
  },
];

export function ExploreBand() {
  return (
    <section id="explore" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] md:h-[420px] md:w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.82_0.14_86)] opacity-[0.06] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Go deeper</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic sm:text-5xl md:text-6xl">Explore</h2>
          <p className="mt-4 text-muted-foreground">Three places to look next — pick the one that answers your question best.</p>
        </div>
        <div className="mt-12 sm:mt-16 grid gap-5 sm:gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <TiltCard key={c.to} intensity={6}>
              <Link to={c.to} className="group flex h-full flex-col p-6 sm:p-8">
                <span className="inline-flex w-fit rounded-full border border-[oklch(0.82_0.14_86_/_0.3)] bg-[oklch(0.82_0.14_86_/_0.06)] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)]">
                  {c.badge}
                </span>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl text-foreground">{c.title}</h3>
                <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)]">
                  Open
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
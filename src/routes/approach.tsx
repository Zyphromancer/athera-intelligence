import { createFileRoute, Link } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — Athera Intelligence" },
      { name: "description", content: "How Athera Intelligence engineers software — our methodology, engagement models, and the guarantees behind every build." },
      { property: "og:title", content: "Approach — Athera Intelligence" },
      { property: "og:description", content: "Methodology, engagement models, and guarantees from Athera Intelligence." },
    ],
  }),
  component: ApproachPage,
});

const phases = [
  { n: "01", t: "Discovery", b: "A short paid engagement — 1 to 2 weeks — where we produce a technical brief, timeline, and fixed price. You leave with something valuable even if we don't build together." },
  { n: "02", t: "Design system in code", b: "We start from tokens and primitives, not screens. Every button, form, and empty state is built once and reused. No mystery CSS." },
  { n: "03", t: "Weekly demos", b: "Working software every Friday. You approve what shipped, we agree on next week. No status decks, no black boxes." },
  { n: "04", t: "Handover", b: "Full IP transfer, clean repositories, runbooks, and a walkthrough. Your team can pick it up on day one — or keep us on retainer." },
];

const models = [
  { t: "Fixed-scope build", b: "One product surface, one team, one price. Ideal for MVPs and bounded projects.", price: "from €28k" },
  { t: "Retainer", b: "Ongoing capacity for iteration and maintenance after launch.", price: "from €4.5k / mo" },
  { t: "Staff augmentation", b: "Senior engineers embedded in your team for a defined period.", price: "from €8k / mo · engineer" },
];

const guarantees = [
  "You own the code and the IP from day one",
  "Weekly working demos, no status decks",
  "Fixed price per milestone — no surprise invoices",
  "Senior engineers only — no offshore relay",
];

function ApproachPage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Approach"
        eyebrow="How we work"
        title="Engineering, not theatre."
        intro="Four phases, three engagement models, and a short list of things we guarantee — because sending a Gantt chart isn't the same as shipping software."
      />

      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)] text-center">Methodology</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {phases.map((p) => (
              <TiltCard key={p.n} intensity={5}>
                <div className="p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl text-gold-metallic">{p.n}</span>
                    <h3 className="font-display text-2xl text-foreground">{p.t}</h3>
                  </div>
                  <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.b}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)] text-center">Engagement models</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {models.map((m) => (
              <TiltCard key={m.t} intensity={4}>
                <div className="flex h-full flex-col p-8">
                  <h3 className="font-display text-2xl text-foreground">{m.t}</h3>
                  <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{m.b}</p>
                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[oklch(0.9_0.15_90)]">{m.price}</p>
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link to="/example" className="group inline-flex items-center gap-3 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-7 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]">
              See a real engagement <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Guarantees</p>
          <h2 className="mt-4 font-display text-4xl text-gold-metallic md:text-5xl">Things we won't compromise on.</h2>
          <ul className="mx-auto mt-10 max-w-xl space-y-3 text-left">
            {guarantees.map((g) => (
              <li key={g} className="flex gap-3 text-sm text-foreground/90">
                <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.82_0.14_86)]" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageChrome>
  );
}
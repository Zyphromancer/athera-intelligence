import { TiltCard } from "@/components/site/TiltCard";

const phases = [
  {
    label: "Week 1",
    title: "Discovery & design system",
    body: "Kickoff workshops, product architecture, a working design system in code — tokens, primitives, and the first key screens.",
    deliverables: ["Product architecture doc", "Design system v1", "Sprint plan"],
    who: "Lead engineer · Design lead",
  },
  {
    label: "Weeks 2–4",
    title: "Core build",
    body: "Auth, customer dashboard, and Stripe billing built end-to-end with test coverage and a staging environment from day one.",
    deliverables: ["Auth & account model", "Customer dashboard", "Stripe subscriptions"],
    who: "2 engineers · Design lead",
  },
  {
    label: "Weeks 5–7",
    title: "Admin, analytics & polish",
    body: "Internal admin surface, event analytics, transactional email, edge cases, empty states, and the animation pass.",
    deliverables: ["Admin console", "Product analytics", "Transactional email"],
    who: "2 engineers · Design lead",
  },
  {
    label: "Week 8",
    title: "QA, launch & handover",
    body: "Cross-browser QA, load testing, security review, production deploy, and a full technical handover with documentation.",
    deliverables: ["Prod deploy", "Runbook & docs", "Handover session"],
    who: "Lead engineer · You",
  },
];

export function EngagementTimeline() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-[oklch(0.82_0.14_86)]">Timeline</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl text-gold-metallic md:text-5xl">Eight weeks, four phases</h2>
          <p className="mt-4 text-muted-foreground">Every week has a clear deliverable and a demo. No black boxes.</p>
        </div>
        <ol className="relative mt-12 sm:mt-16 space-y-6 sm:space-y-8">
          <div aria-hidden className="pointer-events-none absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[oklch(0.82_0.14_86_/_0.35)] to-transparent md:left-8" />
          {phases.map((p) => (
            <li key={p.label} className="relative pl-14 sm:pl-16 md:pl-20">
              <span
                aria-hidden
                className="absolute left-4 top-6 grid h-5 w-5 place-items-center rounded-full border border-[oklch(0.82_0.14_86_/_0.6)] bg-background shadow-[0_0_20px_oklch(0.82_0.14_86_/_0.5)] md:left-6"
              >
                <span className="h-2 w-2 rounded-full bg-[oklch(0.82_0.14_86)]" />
              </span>
              <TiltCard intensity={4}>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.35em] text-[oklch(0.82_0.14_86)]">{p.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.who}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl text-foreground">{p.title}</h3>
                  <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.deliverables.map((d) => (
                      <li key={d} className="rounded-full border border-[oklch(0.82_0.14_86_/_0.25)] bg-[oklch(0.82_0.14_86_/_0.05)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[oklch(0.9_0.15_90)]">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
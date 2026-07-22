import { createFileRoute, Link } from "@tanstack/react-router";
import { PageChrome } from "@/components/site/PageChrome";
import { PageHeader } from "@/components/site/PageHeader";
import { TiltCard } from "@/components/site/TiltCard";
import { EngagementTimeline } from "@/components/site/sections/EngagementTimeline";
import { PriceCard } from "@/components/site/sections/PriceCard";

export const Route = createFileRoute("/example")({
  head: () => ({
    meta: [
      { title: "Example engagement — Athera Intelligence" },
      { name: "description", content: "A mid-range engagement, end to end — brief, scope, four-phase timeline, and an honest price example from €28k–€38k." },
      { property: "og:title", content: "Example engagement — Athera Intelligence" },
      { property: "og:description", content: "See what a mid-range Athera project looks like: scope, timeline, and price." },
    ],
  }),
  component: ExamplePage,
});

const scope = [
  "Design system in code (tokens, primitives, 8 core screens)",
  "Email + password + SSO authentication",
  "Customer dashboard with account, usage, and support",
  "Stripe subscriptions, invoices, and dunning",
  "Internal admin console with role-based access",
  "Product analytics and transactional email",
  "Staging + production infrastructure",
  "Full documentation and handover session",
];

function ExamplePage() {
  return (
    <PageChrome>
      <PageHeader
        crumb="Example"
        eyebrow="Example engagement"
        title="A mid-range engagement, end to end."
        intro="An indicative walkthrough of what a mid-range project looks like at Athera — 6 to 10 weeks, one product surface, one team. The client below is fictional; the shape is exactly how we work."
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <TiltCard intensity={4}>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">The brief</p>
                <h2 className="mt-3 font-display text-3xl text-foreground">Series A fintech<br/>customer portal.</h2>
                <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A regulated fintech needs a production-ready customer portal — authentication, a usage
                  dashboard, self-serve billing on Stripe, and an internal admin surface — in one quarter.
                </p>
                <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  <li>· 8-week build</li>
                  <li>· 3-person team</li>
                  <li>· One product surface</li>
                </ul>
              </div>
            </TiltCard>
            <TiltCard intensity={4}>
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.82_0.14_86)]">Scope</p>
                <h2 className="mt-3 font-display text-3xl text-foreground">What we deliver.</h2>
                <div className="mt-3 h-px w-16 bg-[oklch(0.82_0.14_86_/_0.5)]" />
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {scope.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-foreground/90">
                      <span aria-hidden className="mt-[0.55rem] inline-block h-px w-4 flex-none bg-[oklch(0.82_0.14_86)]" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <EngagementTimeline />
      <PriceCard />

      <section className="relative py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-hairline" />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl text-gold-metallic md:text-5xl">Bring us your version.</h2>
          <p className="mt-4 text-muted-foreground">The example above is a shape, not a menu. Every real project starts with a discovery call.</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[oklch(0.92_0.14_88)] to-[oklch(0.7_0.13_75)] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.25em] text-black shadow-[0_10px_40px_-8px_oklch(0.82_0.14_86_/_0.6)] transition-transform hover:scale-[1.02]">
              <span className="relative z-10">Book a discovery call</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link to="/work" className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.82_0.14_86_/_0.4)] px-8 py-3.5 text-sm uppercase tracking-[0.25em] text-foreground transition-all hover:bg-[oklch(0.82_0.14_86_/_0.08)] hover:shadow-[0_0_30px_oklch(0.82_0.14_86_/_0.35)]">
              See real projects
            </Link>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}